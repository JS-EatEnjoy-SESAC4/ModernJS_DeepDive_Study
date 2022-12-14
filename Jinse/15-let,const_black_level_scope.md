# Chapter.15 - let,const 키워드와 블록 레벨 스코프<br>

---

## 15.1 var 키워드로 선언한 변수의 문제점<br>

### 15.1.1 변수 중복 선언 허용<br>

var 키워드로 선언한 변수는 중복 선언이 가능하다.

```
var x = 1;
var y = 1;

// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
// 초기화문이 있는 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.

var x = 100;
// 초기화문이 없는 변수 선언문은 무시된다.

var y;

console.log(x); // 100
console.log(y); // 1
```

---

### 15.1.2 함수 레벨 스코프 <br>

var 키워드로 선언한 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정한다. 따라서 함수 외부에서 var 키워드로 선언한 변수는 코드 블록 내에서 선언해도 모두 전역 변수가 된다.

```
var x = 1;

if (true){
    // x는 전역 변수다. 이미 선언된 전역 변수 x가 있으므로 x 변수는 중복 선언된다.
    // 이는 의도치 않게 변수값이 변경되는 부작용을 발생시킨다.
    var x = 10;
}

console.log(x); // 10
```

for 문의 변수 선언문에서 var 키워드로 선언한 변수도 전역 변수가 된다.

```
var i = 10;

// for문에서 선언한 i는 전역 변수다. 이미 선언된 전역 변수 i 가 있으므로 중복 선언된다.
for ( var i = 0; i<5 ; i++){
    console.log(i); // 0 1 2 3 4
}

// 의도치 않게 i 변수의 값이 변경되었다.

console.log(i); // 5
```

함수 레벨 스코프는 전역 변수를 남발할 가능성을 높인다. 이로 인해 의도치 않게 전역 변수가 중복 선언되는 경우가 발생한다.<br>

---

### 15.1.3 변수 호이스팅<br>

var 키워드로 변수를 선언하면 변수 호이스팅에 의해 변수 선언문이 스코프의 선두로 끌어 올려진 것처럼 동작한다. 즉, 변수 호이스팅에 의해 var 키워드로 선언한 변수는 변수 선언문 이전에 참조할 수 있다. 단, 할당문 이전에 변수를 참조하면 언제나 undefined를 반환한다.<br>

```

//이 시점에는 변수 호이스팅에 의해 이미 foo 변수가 선언되었다( 1. 선언 단계)
// 변수 foo는 undefined로 초기화된다(2. 초기화 단계)
console.log(foo); // undefined

// 변수에 값을 할당(3. 할당 단계)
foo = 123;

console.log(foo); // 123

//변수 선언은 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 실행된다.

var foo;
```

---

## 15.2 let 키워드<br>

앞에서 살펴본 var 키워드의 단점을 보완하기 위해 ES6에서는 새로운 변수 선언 키워드인 let과 const를 도입했다. var 키워드와의 차이점을 중심으로 let 키워드를 살펴보자.<br>

### 15.2.1 변수 중복 선언 금지<br>

var 키워드로 이름이 동일한 변수를 중복 선언하면 아무런 에러가 발생하지 않는다. 이때 변수를 중복 선언하면서 값까지 할당했다면 의도치 않게 먼저 선언된 변수 값이 재할당되어 변경되는 부작용이 발생한다. <br>
하지만 let 키워드로 이름이 같은 변수를 중복 선언하면 문법 에러(SyntaxErro)가 발생한다.<br>

```
var foo = 123;
// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
// 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.

var foo = 456;

let bar = 123;
// let이나 const 키워드로 선언된 변수는 같은 스포크 내에서 중복 선언을 허용하지 않는다.
let bar = 456; // SyntaxError: Identifier 'bar' has already been declared
```

### 15.2.2 블록 레벨 스코프<br>

var 키워드로 선언한 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정하는 함수 레벨 스코프를 따른다. 하지만 let 키워드로 선언한 변수는 모든 코드 블록(함수, if문, for문, while문, try/catch 문 등)을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다.<br>

```
let  foo = 1; //전역 변수

{
    let foo = 2; //지역 변수
    let bar = 3; //지역 변수
}

console.log(foo); // 1
console.log(bar); // ReferenceError : bar is not defined
```

let 키워드로 선언된 변수는 블록 레벨 스코프를 따른다. 따라서 위 예제의 코드 블록 내에서 선언된 foo 변수와 bar 변수는 지역 변수다. 전역에서 선언된 foo 변수와 코드 블록 내에서 선언된 foo 변수는 다른 별개의 변수다. 또한 bar 변수도 블록 레벨 스코프를 갖는 지역 변수다. 따라서 전역에서는 bar 변수를 참조할 수 없다.<br>
함수도 코드 블록이므로 스코프를 만든다. 이때 함수 내의 코드 블록은 함수 레벨 스코프에 중첩된다.

```
let i = 10;
function foo(){
    let i = 100;
    for (let i = 1; i < 3; i++){
        console.log(i); // 1 2
    }
    console.log(i); // 100
}
foo();

console.log(i); // 10
```

### 15.2.3. 변수 호이스팅<br>

var 키워드로 선언한 변수와 달리 let 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것처럼 동작한다.<br>

```
console.log(foo);    // ReferenceError: foo is not defined
let foo;
```

이처럼 let 키워드로 선언한 변수를 변수 선언문 이전에 참조하면 참조 에러(ReferenceError)가 발생한다. <br>
4.3절 "변수 선언"에서 살표본 바와 같이 var 키워드로 선언한 변수는 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 "선언 단계"와 "초기화 단계"가 한번에 진행된다.<br>
즉, 선언 단계에서 스코프(실행 컨텍스트의 렉시컬 환경)에 변수 식별자를 등록해 자바스크립트 엔진에 변수의 존재를 알린다. 그리고 즉시 초기화 단계에서 undefined로 변수를 초기화한다. 따라서 변수 선언문 이전에 변수에 접근해도 스코프에 변수가 존재하기 때문에 에러가 발생하지 않는다. 다만 undefined를 반환한다. 이후 변수 할당문에 도달하면 비로소 값이 할당된다.<br>

```
// var키워드로 선언한 변수는 런타임 이전에 선언 단계와 초기화 단계가 실행된다.
// 따라서 변수 선언문 이전에 변수를 참조할 수 있다.
console.log(foo);   // undefined

var foo;
console.log(foo);   // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo);   //1
```

let 키워드로 선언한 변수는 "선언 단계" 와 "초기화 단계"가 분리되어 진행된다. 즉, 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 선언 단계가 먼저 실행되지만 초기화 단계는 변수 선언문에 도달했을 때 실행된다.<br>

만약 초기화 단계가 실행되기 이전에 변수에 접근하려고 하면 참조 에러(ReferenceError)가 발생한다. let 키워드로 선언한 변수는 스코프의 시작 지점부터 초기화 단계 시작 지점(변수 선언문)까지 변수를 참조할 수 없다. 스코프의 시작 지점부터 초기화 시작 지점까지 변수를 참조할 수 없는 구간을 **일시적 사각지대(Temporal DeadZone:TDZ)**라고 부른다.<br>

선언->(일시적 사각지대(TDZ))->초기화->할당<br>

결국 let 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것 처럼 보인다. 하지만 그렇지 않다.

```
let foo = 1; // 전역 변수

{
    console.log(foo); // ReferenceError : Cannot access 'foo' before initialization
    let foo = 2; // 지역 변수
}
```

자바스크립트 ES6에서 도입된 let, const 를 포함해서 모든 선언(var, let, const, function, function\*, class 등)을 호이스팅한다. 단 ES6에서 도입된 let, const, class를 사용한 선언문은 호이스팅이 발생하지 않는 것처럼 동작한다.<br>

### 15.2.4 전역 객체와 let <br>

var 키워드로 선언한 전역 변수와 전역 함수, 그리고 선언하지 않은 변수에 값을 할당한 암묵적 전역은 전역 객체 window의 프로퍼티가 된다. 전역 객체의 프로퍼티를 참조할 때 window를 생략할 수 있다.

```
// 이 예제는 브라우저 환경에서 실행해야 한다.

// 전역 변수
var x = 1;
// 암묵적 전역
y = 2;
// 전역 함수
function foo(){}

// var 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티다.
console.log(window.x); // 1
// 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(x); // 1

// 암묵적 전역은 전역 객체 window의 프로퍼티다.
console.log(window.y); // 2
console.log(y); // 2

// 함수 선언문으로 정의한 전역 함수는 전역 객체 window의 프로퍼티다.
console.log(window.foo); // f foo() {}
// 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(foo); // f foo() {}
```

let 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. 즉, window.foo와 같이 접근할 수 없다. <br>
let 전역 변수는 보이지 않는 개념적인 블록 내에 존재하게 된다.<br>

```
// 이 예제는 브라우저 환경에서 실행해야 한다.
let x = 1;

// let, const 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티가 아니다.
console.log(window.x); // undefined
console.log(x); // 1

```

---

## 15.3 const 키워드<br>

const 키워드는 상수(const)를 선언하기 위해 사용한다. 하지만 반드시 상수만을 위해 사용하지는 않는다.<br>

### 15.3.1 선언과 초기화<br>

const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다.

```
const foo = 1;
```

그렇지 않으면 담으과 같이 문법 에러가 발생한다.

```
const foo; // SyntaxError : Missing initializer in const declaration
```

const 키워드로 선언한 변수는 let 키워드로 선언한 변수와 마찬가지로 블록 레벨 스코프를 가지며, 변수 호이스팅이 발생하지 않는 것처럼 동작한다.

```
{
    // 변수 호이스팅이 발생하지 않는 것처럼 동작한다.
    console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
    const foo = 1;
    console.log(foo); // 1
}

// 블록 레벨 스코프를 갖는다.
console.log(foo); // ReferenceError: foo is not defined
```

### 15.3.2 재할당 금지<br>

var 또는 let 키워드로 선언한 변수는 재할당이 자유로우나 const 키워드로 선언한 변수는 재할당이 금지된다.

```
const foo = 1;
foo =2 ; // TypeError : Assignment to const variable
```

### 15.3.3 상수<br>

const 키워드로 선언한 변수에 원시 값을 할당한 경우 변수 값을 변경할 수 없다. 원시 값은 변경 불가능한 값(immutable value)이므로 재할당 없이 값을 변경할 수 있는 방법이 없기 때문이다. 이러한 특징을 이용해 const 키워드를 상수를 표현하는 데 사용하기도 한다.<br>
변수의 상대 개념인 상수는 재할당이 금지된 변수를 말한다. 상수도 값을 저장하기 위한 메모리 공간이 필요하므로 변수라고 할 수 있다. 단, 변수는 언제든지 재할당을 통해 변수 값을 변경할 수 있지만 상수는 재할당이 금지된다.<br>

### 15.3.4 const 키워드와 객체<br>

const 키워드로 선언된 변수에 원시 값을 할당한 경우 값을 변경할 수 없다. 하지만 const 키워드로 선언된 변수에 객체를 할당한 경우 값을 변경할 수 있다. 변경 불가능한 값인 원시 값은 재할당 없이 변경(교체)할 수 있는 방법이 없지만 변경 가능한 값인 객체는 재할당 없이도 직접 변경이 가능하기 때문이다.<br>

```
const person = {
    name : 'Lee'
};

// 객체는 변경 가능한 값이다. 따라서 재할당 없이 변경이 가능하다.
person.name = 'Kim'

console.log(person);  // {name: Kim}
```

const 키워드는 재할당을 금지할 뿐 "불변"을 의미하지 않는다.

## 15.4 var vs. let vs. const<br>

변수 선언에는 기본적으로 const를 사용하고 let은 재할당이 필요한 경우에 한정해 사용하는 것이 좋다.<br>
const 키워드를 사용하면 의도치 않은 재할당을 방지하기 때문에 좀 더 안전하다.<br>
var와 let,const 키워드는 다음과 같이 사용하는 것을 권장한다.<br>

- ES6를 사용한다면 var 키워드는 사용하지 않는다.
- 재할당이 필요한 경우에 한정해 let 키워드를 사용한다. 이때 변수의 스코프는 최대한 좁게 만든다.
- 변경이 발생하지 않고 읽기 전용으로 사용하는(재할당이 필요 없는 상수)원시 값과 객체는 const 키워드를 사용한다. const 키워드는 재할당을 금지하므로 var,let 키워드보다 안전하다.<br>

변수를 선언하는 시점에는 재할당이 필요할지 잘 모른느 경우가 많다. 그리고 객체는 의외로 재할당하는 경우가 드물다. 따라서 변수는 선언할 때는 일단 const 키워드를 사용하자. 반드시 재할당이 필요하다면 그때 const 키워드를 let 키워드로 변경해도 결코 늦지 않다.

---
