//TODO consider changing api/chats/:id/messages -to-> api/messages?chatid=
//TODO consider getChats only returning chat rooms (not child data) for simplicity/consistency/bandwidth?

//TIPS
//3s company 4s no go
//if 4s, sweep under "?"
// hmmm: /messages?chatid=
//e.g.
//UI rooms/:id/chat
//UI groups/:id/chat/rooms/:id/chat
//API api/conversations/:id?filters..


var ChatsResource = require('../../resources/chats');

var chatsApi = function (server, options) {
  options = options || {};
  var self = this;
  self.logger = options.logger;
  self.chatsDS = options.chatsDS;

  var chats = new ChatsResource(server, {
    logger: self.logger,
    chatsDS: self.chatsDS
  });

  //TODO: split below REST APIs into seperate files once they grow big

  //Note: bind() required when invoked on an Object-Prototype-Class

  //Chat Routes
  server.get({ path: '/api/chats', version: '0.0.0' }, chats.getChats.bind(this));
  server.post({ path: '/api/chats', version: '0.0.0' }, chats.postChats.bind(this));
  server.get({ path: '/api/chats/:id', version: '0.0.0' }, chats.getChatsById.bind(this));
  server.put({ path: '/api/chats/:id', version: '0.0.0' }, chats.putChats.bind(this));
  server.del({ path: '/api/chats/:id', version: '0.0.0' }, chats.delChats.bind(this));

  //Chat Message Routes
  server.get({ path: '/api/chats/:id/messages', version: '0.0.0' }, chats.getMessages.bind(this));
  server.post({ path: '/api/chats/:id/messages', version: '0.0.0' }, chats.postMessage.bind(this));

  //Chat User Routes
  server.get({ path: '/api/chats/:id/users', version: '0.0.0' }, chats.getUsers.bind(this));
  server.post({ path: '/api/chats/:id/users', version: '0.0.0' }, chats.postUser.bind(this));
  server.del({ path: '/api/chats/:id/users', version: '0.0.0' }, chats.delUser.bind(this));
}

module.exports = chatsApi;
