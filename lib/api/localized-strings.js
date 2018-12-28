var LocalizedStringsResource = require('../resources/localized-strings');

var LocalizedStringsApi = function (server, options) {
    var self = this;
    self.logger = options.logger;

    var localizedStrings = new LocalizedStringsResource(server, options);

    server.get({ path: '/api/localized-strings', version: '0.0.0' }, localizedStrings.get.bind(self));
};

module.exports = LocalizedStringsApi;
