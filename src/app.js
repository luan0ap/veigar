'use strict'

const fs = require('fs');

const koa = require('koa');
const json = require('koa-json');
const app = koa();

// support json type response
app.use(json());

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

app.listen(9000, () => {
    console.log('start server at http://localhost:9000');
});