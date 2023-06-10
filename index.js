const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }


  if (req.url === '/' && req.method === 'GET') {

    fs.readFile('db.json', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Сервер запущено на порту http://localhost:${port}`);
});