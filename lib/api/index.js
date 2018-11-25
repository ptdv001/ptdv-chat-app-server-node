var chatsAPI = function (server, options) {
  var apis = [];
  apis.push(new (require('./chats'))(server, options));
};

module.exports = chatsAPI;