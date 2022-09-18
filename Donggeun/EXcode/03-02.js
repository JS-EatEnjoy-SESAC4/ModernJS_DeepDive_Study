const arr = [1, 2, 3];

//arr.forEach(console.log);
arr.forEach(alert);
// 오류 뜨는 이유는 Code Runner 확장 플러그인은 Node.js 환경을 사용해 자바스크립트를 실행하기 때문에 클라이언트 사이드 Web API인 alert함수를 알 수 없다.