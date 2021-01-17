const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
require('./public/startup/middlewares')(app);
require('./public/startup/routes')(app);

app.listen(1330, () => console.log('Listening on port 1330...'));