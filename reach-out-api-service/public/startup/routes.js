const express = require('express');
const partnersRouter = require('../routes/partners');
const unexpectedError = require('../middlewares/unexpectedError');

module.exports = function (app) {
    // for parsing application/json
    app.use(express.json());
    app.use('/partners', partnersRouter);
    app.use(unexpectedError);
};