function dummyFetch(path: string) {
  // resolveとrejectで成功時・失敗時のコールバック関数を受け取る
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path.startsWith("/success")) {
        resolve({ body: `Response body of ${path}` });
      } else {
        reject(new Error("Not Found"));
      }
    }, 1000 * Math.random());
  });
}

// `then`メソッドで成功時と失敗時に呼ばれるコールバック関数を登録
dummyFetch("/success/data").then(
  function onFulfilled(response) {
    console.log(response); // { body: 'Response body of /success/data' }
  },
  function onRejected(error) {
    // この行は実行されない
  }
);

dummyFetch("/failure/data").then(
  function onFulfilled(response) {
    // この行は実行されない
  },
  function onRejected(error) {
    console.log(error); // Error: Not Found
  }
);

// 成功時のみのコールバック関数を渡すことも可能
dummyFetch("/success/data").then(function onFulfilled(response) {
  console.log(response); // { body: 'Response body of /success/data' }
});
