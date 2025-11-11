
const express = require('express');
const https = require('https');
const fs = require('fs');
const proxy = require('express-http-proxy');
const cors = require('cors');

const app = express();

// 🔐 Load SSL certs
const privateKey = fs.readFileSync('./certs/server.key', 'utf8');
const certificate = fs.readFileSync('./certs/server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Define the specific origin(s) you want to allow
const allowedOrigin = ['https://jasonvaughn.dev', 'https://www.jasonvaughn.dev'];

// Configure CORS options
const corsOptions = {
  origin: allowedOrigin, // Allow requests only from this specific origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
  credentials: true, // Allow cookies to be sent with cross-origin requests
  // Other options like allowedHeaders, exposedHeaders, maxAge can also be configured
};

// 🌐 Allow CORS (optional)
app.use(cors(corsOptions));

// 🧭 Target backend server (change this to your real backend IP/port)
const TARGET = 'http://localhost:8080';  // or https://... if it uses HTTPS

// 🚀 Reverse proxy all requests to target
app.use('/', proxy(TARGET, {
  proxyReqPathResolver: (req) => req.originalUrl,  // preserve request path
  proxyErrorHandler: (err, res, next) => {
    console.error('Proxy error:', err);
    res.status(502).send('Bad Gateway');
  }
}));

// 🔊 Start HTTPS server
https.createServer(credentials, app).listen(3000, () => {
  console.log(`HTTPS Reverse Proxy running on port 3000`);
  console.log(`Forwarding all requests to ${TARGET}`);
});
