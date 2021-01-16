const addRequestId = (req, res, next) => {
    const requestId = Math.floor(Math.random() * 99999) + new Date().getTime();
    req.headers.requestId = requestId;
    console.log('NEW REQUEST - Request id', requestId, req.method, req.url);
    next();
}

module.exports = addRequestId;