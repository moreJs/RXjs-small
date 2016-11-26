'use strict';

const is = require('is');

class Observable {
    constructor(generateFn) {
        // this reps how to generate data
        this.gen = generateFn;
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
                next: nextFn,
                error: errorFn,
                complete: completeFn 
            }
        }else if(is.object(nextFn)) {
            this.observer = nextFn;
        }
        // run gen function
        this.gen(this.observer);
        return this;
    }
}

module.exports = Observable;