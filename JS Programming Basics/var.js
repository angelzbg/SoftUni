3 + '2' // 32 конкатенация
3 - '2' // 1 -> минуса обръща стринга в число
[] + [] === ""
{} + [] === 0
[] + {} === "[object Object]"

[1, 2, 2, 3] // Търсим [1, 2, 3] -> new Set(arr)

(function(){
  var a = b = 3;
})();
/** Резултат
 * var a = 3 / Собствен скоуп на функцията
 * b = 3 / Глобал скоуп
 */
// console.log(a) // Undefined
// console.log(b) // 3

for (var i = 0; i < 5; i++) {
  ((x) => {
    setTimeout(() => {
      console.log(x)
    }, 1000 + x)
  })(i)
}
// Returns 55555

(function solve() {
  console.log('sadsadsadsa');
  +
})() // Имаме предварителен пас за синтактични грешки

// This

console.log(global === this); // false , this === {} в node.js

const obj = {

  method1() {
    console.log(this) // obj
  },
  method2: () => {
    console.log(this); // window
  },
  method3: function() {
    console.log(this); // obj
  }
}
// ------------------------------
function sum(...arg) {
  if (arg.length === 2) {
    return arg[0] + arg[1]
  } else {
    return (num) => {
      return num + arg[0]
    }
  }
}

console.log(sum(2,3));   // Outputs 5
console.log(sum(2)(3));  // Outputs 5
// ------------------------------

for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
// Ще връща винаги 5
// Решение
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  ((x) => {
    btn.addEventListener('click', function(){ console.log(x); });
  })(i)
  document.body.appendChild(btn);
}

// Рекурсия
function factorial(n) {
  return n === 0 ? 1 : n * factorial(n - 1);
}
console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(10)); // Функция за факториално число връща факториално на 10 -> 3628800
// Използваме setTimeout за да оптимизираме и не пълним main thread-a

console.log(1 < 2 < 3); // true -> true(1) < 3
console.log(3 > 2 > 1); // false - > true(1) > 1

(() => {

  for(var i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
  }

  console.log(i); // 5
})()

let i;
for (i = 0; i < 3; i++) {
  const log = () => {
    console.log(i);
  }
  setTimeout(log, 100); // 333
}

function func() {
  {
    (() => {
      var a = 5
    }) ()
    var b = 3
  }
  console.log(a);
  console.log(b);
}
func()

(() => {

  if(true) {
    action = 5
  }

  var action;
  console.log(action)
})()

const arr = [1, 2, 3]
arr.ivan = 5
console.log(arr) //[1, 2, 3, ivan: 5]

console.log('first')
new Promise(resolve =>{
  console.log('second')
  resolve('second')
})
console.log('third') //first, second, third


console.log('first')
new Promise(resolve =>{
  resolve('second')
}).then(() => console.log('second'))
console.log('third') //first, third, second