'use strict'

const router = require('koa-router')();
const bluebird = require('bluebird');
const user = bluebird.promisifyAll(require('../model/user.js'), { suffix: 'Promise' });
const bcrypt = bluebird.promisifyAll(require('bcrypt'), { suffix: 'Promise' });

const saltRounds = 10;

function register (app) {
    router.get('/user', function* (next) {
        console.log('in GET /user');

        let users = yield user.findPromise();
        this.body = users;
    });

    router.post('/user', function* (next) {
        console.log('in POST /user');

        let params = this.request.query;
        let salt = yield bcrypt.genSaltPromise(saltRounds);
        let hash = yield bcrypt.hashPromise(params.password, salt);
        let newUser = new user();
        newUser.username = params.username;
        newUser.salt = salt;
        newUser.password = hash;
        let savedUser = yield bluebird.promisify(newUser.save)();
        console.log(savedUser); 

        this.body = {
            _id: newUser._id,
            username: newUser.username,
        };
    });

    router.get('/user/:id', function* (next) {
        console.log('in GET /user/:id');
        
        let queryUser;
        try {
            queryUser = yield user.findByIdPromise(this.params.id);
        }
        catch (err) {
            if (err) {
                if (err.message.match(/Cast to ObjectId failed/)) {
                    this.response.status = 400;
                    this.body = {
                        message: 'invalid user id',
                    };
                }
                console.log(err);
            }
        }
        if (queryUser) {
            this.body = queryUser;
        }
        else {
            this.response.status = 400;
            this.body = {
                message: `user whitch id equal ${ this.params.id } not exist`,
            };
        }
    })

    app.use(router.routes());
    app.use(router.allowedMethods());
}

module.exports = register;