'use strict'

const router = require('koa-router')();
const user = require('../model/user.js');

function register (app) {
    router.get('/user', function* (next) {
        console.log('in GET /user');
        this.body = {  };
    });

    router.post('/user', function* (next) {
        console.log('in POST /user');
        console.log(this.req);
        this.body = {  };
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
}

module.exports = register;