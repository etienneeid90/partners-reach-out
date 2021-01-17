const logger = require('../utils/logger');

module.exports = function(err, req, res, next){
    const logPrefix = `${__filename.split(/(\\|\/)/g).pop()}, ${req.headers.requestId}`;

    logger.error(`${logPrefix} - Returning Unhandled Error ${err.message}`);
    res.status(500).send({
        status: 'error',
        data: {
            errorType: 'Unexpected Error',
            error: err.message
        }
    });
}