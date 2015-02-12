'use strict';

var fs = require('fs'),
    url = require('url'),
    querystring = require('querystring');

module.exports = function(req, res) {
  // GET/PUT/PATCH/DELETE
  console.log(req.method);

  if (req.method === 'POST') {
    //====================================
    // /resource POST ----> create resource
    //
    // superagent localhost:3000/notes/2 POST '{"id": 2, "name": "george", "sparkles" : "125"}'
    //
    //====================================
    var input = '';

    req.on('data', function(data) {
      input += data.toString('utf-8');
    });

    req.on('end', function() {

      var pathname = url.parse(req.url).pathname;
      var dirs = pathname.split("/");

      var parsed = JSON.parse(input);
      parsed.id = dirs[2];
      fs.writeFileSync('./data/notes' + dirs[2] + '.json',
                       JSON.stringify(parsed));
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      res.write(JSON.stringify(parsed));
      //console.dir(res);
      res.end();
    });

  } else if (req.method === 'GET') {
    //====================================
    // /resource GET ----> id
    //
    // superagent localhost:3000/notes/2 GET
    //
    //====================================

    var pathname = url.parse(req.url).pathname;
    var dirs = pathname.split("/");

    var data;
    var data = fs.readFileSync('./data/notes' + dirs[2] + '.json');
    var notesFromDB = JSON.parse(data.toString('utf8'));

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    //res.write(JSON.stringify({unicorn: "I'm a happy unicorn! Hooray!"}));
    res.write(JSON.stringify(notesFromDB));

    res.end();

  } else if (req.method === 'PUT') {
    //====================================
    // /resource/:id  PUT ----> replace resource
    //
    // superagent localhost:3000/notes/2 PUT '{"id": 2, "name": "fred", "sparkles" : "999"}'
    //
    //====================================
    var input = '';

    req.on('data', function(data) {
      input += data.toString('utf-8');
    });

    req.on('end', function() {

      var pathname = url.parse(req.url).pathname;
      var dirs = pathname.split("/");

      var parsed = JSON.parse(input);
      parsed.id = dirs[2];

      // If file does not already exist
      // ... return error

      fs.writeFileSync('./data/notes' + dirs[2] + '.json',
                       JSON.stringify(parsed));
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      res.write(JSON.stringify(parsed));
      //console.dir(res);
      res.end();
    });

  } else if (req.method === 'PATCH') {
    //====================================
    // /resource/:id  PATCH ----> update
    //                 only the specified fields of the entity
    //
    // superagent localhost:3000/notes/2 PATCH '{"id": 2, "name": "lucy"}'
    //
    //
    //====================================
    var input = '';

    req.on('data', function(data) {
      input += data.toString('utf-8');
    });

    req.on('end', function() {

      var pathname = url.parse(req.url).pathname;
      var dirs = pathname.split("/");

      var parsed = JSON.parse(input);
      parsed.id = dirs[2];

      var data;
      var data = fs.readFileSync('./data/notes' + dirs[2] + '.json');
      var notes2BUpdt = JSON.parse(data.toString('utf8'));

      for (var key in parsed) {
          notes2BUpdt[key] = parsed[key];
      }

      fs.writeFileSync('./data/notes' + dirs[2] + '.json',
                       JSON.stringify(notes2BUpdt));
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      res.write(JSON.stringify(notes2BUpdt));
      //console.dir(res);
      res.end();
    });

   } else if (req.method === 'DELETE') {
    //====================================
    // /resource/:id  DELETE ----> delete
    //
    //  superagent localhost:3000/notes/2 DELETE
    //
    //====================================
    var pathname = url.parse(req.url).pathname;
    console.log(pathname);
    var dirs = pathname.split("/");
    console.log(dirs);

    fs.unlinkSync('./data/notes' + dirs[2] + '.json');

    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });

    res.write("deleted ./data/notes" + dirs[2] + ".json");
    //console.dir(res);
    res.end();

 } else {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.write(JSON.stringify({msg: 'page not found'}));
    res.end();
  }
};
