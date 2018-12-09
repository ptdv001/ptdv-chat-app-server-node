const cluster = require('cluster');
const os = require('os');
const Bunyan = require('bunyan');
const ServerWorker = require('./lib/worker');

var logger = new Bunyan({ 'name': 'chats' });

/**
  Cloning: creating multipile instances of an app and loadbalancing (clustering) work between
  them

  Clustering: allows forking main application process into child processes based on CPUs (default round-robin)
	so cluster loads the the main file first as master and then clones it N-times as workers that can do work
	con caching is hard because a returning user may get a new worker and lose state cached in that worker
	redis or a sticky loadbalancer can help

  Decomposing: keep apps small and simple into microservices
	- Splitting: splitting an app into instances responsible for a part of the apps data, sharding
 */

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
  for (let i = 0; i < cpus; i++) {
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
