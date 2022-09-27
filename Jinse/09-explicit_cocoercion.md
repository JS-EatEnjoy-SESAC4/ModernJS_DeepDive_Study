# Chapter.09 - 타입 변환과 단축 평가

---

## 9.1 타입 변환이란?<br>

---

- 자바스크립트의 모든 값은 타입이 존재한다.
- 개발자가 의도적으로 값의 타입을 변환하는 것을 명시적 **타입변환**(explicit coercion) 또는 **타입 캐스팅**(type casting)이라 한다.
- 개발자의 의도와는 상관없이 표현식을 평가하는 도중에 자바스크립트 엔진에 의해 자동적으로 타입이 변환되는 것을 암묵적 타입변환(implicit coercion) 또는 타입 강제 변환(type coercion)이라 한다.

```
ex)명시적타입변환
var x = 10;
var str = x.toString();      // 숫자를 문자열로 타입 캐스팅한다.
console.log(typeof str,str);  // string 10
console.log(typeof x,x); // number 10  -> x의 변수의 값이 변경된 것은 아니다.

```

```
ex)암묵적타입변환
var x= 10;
var str = x + '';       // 문자열 연결 연산자는 숫자 타입 x의 값을 바탕으로 새로운 문자열을 생성한다.
console.log(typeof str,str);    // string 10
console.log(typeof x,x);    // number 10 -> x의 변수의 값이 변경된 것은 아니다.

```

## 9.2 암묵적 타입 변환<br>

---

```
// 피연산자가 모두 문자열 타입이어야 하는 문맥
'10' + 2 // 102

// 피연산자가 모두 숫자 타입이어야 하는 문맥
5 * '10' // 50

// 피연산자 또는 표현식이 불리언 타입이어야 하는 문맥

!0 // true
if (1) { }

```

### 9.2.1 문자열 타입으로 변환<br>

```
1 + '2' // "12"
```

위 예제의 + 연산자는 피연산자 중 하나 이상의 문자열이므로 문자열 연결 연산자로 동작한다.<br>

### 9.2.2 숫자 타입으로 변환

```
1-1 // 0;
1+1 // 2;
1-'1' // 0;
1+'1' // 11;
```

```
'1' > 0 // true
```

```
+'' // 0
+'0' // 0
+'1' // 1
+'string' // NaN

+true // 1
+false // 0

+null // 0

+undefined // NaN

+Symbol() // TypeError: Cannot convert a Symbol value to a number

+{} // NaN
+[] // 0
+[10,20] // NaN
+(function()) // NaN
```

### 9.2.3 불리언 타입으로 변환<br>

## 9.3 명시적 타입 변환<br>

---

- 개발자의 의도에 따라 명시적으로 타입을 변경하는 방법은 다양하다.

### 9.3.1 문자열 타입으로 변환

문자열 타입이 아닌 값을 문자열 타입으로 변환하는 방법은 다음과 같다.

- String 생성자 함수를 new 연산자 없이 호출하는 방법
- Object.prototpye.toString 메서드를 사용하는 방법
- 문자열 연결 연산자를 이용하는 방법

```
// 1. String  생성ㅈ아 함수를 new 연산자 없이 호출하는 방법
// 숫자타입 => 문자열 타입
String(1); // "1"
String(NaN); // "NaN"
String(Infinity); // "Infinity"
String(true); // "true"
String(false); // "false"

// 2. Object.prototype.toString 메서드를 사용하는 방법
// 숫자타입 => 문자열 타입
(1).toString(); // "1"
(NaN).toString();   // "NaN"
(Infinity).toString();  // "Infinity"

// 불리언타입 => 문자열 타입
(true).toString();  // "true"
(false).toString(); // "false"

// 3. 문자열 연결 연산자를 이용하는 방법
// 숫자타입 => 문자열 타입
1 + ''; // "1"
NaN + ''; // "NaN"
Infinity + ''; // "Infinity"

// 불리언타입 => 문자열 타입
true + '';  // "true"
false + ''; // "false"
```

### 9.3.2 숫자 타입으로 변환<br>

숫자 타입이 아닌 값을 숫자 타입으로 변환하는 방법<br>

- Number 생성자 함수를 new 연산자 없이 호출하는 방법
- parseInt, parseFloat 함수를 사용하는 방법(문자열만 숫자 타입으로 변환가능)
- - 단항 산술 연산자를 이용하는 방법
- - 산술 연산자를 이용하는 방법

```
// 1. Number 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 숫자 타입
Number('0');b // 0
Number('-1');    // -1
Number('10.53');    // 10.53

// 2. parseInt, parseFloat 함수를 사용하는 방법(문자열만 변환가능)
// 문자열 타입 => 숫자 타입
parseInt('0');  // 0
parseInt('-1'); // -1
parseFloat('10.53');    // 10.53

// 3. + 단항 산술 연산자를 이용하는 방법
// 문자열 타입 => 숫자 타입
+'0';   //  0
+'-1';  // -1
+'10.53';   // 10.53

// 불리언 타입 => 숫자 타입
+true;  // 1
+false; // 0

// 4. * 산술 연산자를 이용하는 방법
// 문자열 타입 => 숫자 타입
'0' * 1;    // 0
'-1' * 1;   // -1
'10.53' * 1;    // 10.53

// 불리언 타입 => 숫자 타입
true * 1;   // 1
false * 1;  // 0
```

### 9.3.3 불리언 타입으로 변환

불리언 타입이 아닌 값을 불리언 타입으로 변환하는 방법

- Boolean 생성자 함수를 new연산자 없이 호출하는 방법
- ! 부정 논리 연산자를 두 번 사용하는 방법

```
// 1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 불리언 타입
Boolean('x');       // true
Boolean('');        // false
Boolean('false');   // true

// 숫자 타입 => 불리언 타입
Boolean(0);     // false
Boolean(1);     // true
Boolean(NaN);   // false
Boolean(Infinity);  // true

// null 타입 => 불리언 타입
Boolean(null)   // false

// undefinded 타입 => 불리언 타입
Boolean(undefined); // false

Boolean({});    // true
Boolean([]);    //  true


// 2. ! 부정 논리 연산자를 두 번 사용하는 방법
// 문자열 타입 => 불리언 타입
!!'x';  // true
!!'';   // false
!!'false';  // true

// 숫자 타입 => 불리언 타입
!!0;    // false
!!1;    // true
!!NaN;  // false
!!Infinity;  // true

//null 타입 => 불리언 타입
!!null; // false

// undefined 타입 => 불리언 타입
!!undefined // false

// 객체 타입 => 불리언 타입
!!{};   // true
!![];   // true

```

## 9.4 단축평가

### 9.4.1 논리 연산자를 사용한 단축 평가

```
'Cat' && 'Dog' // "Dog"
```

논리곱(&&) 연산자는 두 개의 피연산자가 모두 true로 평가 될 때 true를 반환한다. 좌항에서 우항으로 평가가 진행.<br>
첫 번째 피연산자 'Cat'은 Truthy 값이므로 true로 평가된다. 하지만 이 시점까지는 위 표현식을 평가할 수 없다. 두 번 째 피 연산자까지 평가해 보아야 위 표현식을 평가 할 수 있다. 다시 말해, 두 번째 피연산자가 위 논리곱 연산자 표현식의 평가 결과를 결정한다. 이때 논리곱 연산자는 논리 연산의 결과를 결정하는 두 번째 피연산자, 즉 문자열 'Dog'를 그대로 반환한다.

```
'Cat' || 'Dog' // "Cat"
```

논리합(||) 연산자는 두 개의 피연산자 중 하나만 true로 평가되어도 true를 반환한다. 좌항에서 우항으로 평가가 진행.<br>
첫 번째 피연산자 'Cat'은 Truthy 값이므로 true로 평가된다. 이 시점에 두 번 째 피연산자까지 평가해 보지 않아도 위 표현식을 평가할 수 있다. 이때 논리합 연산자는 논리 연산의 결과를 결정한 첫 번째 피연산자, 즉 문자열 'Cat'을 그대로 반환한다.<br>
논리곱(&&) 연산자와 논리합(||) 연산자는 **이처럼 논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환한다. 이를 단축평가(short-circuit evaluation)라 한다.** 단축 평가는 표현식을 평가하는 도중에 평과 결과가 확정된 경우 나머지 평가 과정을 생략하는 것을 말한다.

```
var done = true;
var message = '';

if (done) message = '완료'; // 이 조건문을 아래와 같이 쓸 수 있다.

message = done && '완료';
console.log(message); // 완료
```

어떤 조건이 Truthy 값일 때 무언가를 해야 한다면 논리곱(&&) 연산자 표현식으로 if문을 대체할 수 있다.

```
var done = false;
var message = '';

if (!done) message = '미완료';

message = done || '미완료';
console.log(message); // 미완료

조건이 Falsy 값 일 때 무언가를 해야 한다면 논리합(||) 연산자 표현식으로 if문을 대체할 수 있다.

```

```
var done = true;
var message = '';

if (done) message = '완료';
else message = '미완료';
console.log(message); // 완료

message = done ? '완료' : '미완료';
console.log(message); // 완료

```

삼항 조건 연산자는 if... else문을 대체할 수 있다.

```

var elem = null;
var value = elem.value; // TypeError: Cannot read property 'value' of null

```

만약 객체를 기대하는 변수의 값이 객체가 아니라 null 또는 undefined인 경우 객체의 프로퍼티를 참조하면 타입 에러(TypeError)가 발생한다. 에러가 발생하면 프로그램이 강제 종료된다.

이때 단축 평가를 사용하면 에러를 발생시키지 않는다.

```

var elem = null;
var value = elem && elem.value; // null
```

### 함수 매개변수에 기본값을 설정할 때

```
function getStringLength(str){
    return str.length;
}

getStringLength(); // TypeError : ~~~~~~~~
```

함수를 호출할 때 인수를 전달하지 않으면 매개변수에는 undefined가 할당된다.

```
function getStringLength(str){
    str = str || '';
    return str.length;
}

getStringLength(); // 0
```

```
//ES6의 매개변수의 기본값 설정
function getStringLength(str=''){
    return str.length;
}

getStringLength(); // 0
```

### 9.4.2 옵셔널 체이닝 연산자

ES11에서 도입된 옵셔널 체이닝(optional chaining) 연산자 ?.는 좌항의 피연산자가 null 또는 undefined인 경우 undefinde를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.

```
var elem = null;

// elem이 null 또는 undefined 이면 undefined를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.
var value = elem?.value;
console.log(value); // undefined

```

옵셔널 체이닝 연산자 ?.는 객체를 가리키기를 기대하는 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할 때 유용하다. 옵셔널 체이닝 연산자 ?.가 도입되기 이전에는 논리 연산자 &&를 사용한 단축 평가를 통해 변수가 null 또는 undefined인지 확인했다.

```
var elem = null;

// elem이 Falsy 값이면 elem으로 평가되고, elem이 Truthy 값이면 elem.value로 평가된다.
var value = elem && elem.value;
console.log(value); // null
```

논리 연산자 &&는 좌항 피연산자가 false로 평가되는 Falsy 값(false, undefined, null, 0, -0, NaN, '')이 면 좌항 피연산자를 그대로 반환한다. 좌항 피연산자가 Falsy 값인 0이나 ' '인 경우도 마찬가지다. 하지만 0이나 ''은 객체로 평가 될 때도 있다.

```
var str = '';

// 문자열의 길이(length)를 참조한다.
var length = str && str.length;

// 문자열의 길이(length)를 참조하지 못한다.
consoel.log(length);
```

하지만 옵셔널 체이닝 연산자 ?.는 좌항 피연산자가 fasle로 평가되는 Falsy 값(false, undefined, null, 0, -0, NaN, '')이라도 null 또는 undefined가 아니면 우항의 프로퍼티 참조를 이어간다.

```
var str = ' ';

// 문자열의 길이(length)를 참조한다. 이때 좌항 피연산자가 false로 평거되는 Falsy 값이라도
// null 또는 undefined가 아니면 우항의 프로퍼티 참조를 이어간다.
var length = str?.length;
console.log(length); // 0
```

### 9.4.3 null 병합 연산자

ES11에서 도입된 null병합 연산자 ??는 좌항의 피연산자가 null 또는 undefined인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다. null 병합 연산자 ??는 변수에 기본값을 설정할 때 유용하다.

```

//좌항의 피연산자가 null 또는 undefined이면 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.
var foo = null ?? 'default string';
console.log(foo); // "default string"

```

null 병합 연산자 ??는 변수에09-explicit_cocoercion 기본값을 설정할 때 유용하다. null 병합 연사자 ??가 도입되기 이전에는 논리 연산자 ||를 사용한 단축 평가를 통해 변수에 기본값을 설정했다. 논리 연산자 ||를 사용한 단축 평가의 경우 좌항의 피연산자가 fasle로 평가되는 Falsy값(false, undefined, null, 0, -0, NaN, '')이면 우항의 피연산자를 반환한다. 만약 Falsy 값인 0이나 ''도 기본값으로서 유효하다면 예기치 않은 동작이 발생할 수 있다.

```
// Falsy 값인 0이나 ''도 기본값으로서 유효하다면 예기치 않은 동작이 발생할 수 있다.
var foo = '' || 'default string';
console.log(foo); // "default string"

```

하지만 null 병합 연산자 ??는 좌항의 피연산자가 false로 평가되는 Falsy 값(false, undefined, null, 0, -0, NaN, '')이라도 null 또는 undefined가 아니면 좌항의 피연산자를 그대로 반환한다.

```

// 좌항의 피연산자가 Falsy 값이라도 null 또는 undefined가 아니면 좌항의 피연사자를 반환한다.
var foo = '' ?? 'default string';
console.log(foo); // ""

```
