const _ = require('lodash');

// This is not about how to structure Data, is about how to structure REST. KISS

function Chats(options) {
    this.chats = [];
    this.logger = options.logger;
}

Chats.prototype.findChatById = function(chatId) {
    var foundChat = this.chats.filter(function(p) {
        return p.id === parseInt(chatId, 10);
    });

    if (foundChat.length > 1) {
        console.log('findChatById, something went two chats with same id');
    }

    if (foundChat && foundChat.length === 1) {
        return foundChat[0];
    }

    return null;
};

Chats.prototype.getChatsAfterId = function(lastChatId) {
    if (this.chats.length === 0) {
        return _getChatsOnly(this.chats);
    }

    lastChatId = lastChatId || 0;

    let chats = this.chats.filter(function(chat) {
        return chat.id > lastChatId;
    });

    return _getChatsOnly(chats);
};

Chats.prototype.addChat = function(chat) {
    // Use number counting vs Array-0 based counting.
    // TODO come up with a better way to ID chats
    let chatId = this.chats.length+1;

    this.chats.push({
        id: chatId,
        name: chat.name,
        timestamp: new Date(),
        messages: [],
        users: []
    });
};

Chats.prototype.deleteChatById = function(chatId) {
    chatId = parseInt(chatId, 10);
    _.remove(this.chats, function(chat) {
        return chat.id === chatId;
    });
};

Chats.prototype.getMessages = function(chatId) {
    let chat = this.findChatsById(chatId);

    if (!_.isEmpty(chat)) {
        return chat.messages;
    }

    return null;
};

Chats.prototype.getMessagesAfterId = function(chatId, lastMessageId) {
    let chat = this.findChatById(chatId);

    if (!chat) {
        return null
    }

    if (!lastMessageId) {
        return chat.messages;
    }

    let messages = chat.messages.filter(function(message) {     
        return message.id > lastMessageId;
    });

    return messages;
}

Chats.prototype.addMessage = function(chatId, message) {
    let chat = this.findChatById(chatId);

    if (!_.isEmpty(chat)) {
        message.id = chat.messages.length;
        console.log('added message ', message, 'to chat', chatId);
        return chat.messages.push(message);
    }

    return null;
};

Chats.prototype.getUsers = function(chatId) {
    let chat = this.findChatById(chatId);

    if (!_.isEmpty(chat)) {
        return chat.users;
    }

    return null;
};

Chats.prototype.getUsersAfterId = function(chatId, lastUserId) {
    let chat = this.findChatById(chatId);

    if (!chat) {
        return null
    }

    if (!lastUserId) {
        return chat.users;
    }

    let users = chat.users.filter(function(user) {
        return user.id > lastUserId;
    });

    return users;
}

Chats.prototype.addUser = function(chatId, user) {
    let chat = this.findChatById(chatId);

    if (!_.isEmpty(chat) && !_.isEmpty(user)) {
        user.id = chat.users.length;
        console.log('added user ', user, 'to chat', chatId);
        return chat.users.push(user);
    }

    return null;
};

Chats.prototype.deleteUserById = function(chatId, userid) {
    let chat = this.findChatById(chatId);

    if (!chat) {
        return null
    }

    userid = parseInt(userid, 10);
    if (_.isNumber(userid)) {
        return _.remove(chat.users, function(user) {
            return user.id === userid;
        });
    }

    return null;
};


// Only want chat data not related messages or users. This will reduce bandwidth
// when updating chat data.
function _getChatsOnly(chats) {
    return chats.map(function (chatMap) {
        return {
            id: chatMap.id,
            name: chatMap.name,
            timestamp: chatMap.timestamp
        };
    });
}

module.exports = Chats;
