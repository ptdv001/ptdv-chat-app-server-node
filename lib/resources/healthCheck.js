
function HealthCheck(server, options) {
    options = options || {};
    this.logger = options.logger;
}

HealthCheck.prototype.check = function(req, res, next) {
    res.send(200, 'Health Check good');

    //TODO add checks about chat state maybe?
    return next();
};

module.exports = HealthCheck;