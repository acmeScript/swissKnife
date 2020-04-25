'use strict';
const {Worker} = require('worker_threads');
const config = require('./config/server.js');

const workers = [];
for(let i  = 0; i < config.ports.length;i++){
  const worker = new Worker('./worker.js');
  workers.push(worker);
}

/*
const fs = require('fs');
const http = require('http');
const path = require('path');

const STATIC_PATH = path.join(process.cwd(), './static');
const API_PATH = './api/';

const info = {
  key: "value"
}

const MIME_TYPES = {
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript; charset=UTF-8',
  css: 'text/css',
  png: 'image/png',
  ico: 'image/x-icon',
  json: 'application/json',
  svg: 'image/svg+xml',
};

const serveFile = name => {
  const filePath = path.join(STATIC_PATH, name);
  if (!filePath.startsWith(STATIC_PATH)) {
    //throw new Error(`Access denied: ${name}`)
    return null;
  }
  return fs.createReadStream(filePath);
};

const api = new Map();

const receiveArgs = async req => new Promise(resolve => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
    //console.log("Body array: ");
    //console.dir(body)
  }).on('end', async () => {
    const data = body.join('');
    //console.log("Received body request: ");
    //console.dir(data)
    const args = JSON.parse(data);
    //console.log("Received args request: ");
    //console.dir(args);
    await resolve(args);
  });
})
//.then((res)=>{console.log("all files");console.dir(res)});

const cacheFile = name => {
  const filePath = API_PATH + name;
  const key = path.basename(filePath, '.js');
  try {
    const libPath = require.resolve(filePath);
    delete require.cache[libPath];
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
    return;
  }
  try {
    const method = require(filePath);
    api.set(key, method);
  } catch (e) {
    api.delete(name);
  }
};

const cacheFolder = path => {
  fs.readdir(path, (err, files) => {
    if (err) return;
    files.forEach(cacheFile);
  });
};

const watch = path => {
  fs.watch(path, (event, file) => {
    cacheFile(file);
  });
};

cacheFolder(API_PATH);
watch(API_PATH);

const httpError = (res, status, message) => {
  res.statusCode = status;
  res.end(`"${message}"`);
};

const routing = {
  'algos': (req, res) => {
    //console.log(req.url + ' ' + res.statusCode);
    return { status: res.statusCode };
  },
  'files': 'files',
  'net': 'net',
  'fns': () => {console.log("window.Console, etc...")},
  'strings': '<div>строка это массив =)</div>',
  'datastructures': '[1,2,3]',
  'numbers': '010110101011001010110'
};

const types = {
  object: JSON.stringify,
  string: s => s,
  number: n => n + '',
  array: a => new Array(a),
  undefined: () => 'not found',
  function: (fn, req, res) => JSON.stringify(fn(req, res))
}

http.createServer(async (req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url;
  //const url = decodeURI(req.url);
  const [first, second] = url.substring(1).split('/');
  if (first === 'api') {
    //const method = api.get(second);
    const data = routing[second];
    const type = typeof data;
    //console.log("route data: " + data)
    const serializer = types[type];
    const result = serializer(data, req, res);
    //console.log("serialized response payload: " + result);
    const args = await receiveArgs(req);
    try {
      //const result = await method(...args);
      const result = serializer(data, req, res);
      console.log(result);
      if (!result) {
        httpError(res, 500, 'Server error');
        return;
      }
      res.end(JSON.stringify(result));
    } catch (err) {
      console.dir({ err });
      httpError(res, 500, 'Server error');
    }
  } else {
    const fileExt = path.extname(url).substring(1);
    //console.log("cached: " + fileExt);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[fileExt] });
    const stream = serveFile(url);
    if (stream) stream.pipe(res);
  }
  
}).listen(8000);
*/
process.on('SIGNINT', async () => {
  for(const worker of workers){
    worker.postMessage({name: 'stop'})
  }
})