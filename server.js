const express = require('express');
const path = require('path');
const next = require('next');
require('dotenv').config();
const dev = process.env.NODE_ENV !== 'production';
console.log('dev:', dev);
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Serve files from the 'uploads' directory
  server.use('/uploads', (req, res, next) => {
    console.log(`Request for ${req.url}`);
    next();
  }, express.static(path.join(__dirname, 'uploads')));

  // Handle all other requests with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
