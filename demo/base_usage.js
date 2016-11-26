'use strict';

const Obserable = require('../index');

const obserable = new Obserable((observer) => {
    let initial = 1;
    setInterval(() => {
        observer.next(initial++);
    },1000);
});

obserable.subscribe({
    next: value => console.log(`[value]=[${value}]`)
});