'use strict';

const expect = require('chai').expect;
const Observerable = require('../index').Observerable;

describe('Obserable 对象的基本使用', () => {
    let observerable = null;

    beforeEach(function() {
        // 在本区块的每个测试用例之前执行
        observerable = new Observerable(observer => {
            observer.next(1);
        });
    });

    it('subscribe is ok', (done) => {
        let ret = null;
        observerable.subscribe({
            next: value => ret = value
        });
        setTimeout(function() {
            expect(ret).to.be.equal(1);
            done();
        }, 1);
    });

    it('errorFun is ok', (done) => {
        let ret = null;
        let errorMessage = null;
        observerable = new Observerable((observer) => {
            throw new Error('obserable makes something error');
        });

        observerable.subscribe({
            next: value => ret = value,
            error: error => errorMessage = error.message
        });

        setTimeout(function() {
            expect(errorMessage).to.be.equal('obserable makes something error');
            done();
        }, 1);

    });

    it('map is ok', done => {
        let ret = null;
        observerable.map(value => ++value)
                    .subscribe(value => 　{
                        ret = value;
                    });

        setTimeout(function() {
            expect(ret).to.be.equal(2);
            done();
        }, 1);

    });
});


