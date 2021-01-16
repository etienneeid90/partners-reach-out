const express = require('express');
const addRequestId = require('./public/middlewares/addRequestId');
const partnersRouter = require('./public/routes/partners');

const app = express();

// for parsing application/json
app.use(express.json());
app.use(addRequestId);
app.use('/partners', partnersRouter);

app.listen(1330, () => console.log('Listening on port 1330...'));