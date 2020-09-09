# 正文

## RxJS 简介

RxJS 是一个工具函数库,提供了一个核心类型 Observable，附属类型 (Observer、 Schedulers、 Subjects) 和受 [Array#extras] 启发的操作符 (map、filter、reduce、every, 等等)，这些数组操作符可以把异步事件作为集合来处理.

在 RxJS 中用来解决异步事件管理的的基本概念是：

* Observable (可观察对象): 表示一个概念，这个概念是一个可调用的未来值或事件的集合。
* Observer (观察者): 一个回调函数的集合，它知道如何去监听由 Observable 提供的值。
* Subscription (订阅): 表示 Observable 的执行，主要用于取消 Observable 的执行。
* Operators (操作符): 采用函数式编程风格的纯函数 (pure function)，使用像 map、filter、concat、flatMap 等这样的操作符来处理集合。
* Subject (主体): 相当于 EventEmitter，并且是将值或事件多路推送给多个 Observer 的唯一方式。
* Schedulers (调度器): 用来控制并发并且是中央集权的调度员，允许我们在发生计算时进行协调，例如 setTimeout 或 requestAnimationFrame 或其他。

### 事件监听器

原生写法:

```()
var button = document.querySelector('button');
button.addEventListener('click', () => console.log('Clicked!'));
```

RxJS:

```()
var button = document.querySelector('button');
Rx.Observable.fromEvent(button, 'click')
  .subscribe(() => console.log('Clicked!'));
```

有兴趣的可以去看文档, RxJS不仅仅只是换了个写法,更是提供了一组方法来管理事件的整个生命周期.

比如:

```()
Rx.Observable.fromEvent(button, 'click')
  .throttleTime(1000)
  .scan(count => count + 1, 0)
  .subscribe(count => console.log(`Clicked ${count} times`));
```

其他流程控制操作符有 filter、delay、debounceTime、take、takeUntil、distinct、distinctUntilChanged 等等。

### Observable (可观察对象)

```()
var observable = Rx.Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});
console.log('just after subscribe');

控制台执行的结果：

just before subscribe
got value 1
got value 2
got value 3
just after subscribe
got value 4
done

```

### 拉取 (Pull) vs. 推送 (Push)

什么是拉取？ - 在拉取体系中，由消费者来决定何时从生产者那里接收数据。生产者本身不知道数据是何时交付到消费者手中的。

每个 JavaScript 函数都是拉取体系。函数是数据的生产者，调用该函数的代码通过从函数调用中“取出”一个单个返回值来对该函数进行消费。

什么是推送？ - 在推送体系中，由生产者来决定何时把数据发送给消费者。消费者本身不知道何时会接收到数据。

在当今的 JavaScript 世界中，Promises 是最常见的推送体系类型。Promise(生产者) 将一个解析过的值传递给已注册的回调函数(消费者)，但不同于函数的是，由 Promise 来决定何时把值“推送”给回调函数。

在当今的 JavaScript 世界中，Promises 是最常见的推送体系类型。Promise(生产者) 将一个解析过的值传递给已注册的回调函数(消费者)，但不同于函数的是，由 Promise 来决定何时把值“推送”给回调函数。

RxJS 引入了 Observables，一个新的 JavaScript 推送体系。Observable 是多个值的生产者，并将值“推送”给观察者(消费者)。

* **Function** 是惰性的评估运算，调用时会同步地返回一个单一值。
* **Generator** 是惰性的评估运算，调用时会同步地返回零到(有可能的)无限多个值。
* **Promise** 是最终可能(或可能不)返回单个值的运算。
* **Observable** 是惰性的评估运算，它可以从它被调用的时刻起同步或异步地返回零到(有可能的)无限多个值。

### Observables 作为函数的泛化

> Observables 像是没有参数, 但可以泛化为多个值的函数。

> Observables 传递值可以是同步的，也可以是异步的。

那么 Observable 和 函数的区别是什么呢？Observable 可以随着时间的推移“返回”多个值，这是函数所做不到的

```()
函数只能返回一个值。但 Observables 可以这样：

var foo = Rx.Observable.create(function (observer) {
  console.log('Hello');
  observer.next(42);
  observer.next(100); // “返回”另外一个值
  observer.next(200); // 还可以再“返回”值
});

console.log('before');
foo.subscribe(function (x) {
  console.log(x);
});
console.log('after');
```

### Observable 剖析

Observables 是使用 **Rx.Observable.create** 或创建操作符创建的，并使用观察者来订阅它，然后执行它并发送 next / error / complete 通知给观察者，而且执行可能会被清理。这四个方面全部编码在 Observables 实例中，但某些方面是与其他类型相关的，像 **Observer (观察者)** 和 **Subscription (订阅)**。

Observable 的核心关注点：

* 创建 **Observables** : **Rx.Observable.create** 是 **Observable** 构造函数的别名，它接收一个参数：subscribe 函数。

    ```()
    var newObservable = Rx.Observable.create(function subscribe(observer) {
      var id = setInterval(() => {
        observer.next('hi')
      }, 1000);
    });
    ```

* 订阅 **Observables** : Observable 对象 newObservable 可以订阅 `newObservable.subscribe(x => console.log(x));` subscribe 调用在同一 Observable 的多个观察者之间是不共享的。当使用一个观察者调用 observable.subscribe 时，`Observable.create(function subscribe(observer) {...})` 中的 subscribe 函数只服务于给定的观察者。对 `observable.subscribe` 的每次调用都会触发针对给定观察者的独立设置.

* 执行 Observables : `Observable.create(function subscribe(observer) {...})`中...的代码表示 “Observable 执行”Observable 执行可以传递三种类型的值：

  * "Next" 通知： 发送一个值，比如数字、字符串、对象，等等。
  * "Error" 通知： 发送一个 JavaScript 错误 或 异常。
  * "Complete" 通知： 不再发送任何值。

  "Next" 通知是最重要，也是最常见的类型：它们表示传递给观察者的实际数据。"Error" 和 "Complete" 通知可能只会在 Observable 执行期间发生一次，并且只会执行其中的一个。
  > 在 Observable 执行中, 可能会发送零个到无穷多个 "Next" 通知。如果发送的是 "Error" 或 "Complete" 通知的话，那么之后不会再发送任何通知了。

* 清理 Observables : 每个执行都是其对应观察者专属的，一旦观察者完成接收值，它必须要一种方法来停止执行，以避免浪费计算能力或内存资源。当调用了 observable.subscribe ，观察者会被附加到新创建的 Observable 执行中。这个调用还返回一个对象，即 Subscription (订阅) - `var subscription = observable.subscribe(x => console.log(x));`.然后使用 subscription.unsubscribe() 你可以取消进行中的执行

  当我们使用 create() 方法创建 Observable 时，Observable 必须定义如何清理执行的资源。你可以通过在 function subscribe() 中返回一个自定义的 unsubscribe 函数。

  举例来说，这是我们如何清理使用了 setInterval 的 interval 执行集合：

  ```()
  var observable = Rx.Observable.create(function subscribe(observer) {
    // 追踪 interval 资源
    var intervalID = setInterval(() => {
      observer.next('hi');
    }, 1000);

    // 提供取消和清理 interval 资源的方法
    return function unsubscribe() {
      clearInterval(intervalID);
    };
  });
  ```

  为什么我们要使用像 Observable、Observer 和 Subscription 这样的 Rx 类型？原因是保证代码的安全性(比如 Observable 规约)和操作符的可组合性。

### Observer (观察者)

什么是观察者？ - 观察者是由 Observable 发送的值的消费者。观察者只是一组回调函数的集合，每个回调函数对应一种 Observable 发送的通知类型：next、error 和 complete 。下面的示例是一个典型的观察者对象：

```()
var observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};
```

要使用观察者，需要把它提供给 Observable 的 subscribe 方法：

```()
observable.subscribe(observer);
```

> 观察者只是有三个回调函数的对象，每个回调函数对应一种 Observable 发送的通知类型。

### Subscription (订阅)

什么是 Subscription ？ - Subscription 是表示可清理资源的对象，通常是 Observable 的执行。Subscription 有一个重要的方法，即 unsubscribe，它不需要任何参数，只是用来清理由 Subscription 占用的资源。在上一个版本的 RxJS 中，Subscription 叫做 "Disposable" (可清理对象)。

Subscription 还可以合在一起，这样一个 Subscription 调用 unsubscribe() 方法，可能会有多个 Subscription 取消订阅 。你可以通过把一个 Subscription 添加到另一个上面来做这件事：

```()
var observable1 = Rx.Observable.interval(400);
var observable2 = Rx.Observable.interval(300);

var subscription = observable1.subscribe(x => console.log('first: ' + x));
var childSubscription = observable2.subscribe(x => console.log('second: ' + x));

subscription.add(childSubscription);

setTimeout(() => {
  // subscription 和 childSubscription 都会取消订阅
  subscription.unsubscribe();
}, 1000);
```

### Subject (主体)

什么是 Subject？ - RxJS Subject 是一种特殊类型的 Observable，它允许将值多播给多个观察者，所以 Subject 是多播的，而普通的 Observables 是单播的(每个已订阅的观察者都拥有 Observable 的独立执行)。

```()
Subject 像是 Observable，但是可以多播给多个观察者。Subject 还像是 EventEmitters，维护着多个监听器的注册表。
```

每个 Subject 都是 Observable 。 - 对于 Subject，你可以提供一个观察者并使用 subscribe 方法，就可以开始正常接收值。从观察者的角度而言，它无法判断 Observable 执行是来自普通的 Observable 还是 Subject 。

每个 Subject 都是观察者。 - Subject 是一个有如下方法的对象： next(v)、error(e) 和 complete() 。要给 Subject 提供新值，只要调用 next(theValue)，它会将值多播给已注册监听该 Subject 的观察者们。

```()
var subject = new Rx.Subject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(1);
subject.next(2);

这是输出:

observerA: 1
observerB: 1
observerA: 2
observerB: 2
```

因为 Subject 是观察者，这也就在意味着你可以把 Subject 作为参数传给任何 Observable 的 subscribe 方法,从而把单播的observable执行转换为多播的,这也说明了 Subjects 是将任意 Observable 执行共享给多个观察者的唯一方式。

#### 多播的 Observables

“多播 Observable” 通过 Subject 来发送通知，这个 Subject 可能有多个订阅者，然而普通的 “单播 Observable” 只发送通知给单个观察者。

多播 Observable 在底层是通过使用 Subject 使得多个观察者可以看见同一个 Observable 执行。

在底层，这就是 multicast 操作符的工作原理：观察者订阅一个基础的 Subject，然后 Subject 订阅源 Observable 。

multicast 操作符返回一个 Observable，它看起来和普通的 Observable 没什么区别，但当订阅时就像是 Subject 。multicast 返回的是 ConnectableObservable，它只是一个有 connect() 方法的 Observable 。

connect() 方法十分重要，它决定了何时启动共享的 Observable 执行。因为 connect() 方法在底层执行了 source.subscribe(subject)，所以它返回的是 Subscription，你可以取消订阅以取消共享的 Observable 执行。

如果不想显式调用 connect()，我们可以使用 ConnectableObservable 的 refCount() 方法(引用计数)，这个方法返回 Observable，这个 Observable 会追踪有多少个订阅者。当订阅者的数量从0变成1，它会调用 connect() 以开启共享的执行。当订阅者数量从1变成0时，它会完全取消订阅，停止进一步的执行。

refCount 的作用是，当有第一个订阅者时，多播 Observable 会自动地启动执行，而当最后一个订阅者离开时，多播 Observable 会自动地停止执行。

refCount() 只存在于 ConnectableObservable，它返回的是 Observable，而不是另一个 ConnectableObservable 。

#### BehaviorSubject

Subject 的其中一个变体就是 BehaviorSubject，它有一个“当前值”的概念。它保存了发送给消费者的最新值。并且当有新的观察者订阅时，会立即从 BehaviorSubject 那接收到“当前值”。

BehaviorSubjects 适合用来表示“随时间推移的值”。举例来说，生日的流是一个 Subject，但年龄的流应该是一个 BehaviorSubject 。

```()
var subject = new Rx.BehaviorSubject(0); // 0是初始值

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(3);

输出：

observerA: 0
observerA: 1
observerA: 2
observerB: 2
observerA: 3
observerB: 3
```

#### ReplaySubject

ReplaySubject 类似于 BehaviorSubject，它可以发送旧值给新的订阅者，但它还可以记录 Observable 执行的一部分。

> ReplaySubject 记录 Observable 执行中的多个值并将其回放给新的订阅者。

当创建 ReplaySubject 时，你可以指定回放多少个值：

```()
var subject = new Rx.ReplaySubject(3); // 为新的订阅者缓冲3个值

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(5);

输出结果为:

observerA: 1
observerA: 2
observerA: 3
observerA: 4
observerB: 2
observerB: 3
observerB: 4
observerA: 5
observerB: 5
```

除了缓冲数量，你还可以指定 window time (以毫秒为单位)来确定多久之前的值可以记录

#### AsyncSubject

AsyncSubject 是另一个 Subject 变体，只有当 Observable 执行完成时(执行 complete())，它才会将执行的最后一个值发送给观察者。

AsyncSubject 是另一个 Subject 变体，只有当 Observable 执行完成时(执行 complete())，它才会将执行的最后一个值发送给观察者。

```()
var subject = new Rx.AsyncSubject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(5);
subject.complete();
输出：

observerA: 5
observerB: 5
```

AsyncSubject 和 last() 操作符类似，因为它也是等待 complete 通知，以发送一个单个值。

ps: 异步过程转同步存储

### Operators (操作符)

尽管 RxJS 的根基是 Observable，但最有用的还是它的操作符。操作符是允许复杂的异步代码以声明式的方式进行轻松组合的基础代码单元。

操作符是 Observable 类型上的方法，比如 .map(...)、.filter(...)、.merge(...)，等等。当操作符被调用时，它们不会改变已经存在的 Observable 实例。相反，它们返回一个新的 Observable ，它的 subscription 逻辑基于第一个 Observable 。

> 操作符是函数，它基于当前的 Observable 创建一个新的 Observable。这是一个无副作用的操作：前面的 Observable 保持不变。

操作符本质上是一个纯函数 (pure function)，它接收一个 Observable 作为输入，并生成一个新的 Observable 作为输出。订阅输出 Observable 同样会订阅输入 Observable 。

### Scheduler (调度器)

什么是调度器？ - 调度器控制着何时启动 subscription 和何时发送通知。它由三部分组成：

* 调度器是一种数据结构。 它知道如何根据优先级或其他标准来存储任务和将任务进行排序。
* 调度器是执行上下文。 它表示在何时何地执行任务(举例来说，立即的，或另一种回调函数机制(比如 setTimeout 或 process.nextTick)，或动画帧)。
* 调度器有一个(虚拟的)时钟。 调度器功能通过它的 getter 方法 now() 提供了“时间”的概念。在具体调度器上安排的任务将严格遵循该时钟所表示的时间。

> 调度器可以让你规定 Observable 在什么样的执行上下文中发送通知给它的观察者。
