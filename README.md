# Rxjs 精简版 (inspire by Rxjs)
 - 主要用于个人学习


## 安装
***
### nodejs
- `rxjs-small`  is available on [npm](http://npmjs.org). To install it, type:

    $ npm install rxjs-small

###  基本使用

 ```js
    'use strict';

    const Obserable = require();
    obserable = new Obserable((observer) => {
        let initial = 1;
        setInterval(() => {
            observer.next(initial++);
        },1000);
    });

    obserable.subscribe({
        next: value => console.log(`[value]=[${value}]`)
    });
 ```