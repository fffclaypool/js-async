/*
  Promiseチェーン
    非同期処理が終わったら次の非同期処理というように, 複数の非同期処理を順番に扱いたい場合がある. Promiseでは
    このような複数の非同期処理からなる一連の非同期処理を簡単に書く方法が用意されている

    この仕組みのキーとなるのがthenやcatchメソッドは常に新しいPromiseインスタンスを作成して返すという仕様である
    そのためthenメソッドの返り値であるPromiseインスタンスにさらにthenメソッドで処理を登録できる
 */

Promise.resolve()
  .then(() => console.log(1))
  .then(() => console.log(2));

// 上記コードは, 下記コードと結果としては同じ意味となる
const firstPromise = Promise.resolve();
const secondPromise = firstPromise.then(() => console.log(1));
const thirdPromise = secondPromise.then(() => console.log(2));
