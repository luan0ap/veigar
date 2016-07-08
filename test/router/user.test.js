'use strict'

const supertest = require('supertest');
const agent = require('supertest-koa-agent');
const app = require('../../src/app.js');
const assert = require('chai').assert;

describe('test/router/user.test.js', () => {
    describe('GET /user', () => {
        it('should return array of users', done => {
            agent(app).get('/user').end((err, result) => {
                let data = result.res.body;
                assert.isArray(data, 'should be array of users');
                assert.equal(0, data.length, 'users length should equal 0');
                done();
            });
        })
    });
});