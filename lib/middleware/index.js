const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

var ChatsMiddleware = function (server) {
    //Middlewear
    const cors = corsMiddleware({
      preflightMaxAge: 5, //Optional 
      origins: ['http://localhost:8080'], //['*'],
    
        //Access-Control-Allow-Credentials: true, to allow cookies to be accessed
    
    //   allowHeaders: ['API-Token'],
    //   exposeHeaders: ['API-Token-Expiry']
    });
    server.pre(cors.preflight)
    server.use(cors.actual)
    
    server.use(restify.plugins.acceptParser(server.acceptable));
    server.use(restify.plugins.bodyParser());
    // Query params (?a=..) available through req.query
    server.use(restify.plugins.queryParser({ mapParams: false }));
    
    // Shared Resources -  Never cache private data (Network and Client cache, also process cached)
    // Expires: 1.0 for Client caching, crude since don't always have expire time
    //-or-
    // Cache-Control: 1.1 new client caching that gives a time duration, even cache proxy diff
    // Cache-Control: max-age=3600, s-max-age: 1200 //1hour and 20min
    //-or-
    // Personal Data - Validation Caching (prob + Cache-Control: no-cache, Expires: -1)
    // Client: GET 200 OK, ETag: HASH_ID
    // Changed? No API Returns: 304 Not Modified //client uses its own version
    // Changed? Yes API Returns: If-none-match: "HASH_ID"   //no body

};

module.exports = ChatsMiddleware;
