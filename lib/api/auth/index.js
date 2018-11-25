var auth = require('../../resources/auth.js');

/*
EXAMPLE ADMIN/AUTH REST STATUS ERROR CODES

Digest
401, UnauthorizedError, Ldap auth fails

Login
401, UnauthorizedError, Login attempt username and password
400, BadRequestError, Login attempt one of username or password missing

Account Reset
401, InvalidCredentialsError, username or new password invalid 
400, BadRequestError, new password or username missing

Change Password
401, InvalidContentError, current password, new password, or username invalid 
400, BadRequestError, one of current password, new password, or username missing
401, NotAuthorizedError, Access without being logged in

Create Account
401, InvalidContentError, Invalid username or password
400, BadRequestError, Username exists

Validate
401, InvalidCredentialsError, Invalid or missing username or password

Check
401, UnauthorizedError, invalid token

Any API
500, InternalServerError, server error
503, ServiceUnavailableError, LDAP error
504, GatewayTimeoutError, LDAP timeout

--
401 Unauthorized=authentication only
403 Forbidden=authorization only, permissions..
	403 means you NEVER have permissions, which isn't correct, we aren't doing authorization, we are doing authentication (401 vs. 403)
400 means you didn't provide correct input (forgot a user name), not that the username is wrong
500 is basically "no fucking clue, something is broke"
502 = bind failure (admin has a bad user/pass for its self
503 = ldap failure
504 = ldap timeout
 */


var AuthApi = function (server, options) {
  //Auth Routes
  server.post({path: 'api/login', version: '0.0.0'}, auth.login);
  server.post({path: 'api/logout', version: '0.0.0'}, auth.logout);
  server.get({path: 'api/authenticate', version: '0.0.0'}, auth.authenticate);
};

module.exports = AuthApi;
