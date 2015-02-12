'use strict';

var http = require('http'),
    url = require('url'),
    querystring = require('querystring');

var notesRoutes = require('./lib/notes_route');

var routes = {};
routes['/notes/*'] = notesRoutes;

var server = http.createServer(function(req, res) {

  var pathname = url.parse(req.url).pathname;
  var dirs = pathname.split("/");

  if (dirs[1] === 'notes' && dirs.length === 3) {
    notesRoutes(req, res);
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.write(JSON.stringify({msg: 'page not found'}));
    res.end();
  }
});

server.listen(3000, function() {
  console.log('server listening');
});
