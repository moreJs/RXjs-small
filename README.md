# Rxjs 精简版 (inspire by Rxjs)
 - 主要用于个人学习


## 安装
***
### nodejs
- `rxjs-small`  is available on [npm](http://npmjs.org). To install it, type:

    $ npm install rxjs-small

###  基本使用

#### Observerable系列 (单路推送)

 ```js
    'use strict';

    const Observerable = require('rxjs-small').Observerable;

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
 ```

 output:
```js
[value]=[1]
[value]=[2]
[value]=[3]
[value]=[4]
```


#### Subject系列 (多路推送)
```js
'use strict';

const Subject = require('rxjs-small').Subject;

const subject = new Subject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(3)
```
output:

```js
observerA: 1
observerA: 2
observerA: 3
observerB: 3
```



### todo list
-  增加更多操作符,merge...等等
-  更加深入一些
### 更多使用参考 demo 目录 