const addRequestId = require('../middlewares/addRequestId');

module.exports = function (app) {
    app.use(addRequestId);
};