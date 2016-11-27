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

    const Observerable = require('rxjs-small');

    
    const observerable = new Observerable((observer) => {
        let initial = 1;
        setInterval(() => {
            observer.next(initial++);
        },1000);
    });

    observerable.subscribe({
        next: value => console.log(`[value]=[${value}]`)
    });
 ```


### 更多使用参考 demo 目录 