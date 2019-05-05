// const http = require('http');
// const dotEnv = require('dotenv').config();

import http from 'http';

const server = http.createServer((req, res) => {
    res.end('Server created!');
})

server.listen(process.env.PORT);