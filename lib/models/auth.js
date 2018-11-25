const _ = require('lodash');

//authentication = login - is ascerting someone is who s/he claims to be
//authorization = permissions - is to do with who is authorized to do what action (groups/levels..)

function Auth() {
  this.users = {};

  //TEMP
  this.users.testuser = {
    password: 'password',
    isAuthenticated: false
  }
}

Auth.prototype.login = function(username, password) {
  if (this.users[username] && this.users[username].password === password) {
    this.users[username].isAuthenticated = true;
    return true;
  }
  return false;
}

Auth.prototype.logout = function(username) {
  if (this.users[username]) {
    this.users[username].isAuthenticated = false;
    return true;
  }
  return false;
}

Auth.prototype.isAuthenticated = function(username) {
  return this.users[username] && this.users[username].isAuthenticated;
}


module.exports = Auth;