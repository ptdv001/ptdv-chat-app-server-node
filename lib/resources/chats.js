const _ = require('lodash');
const formatResponse = require('../engines/formatJson');    // req.body, /path and body of request must be JSON.parse'd


function Chats(server, options) {
    options = options || {};
    this.logger = options.logger;
    this.chatsDS = options.chatsDS;
}

Chats.prototype.getChats = function(req, res, next) {
    let self = this;
    let lastChatId = parseInt(req.query.id, 10);
    // Get any chats after id
    let chats = self.chatsDS.getChatsAfterId(lastChatId);

    if (chats) {
        res.send(200, chats); 
    } else {
        res.send(500, 'internal error retrieving chats');
    }
    return next();
};

Chats.prototype.getChatsById = function(req, res, next) {
    let self = this;
    let found = self.chatsDS.findChatById(req.params.id);
    if (found) {
        res.send(200, found);
    } else {
        res.send(404, 'chat not found');
    }
    return next();
};
    
Chats.prototype.postChats = function(req, res, next) {
    let self = this;

    // Account for case of Client not setting header: 'Content-Type': 'application/json'
    let chats = formatResponse(req.body, self.logger);

    if (!_.isArray(chats)) {
        self.logger.warn('Chats Post error, chats is not an array');
        res.send(400, 'Chats should be an array');
    }

    _.forEach(chats, function(chat) {
        if (!chat.hasOwnProperty('name')) {
            self.logger.warn('Chats Post error, Chat missing name.');
            res.send(400, 'Chats Post error, Chat missing name.');
        } else {
            self.logger.info('Added chat ', chat);
            self.chatsDS.addChat(chat);
        }
    });

    res.send(201);
    return next();
};

Chats.prototype.putChats = function(req, res, next) {
    let self = this;
    let chat = formatResponse(req.body);

    if (!chat) {
        self.logger.warn('Chats putChats error, invalid format', req.body);
        res.send(400, 'Chats putChats error, invalid format.');
        return next();
    }

    if (!chat.hasOwnProperty('name')) {
        self.logger.warn('putChats:: chat missing name property chat=', req.body);
        res.send(400, 'Chat missing name.');
        return next();
    }

    let found = self.chatsDS.findChatById(req.params.id);
    if (found) {
        found.name = chat.name;
        res.send(204, found);
    } else {
        res.send(404, 'Chat not found');
    }
    return next();
};

Chats.prototype.delChats = function(req, res, next) {
    let self = this;
    if (!self.chatsDS.findChatById(req.params.id)) {
        res.send(404, 'Chat not found');
        return next();
    }

    self.chatsDS.deleteChatById(req.params.id);
    res.send(204);
    return next();
};

Chats.prototype.getMessages = function(req, res, next) {
    let self = this;
    let chatId = parseInt(req.params.id, 10);
    let lastMessageId = parseInt(req.query.id, 10);
    // Get any messages after id
    let messages = self.chatsDS.getMessagesAfterId(chatId, lastMessageId);

    if (messages) {
        res.send(200, messages); 
    } else {
        res.send(404, 'chat not found');
    }
    return next();
};

Chats.prototype.postMessage = function(req, res, next) {
    let self = this;
    let chat = self.chatsDS.findChatById(req.params.id);
    let message;
    let result

    if (!chat) {
        res.send(404, 'chat not found');
        return next();
    }

    message = formatResponse(req.body);
    message = message ? message.message : message;
    if (!message) {
        res.send(400, 'message not sent properly');
        return next();
    }

    result = self.chatsDS.addMessage(req.params.id, message);
    if (result) {
        res.send(201);
    }
    return next();
};

Chats.prototype.getUsers = function(req, res, next) {
    let self = this;
    let chatId = parseInt(req.params.id, 10);
    let lastUserId = parseInt(req.query.id, 10);
    // Get any users after id
    let users = self.chatsDS.getUsersAfterId(chatId, lastUserId);

    if (users) {
        res.send(200, users); 
    } else {
        res.send(404, 'chat not found');
    }
    return next();
};

Chats.prototype.postUser = function(req, res, next) {
    let self = this;
    let chat = self.chatsDS.findChatById(req.params.id);
    if (chat) {
        let result = self.chatsDS.addUser(req.params.id, req.body.user);
        if (result) {
            res.send(201);
        }
        return next();
    }

    res.send(404, 'chat not found');
    return next();
};

    //TODO - test
Chats.prototype.delUser = function(req, res, next) {
    let self = this;
    let chat = self.chatsDS.findChatById(req.params.id);

    if (!chat) {
        res.send(404, 'chat not found');
        return next();
    }

    if (!self.chatsDS.deleteUserById(chat.id, req.query.id)) {
        res.send(404, 'user ' + req.query.id + ' not found');
        return next();
    }
    
    res.send(204);
    return next();
};

module.exports = Chats;
