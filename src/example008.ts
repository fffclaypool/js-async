function resolvePromise() {
  return new Promise((resolve) => {
    resolve(undefined);
  });
}

function rejectPromise() {
  return new Promise((_, reject) => {
    reject(undefined);
  });
}

resolvePromise().then(() => console.log("resolved")); // resolved

// 非推奨: `then`メソッドで失敗時のコールバック関数だけを登録する
rejectPromise().then(undefined, () => console.log("rejected")); // rejected

// 推奨: `catch`メソッドは, 失敗時のコールバック関数のみ登録できる
/*
  (method) Promise<unknown>.catch<void>(onrejected?: ((reason: any) => void | PromiseLike<void>) | null | undefined): Promise<unknown>
 */
rejectPromise().catch(() => console.log("rejected")); // rejected

/*
  Promiseではコンストラクタの処理で例外が発生した場合に自動的に例外がキャッチされる. 例外が発生したPromise
  インスタンスはreject関数を呼び出したのと同じように失敗したものとして扱われる. そのため, Promise内で例外が
  発生するとthenメソッドの第二引数やcatchメソッドで登録したエラー時のコールバック関数が呼び出される. すなわち, 
  Promiseにおける処理ではtry ~ catch構文を使わなくても例外をキャッチできる
 */
function throwPromise() {
  return new Promise((resolve, reject) => {
    throw new Error("error has occurred");
  });
}

throwPromise().catch((error) => console.log(error.message)); // error has occurred
