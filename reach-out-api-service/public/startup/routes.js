const express = require('express');
const partnersRouter = require('../routes/partners');

module.exports = function (app) {
    // for parsing application/json
    app.use(express.json());
    app.use('/partners', partnersRouter);
};