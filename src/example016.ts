/*
  await式は, awaitの右辺（Promiseインスタンス）の評価結果を値として返す. このawait式の評価方法は評価するPromiseの状態
  （FulfilledまたはRejected）によって異なる
 */

/*
  awaitの右辺のPromiseがFulfilledとなった場合は, resolveされた値がawait式の返り値となる
  fn1()とfn2()は同じ意味である
 */

async function fn1(): Promise<number> {
  return await Promise.resolve(42);
}

async function fn2(): Promise<number> {
  return Promise.resolve(42).then((value) => value);
}

fn1();
fn2();

/*
  await式の右辺のPromiseがRejectedとなった場合は, その場でエラーをthrowする. またAsync Function内で発生した例外は
  自動的にキャッチされる. そのためawait式でPromiseがRejectedとなった場合はm, そのAsync FunctionがRejectedなPromi
  seを返すことになる
 */

async function fn3() {
  await Promise.reject(new Error("error"));
  console.log("no output"); // 出力されない
}

fn3().catch((error) => console.log(error.message)); // error

/*
  await式はPromiseインスタンスの評価結果を値として返すので, awaitがエラーをthrowするということは, そのエラーはtry ~ cat
  ch構文でキャッチできる. 通常の非同期処理では完了する前に次の行が実行されてしまうためtry ~ catch構文ではエラーをキャッチで
  きなかった
 */

async function fn4() {
  try {
    await Promise.reject(new Error("error"));
  } catch (error) {
    console.log(error); // 出力される
  }
}

// fn4()はResolvedなPromiseを返す
// 既にtry ~ catchされているため, console.log()は実行されない
fn4().catch((error) => console.log(error)); // 出力されない
