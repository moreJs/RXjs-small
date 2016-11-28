'use strict';
/** 回放旧值的数量（默认为1） */

const Base = require('./subject');

class ReplaySubject extends Base{
    constructor(options) {
        options = options || {};
        super(options);
        this.replayCount = options.replayCount || 1;
        this.replayRet = [];
    }

    next(value, isInnerCall) {
        if(!isInnerCall) {
            this.replayRet.push(value);
        }
        super.next(value);
    }

    subscribe(observers) {
        // replay 倒序
        let len = this.replayRet.length;
        let count = this.replayCount;
        while(len > 0 && count > 0) {
            let value = this.replayRet[--len];
            count--;
            observers.next(value);
        }
        return super.subscribe(observers);
    }


}

module.exports = ReplaySubject;