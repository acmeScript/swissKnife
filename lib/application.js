'use strict';

const vm = require('vm');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const net = require('net');
const timers = require('timers');
const events = require('events');
///////////////////REFACTOR////////////////////////////////
const APP_PATH = process.cwd();
const API_PATH = path.join(APP_PATH, 'api');
//const API_PATH = './api/';
const STATIC_PATH = path.join(APP_PATH, 'static');
const STATIC_PATH_LENGTH = STATIC_PATH.length;
//////////////////////////////////////////////////////
const Config = require('./config.js');
const Server = require('./server.js');
const SCRIPT_OPTIONS = { timeout: 5000 };

class Application extends events {
  constructor(worker) {
    super();
    this.finalization = false;
    this.worker = worker;
    this.api = new Map();
    this.cache = new Map();
    this.path = APP_PATH;
    const configPath = path.join(APP_PATH, 'config');
    this.config = new Config(configPath);
    //this.sandbox = this.createSandbox();
    this.server = null;
    this.config.on('loaded', () => {
      const { sections } = this.config;
      this.server = new Server(sections.server, this);
      
      this.emit('started');
    });
    this.cacheDirectory(STATIC_PATH);
    this.cacheMethods();
  }

  async shutdown() {
    this.finalization = true;
    await this.server.close();
    await this.freeResources();
  }

  async freeResources() {
    console.log('Free resources');
  }
  /*
  createSandbox() {
    const sandbox = {
      //console: this.logger,
      //extension needed
      application: this,
    };
    sandbox.global = sandbox;
    return vm.createContext(sandbox);
  }
  */
  async createScript(fileName) {
    const code = await fsp.readFile(fileName, 'utf8');
    const src = `'use strict';\ncontext => ${code}`;
    try {
      return new vm.Script(src);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  runScript(methodName, sandbox = this.sandbox) {
    const script = this.api.get(methodName);
    if (!script) throw new Error('Not found');
    return script.runInContext(sandbox, SCRIPT_OPTIONS);
  }

  async cacheFile(filePath) {
    const key = filePath.substring(STATIC_PATH_LENGTH);
    try {
      const data = await fsp.readFile(filePath, 'utf8');
      this.cache.set(key, data);
    } catch (err) {
      console.log(err.stack)
      if (err.code !== 'ENOENT') throw err;
    }
  }

  async cacheDirectory(directoryPath) {
    const files = await fsp.readdir(directoryPath, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(directoryPath, file.name);
      if (file.isDirectory()) await this.cacheDirectory(filePath);
      else await this.cacheFile(filePath);
    }
    fs.watch(directoryPath, (event, fileName) => {
      const filePath = path.join(directoryPath, fileName);
      this.cacheFile(filePath);
    });
  }

  async cacheMethod(fileName) {
    const { name, ext } = path.parse(fileName);
    if (ext !== '.js' || name.startsWith('.')) return;
    const script = await this.createScript(fileName);
    if (script) this.api.set(name, script);
    else this.api.delete(name);
  }

  async cacheMethods() {
    const files = await fsp.readdir(API_PATH);
    for (const fileName of files) {
      const filePath = path.join(API_PATH, fileName);
      await this.cacheMethod(filePath);
    }
    fs.watch(API_PATH, (event, fileName) => {
      const filePath = path.join(API_PATH, fileName);
      this.cacheMethod(filePath);
    });
  }
}

module.exports = Application;
