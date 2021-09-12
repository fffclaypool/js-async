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

function callBlock(start: number, end: number) {
  console.log(start);
  blockTime(1000);
  console.log(end);
}

function main() {
  console.log("1");
  setTimeout(() => {
    console.log("8");
  }, 10);
  callBlock(2, 3);
  callBlock(4, 5);
}

main();
callBlock(6, 7);

/*
  setTimeout()が同期的にブロックする処理に影響されることを確認する
  setTimeout()で10ms待機するように定義しているが, 実際には1000ms x 3以上待機した上でコールバック関数を実行している（"8"を出力）
  すなわち, 2つ以上の関数の並行実行はできず, またcallBlock(2, 3)で1000msで停止後はsetTimeout()で指定したコールバック関数では
  なく, callBlock(4, 5), callBlock(6, 7)が実行される

  JavaScriptにおける多くの非同期処理は, 複数のスレッドで処理を実行するのではなく単一のスレッドのみで実行される
 */
