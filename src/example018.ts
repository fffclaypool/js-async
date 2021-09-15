/*
  await式を利用する際には、await式はAsync Functionの中でのみ利用可能である
  Async Function内でawait式を使って処理を待っている間も, 関数の外側では通常どおり処理が進む
 */

async function fn1() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

function main1() {
  console.log("1");
  fn1().then(() => console.log("3"));
  console.log("2");
}

main1();

/*
  このようにawait式でAsync Function内の非同期処理を一時停止しても, Async Function外の処理が停止するわけでは
  ない. Async Function外の処理も停止できてしまうと, JavaScriptでは基本的にメインスレッドで多くの処理をするため,
  UIを含めた他の処理が止まってしまう. これがawait式がAsync Functionの外で利用できない理由の1つである
 */

interface DummyResponse {
  body: string;
}

function dummyFetch(path: string) {
  return new Promise(
    (
      resolve: (response: DummyResponse) => void,
      reject: (error: Error) => void
    ) => {
      setTimeout(() => {
        if (path.startsWith("/resource")) {
          resolve({ body: `Response body of ${path}` });
        } else {
          reject(new Error("NOT FOUND"));
        }
      }, 1000 * Math.random());
    }
  );
}

async function fetchResources(resources: string[]): Promise<string[]> {
  const results: string[] = [];
  console.log("1");
  // asyncを定義しないとエラーになる
  // async function (resource)の外側の処理が先に進んでしまう
  // > await式でAsync Function内の非同期処理を一時停止しても, Async Function外の処理が停止するわけではない
  resources.forEach(async function (resource) {
    console.log("2"); // forループの回数分出力される
    const response = await dummyFetch(resource);
    console.log("5"); // forループの回数分出力される
    results.push(response.body);
  });
  console.log("3");
  return results;
}

function main2() {
  const resources = ["/resource/A", "/resource/B"];
  fetchResources(resources).then((results) => {
    console.log("4");
    console.log(results); // []
  });
}

main2();
/* output
  1
  2
  2 ← setTimeout()の影響だと思われる
  3
  4
  []
  5
  5
*/
