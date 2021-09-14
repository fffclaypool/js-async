/*
  Async Functionとして定義した関数は必ずPromiseインスタンスを返す. 具体的にはAsync Functionが
  返す値は次の3つのケースが考えられる
    * Async Functionが値をreturnした場合、その返り値を持つFulfilledなPromiseを返す
    * Async FunctionがPromiseをreturnした場合、その返り値のPromiseをそのまま返す
    * Async Function内で例外が発生した場合は、そのエラーを持つRejectedなPromiseを返す
*/

async function fn1(): Promise<string> {
  return "value";
}

async function fn2(): Promise<string> {
  return Promise.resolve("value");
}

async function fn3(): Promise<string> {
  if (false) {
    throw new Error("error");
  }
  return "value";
}

async function fn4(): Promise<never> {
  return Promise.reject(new Error("error"));
}

async function fn5(): Promise<never> {
  throw new Error("error");
}

async function fn6(): Promise<never> {
  throw "error";
}

async function fn7(): Promise<string> {
  if (true) {
    throw new Error("error");
  }
  return "value";
}

function main() {
  fn1().then((value) => console.log(value)); // value
  fn2().then((value) => console.log(value)); // value
  fn3().then((value) => console.log(value)); // value
  fn4().catch((error) => console.log(error.message)); // error
  fn5().catch((error) => console.log(error.message)); // error
  fn6().catch((error) => console.log(error)); // error
  fn7().catch((error) => console.log(error.message)); // error
}

main();
