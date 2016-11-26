'use strict';

const expect = require('chai').expect;
const Obserable = require('../index');

describe('Obserable 对象的基本使用', () => {
    let obserable = null;

    beforeEach(function() {
        // 在本区块的每个测试用例之前执行
        obserable = new Obserable((observer) => {
            observer.next(1);
        });
    });

    it('subscribe is ok', () => {
        let ret = null;
        obserable.subscribe({
            next: value => ret = value
        });
        setTimeout(function() {
            expect(ret).to.be.equal(1);
        }, 1);
    });
});


