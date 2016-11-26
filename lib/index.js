'use strict';

const is = require('is');

class Observable {
    constructor(generatorFn) {
        // this reps how to generator data
        this.gen = generatorFn;
        /**
            {
                next: value => {},
                err: error => {},
                complete: value => {}
            }
        */
        this.observer = {};
    }

    subscribe(onNext, onError, onComplete) {
        if(is.fn(successFn) && (!errorFn || is.fn(errorFn) && (!completeFn || is.fn(completeFn)))) {
            this.observer = {
                onNext,
                onError,
                onComplete 
            }
        }else if(is.object(onNext)) {
            this.observer = onNext;
        }
        this.gen(this.observer);
        return this;
    }
}

module.exports = Observable;