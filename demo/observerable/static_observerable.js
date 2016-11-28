'use strict';

const Observerable = require('../../index').Observerable;

const observerable = Observerable.from(['1','2','3','4','5']);

observerable.subscribe({
    next: value => console.log(`[value]=[${value}]`)
});

//setTimeout(function() {
//    observerable.unSubscribe();
// }, 5000);