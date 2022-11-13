# Chapter.24 - 클로저<br>

---

MDN
클로저는 '둘러쌓여진 상태의 참조'와 함께 다발로 묶여진 함수의 콤비네이션이다.
바꿔말하면 클로저는 내부 함수로부터 외부함수에의 접근권한을 준다.
클로저는 함수 생성 시점에 언제나 생긴다.

### 예제 24-01 (p.388)

```
const x = 1;

function outerFunc() {
    const x = 10;

    function innerFunc() {
        console.log(x);        // 10
    }    // <- innerFunc와 outerFunc 사이의 closure(oER)  (outer Environment Reference)

    innerFunc();
}       // <- outerFunc와 전역컨텍스트 사이의 closure(oER)

outerFunc();
```

### 예제 24-03 (p.390)

```
const x = 1;

function foo() {
    const x = 10;
    bar();
}

function bar() {
    console.log(x);
}

foo() ;    // 1
bar() ;    // 1
```

## 24.3 클로저와 렉시컬 환경

---

```
const x = 1;

function outer() {
    const x = 10;
    const inner = function () { console.log(x);} ;
    return inner;
}

const innerFunc = outer();
innerFunc(); //  10
```
