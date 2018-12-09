var HealthCheckResource = require('../resources/healthCheck');

var HealthCheckApi = function (server, options) {
  var self = this;
  self.logger = options.logger;

  var healthCheck = new HealthCheckResource(server, options);

  server.get({ path: '/api/health/check', version: '0.0.0' }, healthCheck.check.bind(self));
};

module.exports = HealthCheckApi;
