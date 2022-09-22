# Chapter.08 - 제어문<br>

---

## 8.1 블록문<br>

---

블록문의 끝에는 세미콜론을 붙이지 않는다는 것에 주의하라.<br><br>

---

## 8.2 조건문<br>

자바스크립트의 조건문에는 if ... else 문과 switch 문으로 두가지를 제공한다.<br><br>

### 8.2.1 if...else문<br>

if...else문은 논리적 '참' 또는 '거짓'에 따라 실행할 코드 블록이 결정된다.<br>
참(true)일 경우 if문의 코드 블록이 실행되고, 거짓(false)일 경우 else문의 코드 블록이 실행된다.<br>

```
if(조건식){
    // 조건식이 '참'이면 이 코드 블록이 실행
} else {
    // 조건식이 '거짓'이면 이 코드 블록이 실행
}
```

if문의 조건식은 불리언(boolean)값으로 평가 되어야 한다.<br>

조건식을 추가하여 조건에 따라 실행될 코드 블록을 늘리고 싶으면 else if 문을 사용한다.

```
if(조건식1){
    // 조건식1이 참이면 이 코드 블록이 실행
} else if(조건식2){
    // 조건식2가 참이면 이 코드 블록이 실행
} else{
    // 조건식1과 조건식2가 모두 거짓이면 이 코드 블록이 실행
}
```

- 만약 코드 블록 내의 문이 하나뿐이라면 중괄호를 생략할 수 있다.

```
var num = 2;
var kind;

if(num>0) kind = '양수';
else if(num<0) kind = '음수';
else kind = '영';

console.log(kind);

// 양수
```

- 대부분의 if...else 문은 삼항 조건 연산자로 바꿔 쓸 수 있다.

```
var x = 2;
var result;

if(x % 2){  // 2 % 2는 0이다. 이때 0은 false로 암묵적 강제 변환된다.
    result='홀수';
} else {
    result='짝수';
}

console.log(result);

// 짝수
```

- 위의 예제를 삼항 연산자로 바꿔보자

```
var x = 2;

var result = x % 2 ? '홀수' : '짝수';
console.log(result);

//짝수
```

- 만약 경우의 수가 세 가지('양수','음수','영')라면 다음과 같이 바꿔 쓸 수 있다.

```
var num=2;

var kind = num ? (num > 0 ? '양수' : '음수') : '영';

console.log(kind);

// 양수
```

### 8.2.2 switch 문<br>

switch 문은 주어진 표현식을 평가하여 그 값과 일치하는 표현식을 갖는 case문으로 실행 흐름을 옮긴다.<br><br>

```
var month = 11;
var monthName ;

switch (month){
    case 1: monthName = 'January';
    case 2: monthName = 'February';
    case 3: monthName = 'March';
    case 4: monthName = 'April';
    case 5: monthName = 'May';
    case 6: monthName = 'June';
    case 7: monthName = 'July';
    case 8: monthName = 'August';
    case 9: monthName = 'September';
    case 10: monthName = 'October';
    case 11: monthName = 'November';
    case 12: monthName = 'December';
    default: monthName = 'Invalid month';
}

console.log(monthName);

// Invalid month
```

## 8.3 반복문<br>

### 8.3.1 for문<br>

for문은 조건식이 거짓으로 평가될 때까지 코드 블록을 반복 실행한다.<br>

```
for( 변수 선언문 또는 할당문; 조건식; 증감식 ){
    조건식이 참인 경우 반복 실행될 문;
}
```

- 중첩 for문의 예

```
for ( var i = 1; 1 <= 6; i++ ){
    for( var j = 1; j <= 6; j++ ){
        if( i + j === 6 ) console.log(`[${i}, ${j}]`);
    }
}

[1, 5]
[2, 4]
[3, 3]
[4, 2]
[5, 1]

```

### 8.3.2 while문<br>

while문은 주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행한다.<br>
for문은 반복 횟수가 정확할 때 사용하고 while 문은 반복 횟수가 불명확할 때 주로 사용한다.<br>

```
var count = 0;

while(count < 3){
    console.log(count);
    count ++;
}
```

```
var count = 0;

while(true){   // 조건식의 평가 결과가 언제나 참이면 무한루프가 된다.
    console.log(count);
    count++;
    if( count === 3) break;   // count가 3이면 코드 블록을 탈출한다.
}
```

### 8.3.3 do...while문

do...while문은 코드 블록을 먼저 실행하고 조건식을 평가한다. 따라서 코드 블록은 무조건 한 번 이상 실행된다.

```
var count = 0;

do {
    console.log(count);
    count++;
} while ( count <3 );
```

## 8.4 break문

break문은 코드 블록을 탈출한다. **레이블 문**, 반복문, switch문의 코드 블록 외에 break문을 사용하면 문법에러가 발생한다.<br>

- 레이블 문 이란? → 식별자가 붙은 문을 말한다.

```
foo: {
    console.log(1);
    break foo;
    console.log(2);
}

console.log('Done!');

[0,0]
[0,1]
[0,2]
[1,0]
[1,1]
```

- 문자열에서 특정 문자의 인덱스(위치)를 검색하는 예이다.

```
var string = "Hello World";
var search = 'l';
var index;

for (var i = 0; i < string.length; i++){
    if ( string[1] === search ){
        index = i;
        break;
    }
}

console.log(index);

// 2

// 참고로 String.prototype.indexOf 메서드를 사용해도 같은 동작을 한다.
console.log(string.indexOf(search)); //2
```

## 8.5 continue문<br>

---

continue문은 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시킨다. break문 처럼 반복문을 탈출 하지 않는다.

```
var string = 'Hello World';
var search = 'l';
var count = 0;

for ( var i = 0; i < string.length ; i++ ){
    if ( string[i] !== search ) continue;
    count++;
}

consoel.log(count); //3

```
