const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

app.disable('x-powered-by');

const PROXY_URL = 'http://localhost:8080';

app.use('/', proxy(PROXY_URL));

app.get('/', (req, res) => {
  res.send('Hello from the Express server!');
});

const PROXY_PORT = 3000;
app.listen(PROXY_PORT, () => {
  console.log('Proxy server is running on http://localhost:' + PROXY_PORT + ', forwarding / requests to ' + PROXY_URL);
});
