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

// 複数のリソースをまとめて取得する
async function fetchAllResources(resources: string[]): Promise<string[]> {
  const promises = resources.map((resource: string) => {
    return dummyFetch(resource);
  });
  const responses = await Promise.all(promises);
  return responses.map((response: DummyResponse) => {
    return response.body;
  });
}

function main() {
  const resources = ["/resource/A", "/resource/B"];
  fetchAllResources(resources).then((results: string[]) => {
    console.log(results); // [ 'Response body of /resource/A', 'Response body of /resource/B' ]
  });
}

main();
