'use strict';

//Control object of the all of the cube positions
const obj = {
  'green:00': 0,
  'green:01': 0,
  'green:02': 0,
  'green:10': 0,
  'green:11': 0,
  'green:12': 0,
  'green:20': 0,
  'green:21': 0,
  'green:22': 0,
  'orange:00': 0,
  'orange:01': 0,
  'orange:02': 0,
  'orange:10': 0,
  'orange:11': 0,
  'orange:12': 0,
  'orange:20': 0,
  'orange:21': 0,
  'orange:22': 0,
  'white:00': 0,
  'white:01': 0,
  'white:02': 0,
  'white:10': 0,
  'white:11': 0,
  'white:12': 0,
  'white:20': 0,
  'white:21': 0,
  'white:22': 0,
  'blue:00': 0,
  'blue:01': 0,
  'blue:02': 0,
  'blue:10': 0,
  'blue:11': 0,
  'blue:12': 0,
  'blue:20': 0,
  'blue:21': 0,
  'blue:22': 0,
  'red:00': 0,
  'red:01': 0,
  'red:02': 0,
  'red:10': 0,
  'red:11': 0,
  'red:12': 0,
  'red:20': 0,
  'red:21': 0,
  'red:22': 0,
  'yellow:00': 0,
  'yellow:01': 0,
  'yellow:02': 0,
  'yellow:10': 0,
  'yellow:11': 0,
  'yellow:12': 0,
  'yellow:20': 0,
  'yellow:21': 0,
  'yellow:22': 0

}


//If you change one of the position values in the below array, it should return false  

//The idea is to check for a missing value, and make sure there are no duplicates

//UPDATE orange SET row='top', positions='orange:22,white:10,blue:02', face_id=1 WHERE id=1;
//vs
//UPDATE orange SET row='top', positions='orange:21,white:10,blue:02', face_id=1 WHERE id=1;
//Will return false

let sqlArray = [
  `UPDATE orange SET row='top', positions='red:20,blue:10,white:20', face_id=1 WHERE id=1;`,
  `UPDATE orange SET row='middle', positions='green:01,orange:11,orange:21', face_id=1 WHERE id=2;`,
  `UPDATE orange SET row='bottom', positions='white:02,white:01,blue:22', face_id=1 WHERE id=3;`,
  `UPDATE green SET row='top', positions='green:02,orange:12,orange:22', face_id=2 WHERE id=1;`,
  `UPDATE green SET row='middle', positions='yellow:21,green:11,green:12', face_id=2 WHERE id=2;`,
  `UPDATE green SET row='bottom', positions='orange:20,yellow:01,white:00', face_id=2 WHERE id=3;`,
  `UPDATE white SET row='top', positions='red:00,red:12,green:22', face_id=3 WHERE id=1;`,
  `UPDATE white SET row='middle', positions='green:10,white:11,green:21', face_id=3 WHERE id=2;`,
  `UPDATE white SET row='bottom', positions='green:20,white:21,white:22', face_id=3 WHERE id=3;`,
  `UPDATE blue SET row='top', positions='blue:00,yellow:10,yellow:00', face_id=4 WHERE id=1;`,
  `UPDATE blue SET row='middle', positions='white:12,blue:11,white:10', face_id=4 WHERE id=2;`,
  `UPDATE blue SET row='bottom', positions='red:22,blue:12,blue:02', face_id=4 WHERE id=3;`,
  `UPDATE red SET row='top', positions='yellow:20,red:01,red:02', face_id=5 WHERE id=1;`,
  `UPDATE red SET row='middle', positions='red:10,red:11,blue:01', face_id=5 WHERE id=2;`,
  `UPDATE red SET row='bottom', positions='green:00,yellow:12,yellow:02', face_id=5 WHERE id=3;`,
  `UPDATE yellow SET row='top', positions='orange:02,blue:21,blue:20', face_id=6 WHERE id=1;`,
  `UPDATE yellow SET row='middle', positions='red:21,yellow:11,orange:10', face_id=6 WHERE id=2;`,
  `UPDATE yellow SET row='bottom', positions='yellow:22,orange:01,orange:00', face_id=6 WHERE id=3;`
];

function splitArray(arr) {

  let firstStringArray = []

  for (let i = 0; i < arr.length; i++) {

    firstStringArray.push(arr[i].split('positions=\''))
  }
  let nextArray = [];

  for (let i = 0; i < firstStringArray.length; i++) {
    nextArray.push(firstStringArray[i][1].split('\', '))

  }
  return nextArray;
}


function testValue(callback, arr, obj) {
  let parsedData = callback(arr);
  let flag = true;
  for (let i = 0; i < parsedData.length; i++) {
    let innerArray = parsedData[i][0].split(',');
    for (let j = 0; j < innerArray.length; j++) {
      if (obj.hasOwnProperty(innerArray[j]) && obj[innerArray[j]] === 0) {
        // console.log('changing to 1')
        obj[innerArray[j]] = 1;
      } else if (obj.hasOwnProperty(innerArray[j]) && obj[innerArray[j]] !== 0) {
        // console.log('changing to -1')
        obj[innerArray[j]] = -1;
      }
      // console.log(obj)
    }
  }
  for (let i in obj) {
    if (obj[i] === -1 || obj[i] === 0) {
      flag = false;
    }
  }
  return flag
}

console.log(testValue(splitArray, sqlArray, obj))
