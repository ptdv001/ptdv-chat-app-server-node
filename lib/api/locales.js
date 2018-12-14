var LocalesResource = require('../resources/locales');

var LocalesApi = function (server, options) {
    var self = this;
    self.logger = options.logger;

    var locales = new LocalesResource(server, options);

    server.get({ path: '/api/locales', version: '0.0.0' }, locales.get.bind(self));
};

module.exports = LocalesApi;
