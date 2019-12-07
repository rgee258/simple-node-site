const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function(req, res) {
  // Set to false since we're not expecting any query string
  const q = url.parse(req.url, false);
  // Check the req.url, the index will always be '/' so specify the index file
  // Otherwise grab the url and add on the file extension
  const fileName = (req.url === '/') ? './index.html' : '.' + req.url + '.html';
  fs.readFile(fileName, function(error, data) {
    if (error) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      fs.readFile('./404.html', function(error, data) {
        if (error) throw error;
        res.end(data);
      })
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      // If we add data here, we shorthand it to a res.write followed by a res.end
      res.end(data);
    }
  });
}).listen(8080);