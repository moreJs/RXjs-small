'use strict';

const ReplaySubject = require('./replay_subject');

class BehaviorSubject extends ReplaySubject{
    constructor(options) {
        options = options || {};
        let fixOptions = Object.assign({}, options, {replayCount: 1});
        super(fixOptions);
    }
}

module.exports = BehaviorSubject;