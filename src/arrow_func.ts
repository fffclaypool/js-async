/*
  アロー関数は, "=>(矢)"を使って関数リテラルを表現する

  関数の内容をvariableで受け取る
  const variable = (arg1: type1, arg2: type2, ...) => { 関数の処理内容を定義 }
 */

// アロー関数
const sum1 = (a: number, b: number) => console.log(a + b);
const sum2 = (a: number, b: number) => {
  const sum = a + b;
  console.log(sum);
};

// 通常の関数
const sum3 = function (a: number, b: number) {
  console.log(a + b);
};
const sum4 = function (a: number, b: number) {
  const sum = a + b;
  console.log(sum);
};

// アロー関数
// 受け取る引数がない場合は, "() =>"となる
const sayFoo1 = () => console.log("foo");

// 通常の関数
const sayFoo2 = function () {
  console.log("foo");
};

sum1(1, 2); // 3
sum2(1, 2); // 3
sum3(1, 2); // 3
sum4(1, 2); // 3
sayFoo1(); // foo
sayFoo2(); // foo
