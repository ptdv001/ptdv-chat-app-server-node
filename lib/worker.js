const restify = require('restify');
const ChatsDataStore = require('./models/chats');

const PORT = process.env.PORT || 8000;

//TEMP until figure out how to ref node
// const Bunyan = require('bunyan');
// var logger = new Bunyan({ 'name': 'chats'});


const ServerWorker = function (opt) {
    var opt = opt || {};
    this.server = null;
    this.logger = opt.logger;
};

ServerWorker.prototype.init = function (node, next) {
    var self = this;

    self.logger.info('HTTP Server initialized');

    self.server = restify.createServer({
        name: 'PTDV-CHAT'
    });

    // Note: probably shared across only this worker?
    self.chatsDS = new ChatsDataStore({
        logger: this.logger
    });

    new (require('./middleware'))(self.server, {
        logger: self.logger
    });

    new (require('./api/healthCheck'))(self.server, {
        logger: self.logger
    });

    new (require('./api/locales'))(self.server, {
        logger: self.logger
    });

    new (require('./api/chats'))(self.server, {
        logger: self.logger,
        chatsDS: self.chatsDS
    });

    //TODO add auth api

    self.server.listen(PORT, function () {
        self.logger.info('Application running: ' + self.server.name + ' on port ' + PORT);
    });
};

ServerWorker.prototype.start = function () { };
ServerWorker.prototype.stop = function () { };

module.exports = ServerWorker;
