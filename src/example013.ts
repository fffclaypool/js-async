/*
  Async Function
    ES2017では, Async Functionという非同期処理を行う関数を定義する構文が導入された. Async Functionは,
    通常の関数とは異なり, 必ずPromiseインスタンスを返す関数を定義する構文である. Async Functionは次のよう
    に関数の前にasyncをつけることで定義できる. このdoAsync関数は常にPromiseインスタンスを返す
 */

/*
  重要なこととしてAsync FunctionはPromiseの上に作られた構文である. そのためAsync Functionを理解するには
  Promiseを理解する必要があることに注意する
  またAsync Function内ではawait式というPromiseの非同期処理が完了するまで待つ構文が利用できる. await式を
  使うことで非同期処理を同期処理のように扱えるた, Promiseチェーンで実現していた処理の流れを読みやすく書ける
 */

async function doAsync1(): Promise<string> {
  return "value";
}

function doAsync2(): Promise<string> {
  return Promise.resolve("value");
}

doAsync1().then((value) => console.log(value)); // value
doAsync2().then((value) => console.log(value)); // value

/*
  Async Functionは関数の定義にasyncキーワードをつけることで定義できる. JavaScriptの関数定義には関数宣言や
  関数式, Arrow Function, メソッドの短縮記法などがある. どの定義方法でもasyncキーワードを前につけるだけでAsy
  nc Functionとして定義できる

  これらのAsync Functionは、次の点以外は通常の関数と同じ性質を持つ
    Async Functionは必ずPromiseインスタンスを返す
    Async Function内ではawait式が利用できる
 */

// 関数宣言のAsync Function版
async function fn1(): Promise<void> {}
// 関数式のAsync Function版
const fn2 = async function (): Promise<void> {};
// Arrow FunctionのAsync Function版
const fn3 = async (): Promise<void> => {};
// メソッドの短縮記法のAsync Function版
const obj = { async isMethodDeclaration(): Promise<void> {} };
