'use strict'

const koa = require('koa');
const app = koa();

app.use( require('koa-static')('view/') );

app.listen( 9000, () => {
    console.log('start server at http://localhost:9000');
} );