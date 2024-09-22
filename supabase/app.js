/**
 * node app.js로 실행하거나
 * npm install -g nodemon을 설치해서 (이때 -g는 global)
 * nodemon app.js로 실행             (nodemon은 변경사항을 실행중에도 반영되도록 함)
 * ctrl + c로 종료
 */
//supabase 연결하는법, 글쓰기 반영

const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // dotenv 패키지 로드

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://qmwgpwspubvrzhdejwxm.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'src', req.url === '/' ? 'pages/index.html' : req.url);
  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) { //css나 다른 형식들 반영
    case '.css':
      contentType = 'text/css';
      filePath = path.join(__dirname, 'src', 'style', 'index.css');
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  fs.readFile(filePath, (err, content) => { //오류시 보여주는 페이지
    if (err) {
      if (err.code == 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});