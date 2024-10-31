// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const comments = require('./comments.json');

// Create web server
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/comments') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(comments));
    } else {
      fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
    }
  } else if (req.method === 'POST') {
    if (req.url === '/comments') {
      let body = '';
      req.on('data', (data) => {
        body += data;
      });
      req.on('end', () => {
        const comment = JSON.parse(body);
        comments.push(comment);
        res.end(JSON.stringify(comment));
      });
    }
  }
});

server.listen(3000);
console.log('Server is listening to http://localhost:3000');