/*
  await 式
    Async Functionの関数内ではawait式を利用できる. await式は右辺のPromiseインスタンスがFulfilledまたは
    Rejectedになるまでその場で非同期処理の完了を待つ. そしてPromiseインスタンスの状態が変わると, 次の行の処理
    を再開する
      async function asyncMain() {
        // PromiseがFulfilledまたはRejectedとなるまで待つ
        await Promiseインスタンス
        // Promiseインスタンスの状態が変わったら処理を再開する
      }
    
    普通の処理の流れでは, 非同期処理を実行した場合にその非同期処理の完了を待つことなく次の行（次の文）を実行する
    しかしawait式では非同期処理を実行して完了するまで次の行（次の文）を実行しない. そのためawait式を使うことで非
    同期処理が同期処理のように上から下へと順番に実行するような処理順で書ける
 */

async function doAsync() {
  console.log("1");
  [...Array(1000)].map(() => {});
  console.log("2");
  // setTimeout関数でタイマーに登録したコールバック関数は非同期的なタイミングで呼ばれる
  setTimeout(() => {
    console.log("4");
  }, 1);
}

async function asyncMain() {
  await doAsync();
  console.log("3");
}

asyncMain();
