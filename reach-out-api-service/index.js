const express = require('express');
const addRequestId = require('./public/middlewares/addRequestId');

const app = express();

require('./public/startup/routes')(app);

app.use(addRequestId);

app.listen(1330, () => console.log('Listening on port 1330...'));