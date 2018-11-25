const cluster = require('cluster');
const os = require('os');
const Bunyan = require('bunyan');
const ServerWorker = require('./lib/worker');

var logger = new Bunyan({ 'name': 'chats'});

if (cluster.isMaster) {
  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      logger.info(`Worker ${worker.id} crashed. ` +
                  'Starting a new worker...');
      cluster.fork();
    }
  });

  const cpus = os.cpus().length;
  
  logger.info(`Forking for ${cpus} CPUs`);
  for (let i=0; i<cpus; i++) {
    cluster.fork();
  }

  for (let worker in cluster.workers) {
    cluster.workers[worker].send(`Hello Worker ${worker}`);
  }
} else {
  logger.info('Cluster Worker forking');
  var worker = new ServerWorker({
    logger: logger
  });
  worker.init();
}
