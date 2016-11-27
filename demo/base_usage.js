'use strict';

const Observerable = require('../index');

const observerable = new Observerable((observer) => {
    let initial = 1;
    let id = setInterval(() => {
        observer.next(initial++);
    },1000);
    return () => {
        clearInterval(id);
    }
});

observerable.subscribe({
    next: value => console.log(`[value]=[${value}]`)
});

setTimeout(function() {
    observerable.unSubscribe();
}, 5000);