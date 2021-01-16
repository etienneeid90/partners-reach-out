const express = require('express');

const app = express();

// for parsing application/json
app.use(express.json());

app.listen(1330, () => console.log('Listening on port 1330...'));