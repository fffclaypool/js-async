/*
  エラーファーストコールバック
    ECMAScript 2015（ES2015）でPromiseが仕様に入るまで, 非同期処理中に発生した例外を扱う仕様はなかった.
    このため, ES2015より前までは, エラーファーストコールバックという非同期処理中に発生した例外を扱う方法を
    決めたルールが広く使われていた

    エラーファーストコールバックとは, 次のような非同期処理におけるコールバック関数の呼び出し方を決めたルールである
      処理が失敗した場合は, コールバック関数の1番目の引数にエラーオブジェクトを渡して呼び出す
      処理が成功した場合は, コールバック関数の1番目の引数にはnullを渡し, 2番目以降の引数に成功時の結果を渡して呼び出す

    つまり, ひとつのコールバック関数で失敗した場合と成功した場合の両方を扱うルールとなる
 */

/**
 * 1000ミリ秒未満のランダムなタイミングでレスポンスを疑似的にデータ取得する関数
 * 指定した`path`にデータがある場合は`callback(null, レスポンス)`を呼ぶ
 * 指定した`path`にデータがない場合は`callback(エラー)`を呼ぶ
 */

// callbackの型は, callback関数の引数の型と戻り値の型を示す
function dummyFetch(
  path: string,
  callback: (error: Error | null, response: object | null) => void
) {
  setTimeout(() => {
    if (path.startsWith("/success")) {
      // コールバック関数が格納されているcallbackに引数を渡して実行する
      callback(null, { body: `Response body of ${path}` });
    } else {
      callback(new Error("Not Found"), null);
    }
  }, 1000 * Math.random());
}

// dummyFecth関数に, 引数としてpathとコールバック関数を渡す
dummyFetch("/success/data", (error, response) => {
  if (error) {
    // この行は実行されない
  } else {
    console.log(response); // { body: 'Response body of /success/data' }
  }
});

// dummyFecth関数に, 引数としてpathとコールバック関数を渡す
dummyFetch("/failure/data", (error, _response) => {
  if (error) {
    console.log(error.message); // Not Found
  } else {
    // この行は実行されない
  }
});
