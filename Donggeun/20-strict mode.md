# strict mode

## 20.1 strict mode란?
- 필요성 : 암묵적 전역같은 개발자의 의도와는 상관없이 오류를 발생시키는 원인들이 있다. 오타나 문법 지식의 미비로 인한 실수는 언제나 발생.
- 따라서 잠재적인 오류를 발생시키기 어려운 개발 환경을 갖추는 것이 좀 더 근본적인 해결책이라고 할 수 있다.
- 이를 지원 하기 위해 ES5부터 strict mode(엄격 모드)가 추가
- 자바스크립트 언어의 문법을 좀 더 엄격히 적용. 오류 발생 가능성 높거나 자바스크립트 엔진 최적화 작업에 문제 일으킬 코드에 대해 명시적 오류 발생시킴.
- ESLint 같은 린트 도구를 사용해도 유사한 효과 얻을 수 있음
>_린트 도구 = 정적 분석 기능을 통해 소스코드를 실행하기 전에 소스코드를 스캔하여 문법적 오류만이 아니라 잠재적 오류까지 찾아내고 오류의 원인을 리포팅해주는 유용한 도구_
- strict mode <<< ESLint
- ES6에서 클래스와 모듈은 기본적으로 strict mode 적용

## 20.2 strict mode의 적용
- 전역의 선두 또는 함수 몸체의 선두에 'use strict';를 추가한다.
- 전역의 선두에 추가시 스크립트 전체에 strict mode가 적용
```javascript
'use strict';

function foo() {
  x = 10; // ReferenceError: x is not defined
}
foo();
```
```javascript
function foo() {
  'use strict';

  x = 10; // ReferenceError: x is not defined
}
foo();
```
```javascript
function foo() {
  x = 10; // 에러를 발생시키지 않는다.
  'use strict';
}
foo();
```

## 20.3 전역에 strict mode를 적용하는 것은 피하자
## 20.4 함수 단위로 strict mode를 적용하는 것도 피하자
- strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직
## 20.5 strict mode가 발생시키는 에러
### 20.5.1 암묵적 전역
- 선언하지 않은 변수를 참조하면 ReferenceError가 발생한다.
```javascript
(function () {
  'use strict';

  x = 1;
  console.log(x); // ReferenceError: x is not defined
}());
```

### 20.5.2 변수, 함수, 매개변수의 삭제
- delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError가 발생
```javascript
(function () {
  'use strict';

  var x = 1;
  delete x;
  // SyntaxError: Delete of an unqualified identifier in strict mode.

  function foo(a) {
    delete a;
    // SyntaxError: Delete of an unqualified identifier in strict mode.
  }
  delete foo;
  // SyntaxError: Delete of an unqualified identifier in strict mode.
}());
```

### 20.5.3 매개변수 이름의 중복
- 중복된 매개변수 이름을 사용하면 SyntaxError가 발생
```javascript
(function () {
  'use strict';

  //SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
}());
```

### 20.5.4 with 문의 사용
- with 문을 사용하면 SyntaxError가 발생
- with 문은 전달된 객체를 스코프 체인에 추가. with문은 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체 이름을 생략할 수 있어서 코드가 간단해지는 효과가 있지만 성능과 가독성이 나빠지는 문제가 있음 -> 따라서 사용하지 않는 것이 좋다.

## 20.6 strict mode 적용에 의한 변화
### 20.6.1 일반 함수의 this
- strict mode에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩된다.
- 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문
```javascript
(function () {
  'use strict';

  function foo() {
    console.log(this); // undefined
  }
  foo();

  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
}());
```

### 20.6.2 arguments 객체
- strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않음
```javascript
(function (a) {
  'use strict';
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
}(1));
```