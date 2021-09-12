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
blockTime(1000);
console.log("3");

/*
  同期的に処理を実行する
  "1"を出力後, 1000ms処理をBlockして完了時に"blockTime done"を出力, 最後に"3"を出力する
 */
