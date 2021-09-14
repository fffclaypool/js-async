try {
  throw new Error();
} catch (e) {
  console.log("error has been detected: 1"); // 出力される
}

console.log("-");

setTimeout(() => {
  try {
    throw new Error();
  } catch (error) {
    console.log("error has been detected: 2"); // 出力される
  }
}, 10);

console.log("--");

try {
  setTimeout(() => {
    throw new Error();
  }, 10);
} catch (e) {
  console.log("error has been detected: 3"); // 出力されない
}

console.log("---");

/*
  コールバック関数を使用する場合, try ~ catchの使い方に注意が必要
 */

/*
  error has been detected: 1
  -
  --
  ---
  error has been detected: 2

  /.../js-async-basic/example4.ts:21
      throw new Error()
            ^
  Error:
      at Timeout._onTimeout (/.../js-async-basic/example4.ts:21:11)
      at listOnTimeout (internal/timers.js:531:17)
      at processTimers (internal/timers.js:475:7)
 */
