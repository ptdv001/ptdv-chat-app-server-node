/**
 * Main use is receiving data posted from the client to server.
 * 
 * Returns response without parsing if not of type string.
 * 
 * May through an exception if invalid JSON.
 * 
 * @param {*} response  response from client that should be valid JSON formatted data
 * @param {*} logger standard logging object used to report errors
 */
function formatResponse(response, logger) {
    if (typeof response !== 'string') {
        return response;
    }

    try {
        return JSON.parse(response);
    } catch (e) {
        logger.warn('Response JSON was invalid: ', e.message);
        return next(e);
    }
}

module.exports = formatResponse;