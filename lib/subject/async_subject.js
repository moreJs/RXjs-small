'use strict';
/** 只会推送，complete 之前的最后一个值 */

const Base = require('./subject');

class AsyncSubject extends Base{
    constructor(options) {
        super(options);
        // 存储最终的结果
        this._value = null;
    }

    next(value) {
        this._value = value;
    }

    complete() {
        this._emit();
        super.complete();
    }
    _emit() {
        if(this.observers.length > 0) {
            this.observers.forEach(item => {
                item.next(this._value);
            });
        }
    }
}

module.exports = AsyncSubject;