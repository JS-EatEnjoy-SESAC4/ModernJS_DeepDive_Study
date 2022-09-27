# Chapter.12 - 함수<br>

---

## 12.1 함수란?<br>

함수의 일련의 과정을 문(statement)으로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것이다.

```
function add ( x , y ) {
    return x + y;
}

add(2,5);
```

## 12.2 함수를 사용하는 이유<br>

함수는 몇 번이든 호출할 수 있으므로 코드의 재사용이라는 측면에서 매우 유용하다.<br>

함수는 유지보수의 편의성을 높이고 실수를 줄여 코드의 신뢰성을 높이는 효과가 있다.<br>

## 12.3 함수 리터럴<br>

자바스크립트의 함수는 객체 타입의 값이다. 따라서 숫자 값을 숫자 리터럴로 생성하고 객체를 객체 리터럴로 생성하는 것 처럼 함수도 리터럴로 생성할 수 있다. 함수 리터럴은 function 키워드, 함수 이름, 매개변수 목록, 함수 몸체로 구성된다.<br>

```
// 변수에 함수 리터럴을 할당
var f = function add(x,y) {
    return x + y;
}
```

함수는 객체이다.<br>
일반객체는 호출할 수 없지만 함수는 호출할 수 있다.<br>

## 12.4 함수 정의<br>

함수 정의란 함수를 호출하기 이전에 인수를 전달받을 매개변수와 실행할 문들, 그리고 반환할 값을 지정하는 것을 말한다. 정의된 함수는 자바스크립트 엔진에 의해 평가되어 함수 객체가 된다. 함수를 정의하는 방법은 4가지가 있다. <br>

| 함수 정의 방식       | 예시                                          |
| -------------------- | --------------------------------------------- |
| 함수 선언문          | function add(x,y){                            |
|                      | return x+y;                                   |
|                      | }                                             |
| 함수 표현식          | var add = function(x,y){                      |
|                      | return x + y;                                 |
|                      | };                                            |
| Function 생성자 함수 | var add = new Function('x','y','return x+y'); |
| 화살표 함수(ES6)     | var add = (x,y) => x+y;                       |

모든 함수 정의 방식은 함수를 정의한다는 면에서는 동일하다.<br>

- 변수는 '선언'한다고 했지만, 함수는 '정의' 한다고 표현했다. 함수 선언문이 평가되면 식별자가 암묵적으로 생성되고 함수 객체가 할당된다.<br>

# 12.4.1 함수 선언문<br>

```
// 함수 선언문
function add ( x, y ){
    return x + y;
}

// 함수 참조
// console.dir은 console.log와는 달리 함수 객체의 프로퍼티까지 출력한다.
// 단, Node.js 환경에서는 console.log와 같이 결과가 출력된다.
console.dir(add); // f add(x,y)

// 함수 호출
console.log(add(2,5)); // 7
```

함수 선언문은 함수 리터럴과 형태가 동일하다. 단 함수 리터럴은 함수 이름을 생략할 수 있으나 함수 선언문은 함수 이름을 생략할 수 없다.

```
// 함수 선언문은 함수 이름을 생략할 수 없다.
function(x,y){
    return x + y;
}
// SyntaxError : Function statements require a function name
```

함수 선언문은 표현식이 아닌 문이다. 따라서 표현식이 아닌 문은 변수에 할당할 수 없다.
하지만 다음 예제를 실행해보면 함수 선언문이 변수에 할당되는 것 처럼 보인다.

```
// 함수 선언문은 표현식이 아닌 문이므로 변수에 할당할 수 없다.
// 하지만 함수 선언문이 변수에 할당되는 것처럼 보인다.
var add = function add (x,y){
    return x + y;
};

// 함수 호출
console.log(add(2,5)); // 7
```

이렇게 동작하는 이유는 자바스크립트 엔진이 코드의 문맥에 따라 동일한 함수 리터럴을 표현식이 아닌 문인 함수 선언문으로 해석하는 경우와 표현식인 문인 함수 리터럴 표현식으로 해석하는 경우가 있기 때문이다.<br>

```
// 기명 함수 리터럴을 단독으로 사용하면 함수 선언문으로 해석된다.
// 함수 선언문에서는 함수 이름을 생략할 수 없다.
function foo() { console.log('foo'); }

foo(); // foo

// 함수 리터럴을 피연산자로 사용하면 함수 선언문이 아니라 함수 리터럴 표현식으로 해석된다.
// 함수 리터럴에서는 함수 이름을 생략할 수 있다.
(function bar() { console.log('bar');});
bar(); // ReferenceError : bar is not defined
```

위에서의 foo는 자바스크립트 엔진이 암묵적으로 생성한 식별자 이다.<br>

### 12.4.2 함수 표현식<br>

자바스크립트의 함수는 객체 타입의 값이다. 값처럼 변수에 할당 할 수도 있고 프로퍼티 값이 될 수도 있으며 배열의 요소가 될 수도 있다. 이처럼 값의 성질을 갖는 객체를 _일급 객체_ 라 한다.<br>
이러한 함수 정의 방식을 함수 표현식(funtion expression)이라 한다.<br>

```
// 함수 표현식
var add = function (x,y){
    return x + y;
}

console.log(add(2,5)); //7
```

```
// 기명 함수 표현식
var add = function foo ( x, y ){
    return x + y;
};

// 함수 객체를 가리키는 식별자로 호출
console.log(add(2,5)); //7

// 함수 이름으로 호출하면 ReferenceError가 발생한다.
// 함수 이름은 함수 몸체 내부에서만 유효한 식별자다.
console.log(foo(2,5)); // ReferenceError: foo is not defined
```

- 함수 선언문은 '표현식이 아닌 문'이고 함수 표현식은 '표현식인 문'이다.

### 12.4.3 함수 생성 시점과 함수 호이스팅

```
// 함수 참조
console.dir(add); // f add(x,y)
console.dir(sub); // undefined

// 함수 호출
console.log(add(2,5)); // 7
console.log(sub(2,5)); TypeError : sub is not a function

// 함수 선언문
function add ( x, y ){
    return x + y;
}

// 함수 표현식
var sub = function ( x, y ){
    return x - y;
}
```

위 예저와 같이 함수 선언문으로 정의한 함수는 함수 선언문 이전에 호출할 수 있다. 그러나 함수 표현식으로 정의한 함수는 함수 표현식 이전에 호출할 수 없다. 이는 함수 선언문으로 정의한 함수와 함수 표현식으로 정의한 함수의 생성 시점이 다르기 때문이다. <br>

함수 선언문이 코드의 선두로 끌어 올려진 것 처럼 동작하는 자바스크립트 고유의 특징을 함수 호이스팅(function hoisting)이라 한다.<br>

함수 호이스팅과 변수 호이스팅은 미묘한 차이가 있으므로 주의해야 한다. var 키워드를 사용한 변수 선언문과 함수 선언문은 런타임 이전에 자바스크립트 엔진에 의해 먼저 실행되어 식별자를 생성한다는 점에서 동일하다. 하지만 var 키워드로 선언된 변수는 undefined로 초기화되고, 함수 선언문을 통해 암묵적으로 생성된 식별자는 함수 객체로 초기화된다.따라서 var 키워드를 사용한 변수 선언문 이전에 변수를 참조하면 변수 호이스팅에 의해 undefined로 평가되지만 함수 선언문으로 정의한 함수를 함수 선언문 이전에 호출하면 함수 호이스팅에 의해 호출이 가능하다.<br>

### 12.4.4 Function 생성자 함수<br>

자바스크립트가 기본 제공하는 빌트인 함수인 Function 생성자 함수에 매개변수 목록과 함수 몸체를 문자열로 전달하면서 new 연산자와 함께 호출하면 함수 객체를 생성해서 반환한다. 사실 new 연산자 없이 호출해도 결과는 동일하다.<br>

- 생성자 함수(constructor function)
  생성자 함수는 객체를 생성하는 함수를 말한다.<br>

```
var add = new Function('x','y','return x+y');

console.log(add(2,5)); // 7
```

Function 생성자 함수로 함수를 생성하는 방식은 일반적이지 않으며 바람직하지도 않다.<br>
결론적으로 함수 선언문 or 함수 표현식으로 생성한 함수와 Function 생성자 함수로 생성한 함수가 동일하게 동작하지 않는다.

# 12.4.5 화살표 함수

ES6에서 도입된 화살표 함수(arrow function)는 function 키워드 대신 화살표(fat arrow) =>를 사용해 좀 더 간략한 방법으로 함수를 선언할 수 있다. 화살표 함수는 항상 익명 함수로 정의한다.<br>

```
//화살표 함수
const add = (x,y) => x+y;
console.log(add(2,5)); // 7
```

화살표 함수는 생성자 함수로 사용할 수 없으며, 기존 함수와 this 바인딩 방식이 다르고, prototype 프로퍼티가 없으며 arguments 객체를 생성하지 않는다.

## 12.5 함수 호출 <br>

# 12.5.1 매개변수와 인수<br>

함수를 실행하기 위해 필요한 값을 함수 외부에서 함수 내부로 전달할 필요가 있는 경우, 매개변수(parameter)를 통해 인수(argument)를 전달한다. 인수는 값으로 평가될 수 있는 표현식이어야 한다. 인수는 함수를 호출 할 때 지정하며, 개수와 타입에 제한이 없다.<br>

```
//함수 선언문
function add(x,y){
    return x + y;
}

// 함수 호출
// 인수 1과 2가 매개변수 x와 1y에 순서대로 할당되고 함수 몸체의 문들이 실행된다.<br>
var result = add(1,2);
```

매개변수는 함수 몸체 내부에서만 참조할 수 있고 함수 몸체 외부에서는 참조할 수 없다. 즉, 매개변수의 스코프(유효 범위)는 함수 내부다.<br>

```
function add(x,y){
    console.log(x,y); // 2,5
    return x + y;
}

add(2,5);

// add 함수의 매개변수 x,y는 함수 몸체 내부에서만 참조할 수 있다.
console.log(x,y); // ReferenceError: x is not defined

```

함수는 매개변수의 개수와 인수의 개수가 일치하는지 체크하지 않는다. 즉, 함수를 호출할 때 매겨변수의 개수만큼 인수를 전달하는 것이 일반적이지만 그렇지 않은 경우에도 에러가 발생하지 않는다. 인수가 부족해서 인수가 할당되지 않은 매겨변수의 값은 undefined이다.<br>

```
function add(x,y){
    return x + y;
}

console.log(add(2)); //NaN
```

위 예제의 매개변수 X에는 인수 2가 전달되지만, 매개변수 y에는 전달할 인수가 없다. 따라서 매개변수 y는 undefined로 초기화된 상태 그대로다. 따라서 함수 몸체의 문 x + y는 2 + undefined와 같으므로 NaN이 반환된다.<br>
매개변수보다 인수가 더 많은 경우 초과된 인수는 무시된다.

```
function add(x,y){
    return x + y;
}

console.log(add(2,5,10)) // 7
```

사실 초과된 인수가 그냥 버려지는 것은 아니다. 모든 인수는 암묵적으로 arguments 객체의 프로퍼티로 보관된다.<br>

# 12.5.2 인수확인<br>

```
function add(x,y){
    if(typeof x !== 'number' || typeof y !== 'number'){
        throw new TypeError( '인수는 모두 숫자 값이어야 합니다');
    }

    return x + y;
}

console.log(add(2));
console.log(add('a','b'));
```

# 12.5.3 매개변수의 최대 개수<br>

- 0개가 가장좋고 최대 3개 이상으로 넘어가지 말자<br>

# 12.5.4 반환문<br>

함수는 return 키워드와 표현식(반환값)으로 이뤄진 반환문을 사용해 실행 결과를 함수 외부로 반환(return)할 수 있다.<br>

```
function multiply(x,y){
    return x * y; // 반환문
}

// 함수 호출은 반환값으로 평가된다.
var result = multiply(3,5)l
console.log(result); // 15
```

multiply 함수는 두 개의 인수를 전달받아 곱한 결과값을 return 키워드를 사용해 반환한다. 함수는 return 키워드를 사용해 자바스크립트에서 사용 가능한 모든 값을 반환 할 수 있다.<br>

```
function foo(){
    return;
}

console.log(foo()); // undefined
```

반환문은 생략이 가능하다. 이때 함수몸체의 마지막 문까지 실행할 후 암묵적으로 undefined를 반환한다.

```
function foo(){

}

console.log(foo()); // undefined
```

return 키워드와 반환값으로 사용할 표현식 사이에 줄바꿈이 있으면 세미콜론 자동 삽입 기능에 의해 세미콜론이 추가되어 다음과 같이 의도치 않은 결과가 발생할 수 있다.<br>

```
function multiply(x,y){

    return // 세미콜론 자동 삽입 기능 (ASI)에 의해 세미클론 추가
    x * y; // 무시된다.
}

console.log(multiply(3,5)); // undefined
```

반환문은 함수 몸체 내부에서만 사용할 수 있다. 전역에서 반환문을 사용하면 문법 에러(SyntaxError: Illegal return statement)가 발생한다.<br>

## 12.6 참조에 의한 전달과 외부 상태의 변경<br>

```
// 매개변수 primitive는 원시 값을 전달받고, 매개변수 obj는 객체를 전달받는다.
function changeVal(primitive, obj){
    primitive += 100;
    obj.name = 'Kim';
}

// 외부 상태
var num = 100;
var person = { name: 'Lee'};

console.log(num); // 100
console.log(num); // { name: 'Lee'};

// 원시 값은 값 자체가 복사되어 전달되고 객체는 참조 값이 복사되어 전달된다.
changeVal(num,person);

// 원시 값은 원본이 훼손되지 않는다.
console.log(num); // 100

// 객체는 원본이 훼손된다.
console.log(person); // { name: 'Kim'}
```

- 외부 상태를 변경하지 않고 외부 상태에 의존하지도 않는 함수를 순수 함수라 한다.<br>
- 순수 함수를 통해 부수효과를 최대한 억제하여 오류를 피하고 프로그램의 안전성을 높이려는 프로그래밍 패러다임을 함수형 프로그래밍이라 한다.<br>

## 12.7 다양한 함수의 형태<br>

### 12.7.1 즉시 실행 함수<br>

함수 정의와 동시에 즉시 호출되는 함수를 즉시 실행 함수라고 한다. 즉시 실행 함수는 단 한 번만 호출되며 다시 호출할 수 없다.<br>

```
// 익명 즉시 실행 함수
(function () {
    var a = 3;
    var b = 5;
    return a * b;
}());
```

즉시 실행 함수는 함수 이름이 없는 익명 함수를 사용하는 것이 일반적이다.
