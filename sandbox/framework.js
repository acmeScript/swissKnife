'use strict';
const fs = require('fs');
const net = require('net');
const vm = require('vm');
const timers = require('timers');
const events = require('events');

const sandboxedFileSystem = require('./sandbox');

const PARSING_TIMEOUT = 1000;
const EXECUTION_TIMEOUT = 5000;
global.api = {};
api.fs = require('fs');
api.vm = require('vm');
api.sandboxedFileSystem = sandboxedFileSystem; 
const {wrapFunction} = require('../lib/wrapFunction.js');
const {cloneInterface} = require('../lib/cloneInterface.js');

const log = s => {
    console.log('<<<<<<<<stdout from sanbox start>>>>>>>>>');
    console.log(s);
    console.log('<<<<<<<<stdout from sanbox end>>>>>>>>>');
}
const safeRequire = name => {
    if(name === 'fs'){
        console.log("ACCESS DENIED");
        const msg = "ACCESS DENIED";
        return new Error(msg)
    }
}

const runSandboxForDIR = path => {
    const fileName = path + 'application.js';
    console.log(fileName);
    const context = {
        module: {},
        require: safeRequire,
        api: {
            console: {log},
            timers: {
                setTimeout: wrapFunction('setTimeout', setTimeout)
            },
            fs: cloneInterface(api.sandboxedFileSystem.bind(path))
        }
    };
    context.global =  context;
    const sandbox = api.vm.createContext(context);
    api.fs.readFile(fileName, (err, src)=>{
        const script = new api.vm.Script(src, fileName);
        const f = script.runInNewContext(sandbox);
            if(f){
                f();
            }
        });
    return;
}
runSandboxForDIR('./');
/*
const context = {
    module: {},
    console,
    setTimeout: (arg) => {
        return null;
    },
    require: name => {
        if(name === 'fs'){
            //console.log('Запесоченно'); 
            return null;
        }
        return require(name);
        //forEach(require.length)
    },
    // BLOCK ALL
    require: name => {
        return undefined;
    },
    // ALLOW ALL
    require: name => {
        return require(name)
    }
};
context.global = context;
const sandbox = vm.createContext(context);
const api = {timers, events};
const fileName = './application.js';
fs.readFile(fileName, 'utf8', (err, src)=>{
    src = `api => {${src}};`; //<>бу</>
    let script;
    try {
        script = new vm.Script(src, {timeout: PARSING_TIMEOUT});
    } catch(e){
        console.log(e);
        console.log('Parsing error');
        process.exit(1);
    }
    try {
        const f = script.runInNewContext(sandbox, {timeout: EXECUTION_TIMEOUT}) //custom loading
        f(api);
        const exported = sandbox.module.exports;
        const root = sandbox;
        console.log("<<<<<<<<<<<<<<< ROOT framework.js START---------------------")
        //console.dir(root, {depth:0});// obj
        console.log("<<<<<<<<<<<<<<< ROOT framework.js END---------------------")
        //console.dir({exported});
        //console.log('From global');
        //console.dir({fs,global},{depth: 1});
        //console.dir({global},{depth: 2});
        //console.dir({api},{depth: 3});
    } catch(e){
        console.log(e);
        console.log('Parsing error');
        process.exit(1);
    }
})
*/
process.on('uncaughtException', err => {
    console.log("Unhandled exception: " + err);
})