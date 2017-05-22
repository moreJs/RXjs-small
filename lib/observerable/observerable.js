'use strict';

const is = require('is');

class Observable {
    constructor(generateFn, observer) {
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
        this.observer = observer || null;
    }

    // lazy execute
    subscribe(nextFn, errorFn, completeFn) {

        if(is.fn(nextFn) && (!errorFn || is.fn(errorFn) && (!completeFn || is.fn(completeFn)))) {
            this.observer = {
                next: value => {
                    !this._complete && nextFn(value);
                },
                error: error => {
                    this._complete = true;
                    errorFn(error);
                },
                complete: () => {
                    this._complete = true;
                    completeFn();
                } 
            }
        }else if(is.object(nextFn)) {
            this.observer = nextFn;
        }else if(!this.observer) {
            throw new Error('please provide observer object or nextFn,errorFn and completeFn');
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

    map(mapFn) {
        return new Observable(observer => {
            this.subscribe(value => {
                const temp = mapFn(value);
                observer.next(temp);
            }, error => observer.error(error), () => observer.complete());
        });    
    }

    static from(itarable) {
        return new Observable((observer) => {
            try{
                for(let key of itarable) {
                    observer.next(key);
                }
                observer.complete();
            }catch(error) {
                observer.error(error);
            }
        });
    }

}

module.exports = Observable;