function blockTime(timeout: number): void {
  const startTime = Date.now();
  while (true) {
    const diffTime = Date.now() - startTime;
    if (diffTime >= timeout) {
      console.log("blockTime done");
      return;
    }
  }
}

console.log("1");
setTimeout(() => {
  console.log("3");
  blockTime(1000);
  console.log("5");
}, 10);
console.log("2");

/*
  setTimeout(function, milliseconds);

  ミリ秒経過後にfunction（コールバック関数）を実行する
  コールバック関数とは, ある関数を呼び出す時に引数に指定する別の関数のこと
 */

/*
  setTimeout()を使用して, 非同期に処理を実行する
  "1"を出力後, setTimeoutにより10ms待機している間に"2"を出力して, その後"3"以降を出力する
 */
