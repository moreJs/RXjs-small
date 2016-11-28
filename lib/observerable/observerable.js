'use strict';

const is = require('is');

class Observable {
    constructor(generateFn) {
        // this reps how to generate data
        this._gen = generateFn;
        // this reps stop to generate data
        this._unSubscribe = () => {};
        // is complete ? 
        // if complete, next dose not excute yet
        this._complete = false;
        /**
            {
                next: value => {},
                err: error => {},
                complete: value => {}
            }
        */
        this.observer = {};
    }

    subscribe(nextFn, errorFn, completeFn) {
        if(is.fn(nextFn) && (!errorFn || is.fn(errorFn) && (!completeFn || is.fn(completeFn)))) {
            this.observer = {
                next: () => {
                    !this._complete && nextFn();
                },
                error: () => {
                    this._complete = true;
                    errorFn();
                },
                complete: () => {
                    this._complete = true;
                    completeFn();
                } 
            }
        }else if(is.object(nextFn)) {
            this.observer = nextFn;
        }
        // run gen function, and return unSubscribe
        try{
            this._unSubscribe = this._gen(this.observer);
        }catch(e){
            this.observer.error && this.observer.error(e);
        };

        return this;
    }

    unSubscribe() {
        //first: run complete
        this._complete = true;
        this.observer.complete && this.observer.complete();
        //second: stop gen data
        return this._unSubscribe();
    }

    static from(itarable) {
        return new Observable((observer) => {
            for(let key of itarable) {
                observer.next(key);
            }
        });
    }

}

module.exports = Observable;