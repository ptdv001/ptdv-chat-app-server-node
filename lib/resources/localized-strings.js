//TODO get based on locale
const localizedStringsJSON = require('../models/localized-strings/en-us.json');

function LocalizedStrings(server, options) {
    options = options || {};
    this.logger = options.logger;
}

LocalizedStrings.prototype.get = function (req, res, next) {
    // res.send(200, JSON.stringify(localesJSON));
    res.send(200, localizedStringsJSON);
    return next();
};

module.exports = LocalizedStrings;
