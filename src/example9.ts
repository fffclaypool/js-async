/*
  Promiseの状態
    Promiseインスタンスには、内部的に次の3つの状態が存在する
      * Fulfilled
        resolve（成功）したときの状態. このときonFulfilledが呼ばれる
      * Rejected
        reject（失敗）または例外が発生したときの状態. このときonRejectedが呼ばれる
      * Pending
        FulfilledまたはRejectedではない状態
        new Promiseでインスタンスを作成したときの初期状態

    Promiseインスタンスの状態は作成時にPendingとなり, 一度でもFulfilledまたはRejectedへ変化すると, それ以降
    状態は変化しなくなる. そのため, FulfilledまたはRejectedの状態であることをSettled（不変）と呼ぶ

  またthenやcatchメソッドはすでにSettledへと状態が変化済みのPromiseインスタンスに対してもコールバック関数を登録で
  きる. 状態が変化済みのPromiseインスタンスを作成する方法としてPromise.resolveとPromise.rejectメソッドがある
 */

/* 
  Promise.resolveメソッドは, Fulfilledの状態になったPromiseインスタンスを作成する
  
  // const fulfilledPromise = Promise.resolve();
  const fulfilledPromise = new Promise((resolve) => {
    resolve();
  });
  
  下記のコードを実行すると, すべての同期的な処理が実行された後に、thenメソッドのコールバック関数が非同期なタイミングで
  実行されることがわかる
*/

// resolve()の返却値がvoidの場合は, new Promise<void>とする
const resolvePromise = new Promise<void>((resolve) => {
  console.log("1");
  // new Promise()を定義時は, 成功時のコールバック関数が渡されていないので実行されない
  resolve();
  // resolve()に後続する処理は, 同期的に実行される
  console.log("2");
});
// thenメソッドで登録したコールバック関数は, 常に非同期なタイミングで実行される
resolvePromise.then(() => {
  console.log("4");
});
console.log("3");

/*
  Promise.rejectメソッドはRejectedの状態となったPromiseインスタンスを作成する

  // const rejectedPromise = Promise.reject(new Error("error"));
  const rejectedPromise = new Promise((resolve, reject) => {
    reject(new Error("error"));
  });
 */

const rejectPromise = new Promise<void>((_, reject) => {
  console.log("1");
  // new Promise()を定義時は, 失敗時のコールバック関数が渡されていないので実行されない
  reject();
  // reject()に後続する処理は, 同期的に実行される
  console.log("2");
});
// thenメソッドで登録したコールバック関数は, 常に非同期なタイミングで実行される
rejectPromise.catch(() => {
  console.log("4");
});
console.log("3");
