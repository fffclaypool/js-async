/*
  asyncTask関数が成功（resolve）した場合はthenメソッドで登録した成功時の処理だけが呼び出され, catchメソッドで
  登録した失敗時の処理は呼び出されない. 一方, asyncTask関数が失敗（reject）した場合はthenメソッドで登録した成
  功時の処理は呼び出されずに, catchメソッドで登録した失敗時の処理だけが呼び出される
  finallyメソッドは成功時, 失敗時どちらの場合でも呼び出されるコールバック関数を登録できる. try ~ catch ~ fin
  ally構文のfinally節と同様の役割を持つメソッドである
 */

function asyncTask() {
  return Math.random() > 0.5
    ? Promise.resolve("success")
    : Promise.reject(new Error("failure"));
}

asyncTask()
  .then(function onFulfilled(value) {
    console.log(value); // success
  })
  .catch(function onRejected(error) {
    console.log(error.message); // failure
  })
  .finally(() => console.log("finally")); // 成功, 失敗どちらの場合でも呼び出される

/*
  Promiseの状態がRejectedとなった場合は, もっとも近い失敗時の処理（catchまたはthenの第二引数）が呼び出される
  このとき間にある成功時の処理（thenの第一引数）はスキップされる
 */

const rejectedPromise = Promise.reject(new Error("failure"));
rejectedPromise
  .then(() => console.log("no output"))
  .then(() => console.log("no output"))
  .catch((error) => console.log(error.message)) // 出力される
  .catch((error) => console.log("no output"));

/*
  Promiseのコンストラクタの処理の場合と同様に, thenやcatchのコールバック関数内で発生した例外は自動的にキャッチさ
  れる. 例外が発生したとき, thenやcatchメソッドはRejectedなPromiseインスタンスを返す. そのため, 例外が発生す
  るともっとも近くの失敗時の処理（catchまたはthenの第二引数）が呼び出される
*/

Promise.resolve()
  .then(() => {
    throw new Error("failure");
  })
  .then(() => console.log("no output"))
  .catch((error) => console.log(error.message)) // 出力される
  .catch((error) => console.log("no output"));

/*
  Promiseチェーンで失敗をcatchメソッドなどで一度キャッチすると, 次に呼ばれるのは成功時の処理である. これは、thenや
  catchメソッドはFulfilled状態のPromiseインスタンスを作成して返すためである. そのため, 一度キャッチするとそこから
  は元のthenで登録した処理が呼ばれるPromiseチェーンに戻る
 */

Promise.reject(new Error("error"))
  .catch((error) => console.log(error.message)) // 出力される
  .catch((error) => console.log("no output"))
  .then(() => console.log("hello")) // 出力される
  .then(() => console.log("hello")); // 出力される

Promise.resolve;

/*
  Promiseチェーンではコールバックで返した値を次のコールバックへ引数として渡せる. thenやcatchメソッドのコールバック関
  数は数値, 文字列, オブジェクトなどの任意の値を返せる. このコールバック関数が返した値は, 次のthenのコールバック関
  数へ引数として渡される
 */

Promise.resolve(1)
  .then((value) => {
    console.log(value); // 1
    return value * 2;
  })
  .then((value) => {
    console.log(value); // 2
    return value * 2;
  })
  .then((value) => {
    console.log(value); // 4
    // 値を返さない場合は, undefinedを返すのと同じ
  })
  .then((value) => {
    if (value == undefined) console.log("undefined"); // undefined
  }); // undefined
