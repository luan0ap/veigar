'use strict'

const fs = require('fs');

const koa = require('koa');
const json = require('koa-json');
const logger = require('koa-logger');
const app = koa();

// support json type response
app.use(json());

// support request log
app.use(logger());

// import all routers
fs.readdir(__dirname + '/router', (err, result) => {
    if (err) {
        console.log('require routers error --> ', err);
        return;
    }
    
    for (let file of result) {
        require(`./router/${ file }`)(app);
    }
});

// static file
app.use(require('koa-static')('view/'));

// start listener
app.listen(9000, () => {
    console.log('start server at http://localhost:9000');
});

// error handle
app.on('error', err => {
    console.log('error --> ', err);
    process.exit(1);
});