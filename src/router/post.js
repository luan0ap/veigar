'use strict'

const router = require('koa-router')();

function register (app) {
    router.get('/post', function* (next) {
        console.log('in GET /post');
        this.body = { post: 0 };
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
}

module.exports = register;