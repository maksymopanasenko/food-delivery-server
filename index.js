const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {

    fs.readFile('db.json', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }

      try {
        const jsonData = JSON.parse(data);
        const images = [];

        for (const item of jsonData) {
          const imagePath = path.join(__dirname, 'image', item.image);
          console.log(imagePath)
          const image = fs.readFileSync(imagePath, 'base64');
          images.push(image);
        }

        const responseData = {
          data: jsonData,
          images: images,
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
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