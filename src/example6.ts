/*
  Promiseは, ES2015で導入された非同期処理の結果を表現するビルトインオブジェクトである
  エラーファーストコールバックは非同期処理を扱うコールバック関数の最初の引数にエラーオブジェクトを渡すというルールであったが,
  Promiseはこれを発展させたもので, 単なるルールではなくオブジェクトという形にして非同期処理を統一的なインターフェースで
  扱うことを目的にしている
 
  次のコードのasyncPromiseTask関数はPromiseインスタンスを返す非同期処理の例である. Promiseでは, 非同期処理に
  成功したときの処理をコールバック関数としてthenメソッドへ渡し、, 失敗したときの処理を同じくコールバック関数としてcatch
  メソッドへ渡す
  エラーファーストコールバックとは異なり, 非同期処理（asyncPromiseTask関数）はPromiseインスタンスを返している. その
  返されたPromiseインスタンスに対して, 成功と失敗時の処理をそれぞれコールバック関数として渡すという形になる

  // asyncPromiseTask関数はPromiseインスタンスを返す
  asyncPromiseTask().then(()=> {
    // 非同期処理が成功したときの処理
  }).catch(() => {
    // 非同期処理が失敗したときの処理
  });
  */

/*
  var Promise: PromiseConstructor
  new <unknown>(executor: (resolve: (value: unknown) => void, reject: (reason?: any) => void) => void) => Promise<unknown>
 */

const promise = new Promise((resolve, reject) => {
  // 非同期の処理が成功したときはresolve()を呼ぶ
  // 非同期の処理が失敗したときにはreject()を呼ぶ
});

const onFulfilled = () => console.log("resolved");
const onRejected = () => console.log("rejected");

/*
  (method) Promise<unknown>.then<unknown, never>(onfulfilled?: (value: unknown) => unknown, onrejected?: (reason: any) => PromiseLike<never>): Promise<unknown>
 */
// `then`メソッドで成功時と失敗時に呼ばれるコールバック関数を登録
promise.then(onFulfilled, onRejected);
