const express = require('express');
const api = require('./routes/api');

const app = express();

console.log("SERVER LAUNCH");

app.use('/api/v1', api);
app.listen(process.env.PORT || 8080);
