# Chapter.18 - 함수와 일급 객체<br>

---

## 18.1 일급 객체<br>

다음과 같은 조건을 만족하는 객체를 일급 객체라 한다.<br>

1. 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
2. 변수나 자료구조(객체,배열 등)에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.

자바스크립트의 함수는 다음 예제와 같이 위의 조건을 모두 만족하므로 일급 객체다.<br>

### 예제 18-01 (p.250)

```
// 1. 함수는 무명의 리터럴로 생성할 수 있다.
// 2. 함수는 변수에 저장할 수 있다.
// 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
const increase = function (num) {
    return ++num;
};

const decrease = function (num) {
    return --num;
};

// 2. 함수는 객체에 저장할 수 있다.
const auxs = { increase, decrease };

// 3. 함수는 매개변수에 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다.
function makeCounter(aux) {
    let num = 0;

    return function () {
        num = aux(num);
        return num;
    };
}

// 3. 함수는 매개변수에서 함수를 전달할 수 있다.
const increaser = makeCounter(auxs.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const decreaser = makeCounter(auxs.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

함수가 일급 객체라는 것은 함수를 객체와 동일하게 사용할 수 있다는 의미다. 객체는 값이므로 함수는 값과 동일하게 취급할 수 있다. 따라서 함수는 값을 사용할 수 있는 곳(변수 할당문, 객체의 프로퍼티 값, 배열의 요소, 함수 호출의 인수, 함수 반환문)이라면 어디서든지 리터럴로 정의할 수 있으며 런타임에 함수 객체로 평가된다.<br>
일급 객체로서 함수가 가지는 가장 큰 특징은 일반 객체와 같이 함수의 매개변수에 전달할 수 있으며, 함수의 반환값으로 사용할 수도 있다는 것이다. 이는 함수형 프로그래밍을 가능케 하는 자바스크립트의 장점 중 하나다. 함수는 객체이지만 일반 객체와는 차이가 있다. 일반 객체는 호출할 수 없지만 함수 객체는 호출할 수 있다. 그리고 함수 객체는 일반 객체에는 없는 함수 고유의 프로퍼티를 소유한다.<br>

## 18.2 함수 객체의 프로퍼티<br>

함수는 객체다. 따라서 함수도 프로퍼티를 가질 수 있다. 브라우저 콘솔에서 console.dir 메서드를 사용하여 함수 객체의 내부를 들여다보자.<br>

### 예제 18-02 (p.251)

```
function square(number){
    return number * number;
}

console.dir(square)
```

square 함수의 모든 프로퍼티의 프로퍼티 어트리뷰트를 Object.getOwnPropertyDescriptors 메서드로 확인해 보면 다음과 같다.<br>

### 예제 18-03 (p.251)

```
function square(number){
    return number * number;
}

console.log(Object.getOwnPropertyDescriptors(square));

/*
    {
    arguments: {value: null, writable: false, enumerable: false, configurable: false}
    caller: {value: null, writable: false, enumerable: false, configurable: false}
    length: {value: 1, writable: false, enumerable: false, configurable: true}
    name: {value: 'square', writable: false, enumerable: false, configurable: true}
    prototype: {value: {…}, writable: true, enumerable: false, configurable: false}
    }
*/

// __proto__는 square 함수의 프로퍼티가 아니다.
console.log(Object.getOwnPropertyDescriptor(square,'__proto__')); // undefined

// __proto__는 Object.prototype 객체의 접근자 프로퍼티다.
// square 함수는 Object.prototpye 객체로부터 __proto__ 접근자 프로퍼티를 상속받는다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype,'__proto__'));
// {get: f, set: f, enumerable: fasle, configurable: true}


```

이처럼 arguments, caller, length, name, prototype 프로퍼티는 모두 함수 객체의 데이터 프로퍼티다. 이들 프로퍼티는 일반 객체에는 없는 함수 객체 고유의 프로퍼티다. 하지만 \_\_proto\_\_는 접근자 프로퍼티이며, 함수 객체 고유의 프로퍼티가 아니라 Object.prototpye 객체의 프로퍼티를 상속받은 것을 알 수 있다. Object.prototype 객체의 프로퍼티는 모든 객체가 상속받아 사용할 수 있다. 즉, Object.prototype 객체의 \_\_proto\_\_ 접근자 프로퍼티는 모든 객체가 사용할 수 있다.

### 18.2.1 arguments 프로퍼티

함수 객체의 arguments 프로퍼티 값은 arguments 객체다. arguments 객체는 함수 호출 시 전달된 인수(argument)들의 정보를 담고 있는 순회 가능한(itrable)유사 배열 객체이며, 함수 내부에서 지역 변수처럼 사용된다. 즉, 함수 외부에서는 참조할 수 없다.