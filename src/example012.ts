function fn1() {
  /*
    Promiseチェーンにおいて, thenメソッドの次に別のthenメソッドが存在する場合, 後者のthenメソッドが呼び出された
    これは, コールバック関数で任意の値を返すとその値でresolveされたFulfilled状態のPromiseインスタンスを作成
    するためである
    しかし, thenメソッドでRejected状態のPromiseインスタンスを返した場合は、次に呼ばれるのは失敗時の処理となる
   */
  Promise.resolve()
    .then(function onFulfilledA() {
      return Promise.reject(new Error("failure"));
    })
    .then(function onFulfilledB() {
      console.log("no output"); // 出力されない
    })
    .catch(function onRejected(error) {
      console.log(error.message); // failure
    })
    .then(function onFulfilledC() {
      console.log("hi"); // hi
    });
}

function fn2() {
  /*
    catchメソッドでRejectedなPromiseインスタンスを返すことで, catchしてもRejectedな状態を継続できる
   */
  Promise.reject(new Error("error"))
    .catch((error) => {
      return Promise.reject(error);
    })
    .then(() => {
      console.log("no output"); // 出力されない
    })
    .catch((error) => {
      console.log("hi"); // hi
    });
}

function main() {
  fn1();
  fn2();
}

main();
