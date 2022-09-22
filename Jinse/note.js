// var month = 5;
// var monthName;

// switch (month) {
//   case 1:
//     monthName = "January";
//   case 2:
//     monthName = "February";
//   case 3:
//     monthName = "March";
//   case 4:
//     monthName = "April";
//   case 5:
//     monthName = "May";
//   case 6:
//     monthName = "June";
//   case 7:
//     monthName = "July";
//   case 8:
//     monthName = "August";
//   case 9:
//     monthName = "September";
//   case 10:
//     monthName = "October";
//   case 11:
//     monthName = "November";
//   case 12:
//     monthName = "December";

//   default:
//     monthName = "Invalid month";
// }

// console.log(monthName);
// ------------------------------------
// var i = 1;
// var k = 1;

// switch (i) {
//   case 0:
//   case 1:
//   case 2:
//     k += 4;
//   case 3:
//     k -= 4;
//   case 4:
//     k += 3;
//   case 5:
//     k -= 10;
//   default:
//     k--;
// }

// console.log(k);
// // ------------------------------
// for (var i = 1; 1 <= 6; i++) {
//   for (var j = 1; j <= 6; j++) {
//     if (i + j === 6) console.log(`[${i}, ${j}]`);
//   }
// }

// ---------------------------------

// outer: for (var i = 0; i < 3; i++) {
//   for (var j = 0; j < 3; j++) {
//     if (i + j === 3) break outer;
//     console.log(`inner [${i}, ${j}]`);
//   }
// }
// -===================================
var string = "Hello World";
var search = "l";
var index;

for (var i = 0; i < string.length; i++) {
  if (string[i] === search) {
    index = i;
    break;
  }
}

console.log(index);

// 2
