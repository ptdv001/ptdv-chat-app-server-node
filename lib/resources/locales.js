const localesJSON = require('../models/locales.json');

function Locales(server, options) {
    options = options || {};
    this.logger = options.logger;
}

Locales.prototype.get = function (req, res, next) {
    // res.send(200, JSON.stringify(localesJSON));
    res.send(200, localesJSON);
    return next();
};

module.exports = Locales;
