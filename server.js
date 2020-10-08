const path = require('path');
const jsonServer = require('json-server');
const express = require('express');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middleWares = jsonServer.defaults();
const root = __dirname + '/build';
const port = process.env.LEANCLOUD_APP_PORT;  // lean cloud deploy

server.use(express.static(root, { maxAge: 864000 }));
server.use(middleWares);
const reactRouterWhiteList = ['/create', '/edit/:itemId'];
server.get(reactRouterWhiteList, (request, response) => {
  response.sendFile(path.resolve(root, 'index.html'));
});

server.use(router);

server.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
