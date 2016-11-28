'use strict';

const is = require('is');

const Observerable = require('../index').Observerable;
const findIndex = require('array.prototype.findindex');

class Subject extends Observerable{
    constructor(optons) {
        optons = optons || {};
        super(optons);
        // 多路发射
        this.observers = optons.observers || [];
    }

    //初始化的时候，是否传递了generate data 的逻辑
    _hasGenFun() {
        try{
            let genFun = this._gen;
            if(is.fn(genFun)){
                return true;
            }else if(is.fn(genFun.next)) {
                this._gen = genFun.next;
                return true;
            }
            return false;
        }catch(e){
            return false;
        }
    }
    subscribe(observers) {
        if(!is.array(observers)) {
            observers = [observers];
        }
        let isUnSubscribe = false;
        this.observers = this.observers.concat(observers);
        //first: execute gen
        this._hasGenFun() && this._gen(observers[0]);
        //return unSubscribe
        return () => {
            if(isUnSubscribe) {
                return;
            }
            let index = this.observers.findIndex(item => item === observers[0]);
            this.observers.splice(index, 1);
            isUnSubscribe = true;
        }
    }
    next(value) {
        if(this.observers.length > 0) {
            this.observers.forEach(item => {
                try{
                    item.next && item.next(value);
                }catch(e){
                    this._handleError(e);
                    return;
                }
            });
        }
    }
    complete() {
        if(this.observers.length > 0) {
            this.observers.forEach(item => {
                item.complete && item.complete();
            });
        }
        //complete 是不可逆的
        this.observers = [];
    }
    _handleError() {
        if(this.observers.length > 0) {
            this.observers.forEach(item => {
                item.error && item.error();
            });
        }
        this.complete();  
    }
}

module.exports = Subject;