/*
  Promiseチェーンをawait式で表現する
    Async Functionとawait式を使うことでPromiseチェーンとして表現していた非同期処理を同期処理のような見た目で書ける
 */

interface DummyResponse {
  body: string;
}

function dummyFetch(path: string): Promise<DummyResponse> {
  return new Promise(
    (
      resolve: (response: DummyResponse) => void,
      reject: (error: Error) => void
    ) => {
      setTimeout(() => {
        if (path.startsWith("/resource")) {
          resolve({ body: `response body of ${path}` });
        } else {
          reject(new Error("not found"));
        }
      }, 1000 * Math.random());
    }
  );
}

function fetchAB1(): Promise<string[]> {
  const results: string[] = [];
  return dummyFetch("/resource/A")
    .then((response: DummyResponse) => {
      results.push(response.body);
      return dummyFetch("/resource/B");
    })
    .then((response: DummyResponse) => {
      results.push(response.body);
      return results;
    });
}

async function fetchAB2(): Promise<string[]> {
  const results: string[] = [];
  const responseA = await dummyFetch("/resource/A");
  results.push(responseA.body);
  const responseB = await dummyFetch("/resource/B");
  results.push(responseB.body);
  return results;
}

function main() {
  fetchAB1().then((results) => console.log(results)); // [ 'response body of /resource/A', 'response body of /resource/B' ]
  fetchAB2().then((results) => console.log(results)); // [ 'response body of /resource/A', 'response body of /resource/B' ]
}

main();
