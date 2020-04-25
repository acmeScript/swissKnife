'use strict';

const worker = require('worker_threads');

const Application = require('./lib/application.js');

const application = new Application(worker);

application.on('started', () => {
  console.log(`Application started in worker ${worker.threadId}`);
});

worker.parentPort.on('message', async message => {
  if (message.name === 'stop') {
    if (application.finalization) return;
    console.log(`Graceful shutdown in worker ${worker.threadId}`);
    await application.shutdown();
    process.exit(0);
  }
});

const logError = err => {
    console.log(err)
};
process.on('uncaughtException', err => {
    console.log('одна их многих: ' + err.message);
    process.exit(1);
});
process.on('warning', warning => {
    console.log("одна из еще большего " + {warning});
});
// асинхронные ошибки
process.on('rejectionHandled', promise => {
    console.log({rejectionHandled: {promise}})
});
process.on('multipleResolves', (type, p, reason) =>{
    console.log({multipleResolves: {type, promise: p, reason}})
});
process.on('unhandledRejection', logError);
