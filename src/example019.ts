/*
  Promise.allを使うことで, 複数のPromiseを使った非同期処理を一つのPromiseとして扱える

  Promise.allメソッドは, Promiseインスタンスの配列を受け取り新しいPromiseインスタンスを返す
  その配列のすべてのPromiseインスタンスがFulfilledとなった場合は, 返り値のPromiseインスタンスもFulfilledと
  なる. 一方で, ひとつでもRejectedとなった場合は, 返り値のPromiseインスタンスもRejectedとなる

  返り値のPromiseインスタンスにthenメソッドで登録したコールバック関数には, Promiseの結果をまとめた配列が渡される
  このときの配列の要素の順番はPromise.allメソッドに渡した配列のPromiseの要素の順番と同じになる
 */

/*
  Promise.raceメソッドでは複数のPromiseを受け取るが, Promiseが1つでも完了した（Settled状態となった）時点で次
  の処理を実行する

　Promise.raceメソッドはPromiseインスタンスの配列を受け取り、新しいPromiseインスタンスを返す
　この新しいPromiseインスタンスは、配列の中で一番最初にSettled状態となったPromiseインスタンスと同じ状態になる
　配列の中で一番最初にSettledとなったPromiseがFulfilledの場合は, 新しいPromiseインスタンスもFulfilledになる
  配列の中で一番最初にSettledとなったPromiseがRejectedの場合は、新しいPromiseインスタンスも Rejectedになる
 */

function delay(timeoutMs: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (timeoutMs >= 10) {
        reject(new Error("detected over 10 value"));
      } else {
        resolve(timeoutMs);
      }
    }, timeoutMs);
  });
}

function main() {
  // すべてのPromiseインスタンスがFulfilledとなった場合は, 返り値のPromiseインスタンスもFulfilledとなる
  Promise.all([delay(1), delay(2), delay(3)]).then(
    (values) => console.log(values) // -> [ 1, 2, 3 ]
  );
  Promise.all([delay(1), delay(2), delay(3)]).then(
    ([value1, value2, value3]) => {
      console.log(value1); // -> 1
      console.log(value2); // -> 2
      console.log(value3); // -> 3
    }
  );
  // ひとつでもRejectedとなった場合は, 返り値のPromiseインスタンスもRejectedとなる
  Promise.all([delay(1), delay(2), delay(3), delay(10)]).catch(
    (e: Error) => console.log(e.message) // -> detected over 10 value
  );
  // 一番最初にSettledとなったPromiseがFulfilledの場合は, 新しいPromiseインスタンスもFulfilledになる
  Promise.race([delay(5), delay(10), delay(11), delay(12)]).then(
    (value) => console.log(value) // -> 5
  );
}

main();
