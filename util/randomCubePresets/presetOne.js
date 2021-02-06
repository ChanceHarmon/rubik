
'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));
client.connect();








let sqlArray1 = [
  `UPDATE orange SET row='top', positions='orange:22,white:10,blue:02', face_id=1 WHERE id=1;`,
  `UPDATE orange SET row='middle', positions='red:01,orange:11,red:12', face_id=1 WHERE id=2;`,
  `UPDATE orange SET row='bottom', positions='yellow:00,orange:10,blue:22', face_id=1 WHERE id=3;`,
  `UPDATE green SET row='top', positions='orange:00,yellow:10,white:00', face_id=2 WHERE id=1;`,
  `UPDATE green SET row='middle', positions='blue:10,green:11,yellow:01', face_id=2 WHERE id=2;`,
  `UPDATE green SET row='bottom', positions='orange:20,blue:21,red:02', face_id=2 WHERE id=3;`,
  `UPDATE white SET row='top', positions='white:02,green:01,yellow:20', face_id=3 WHERE id=1;`,
  `UPDATE white SET row='middle', positions='green:21,white:11,red:10', face_id=3 WHERE id=2;`,
  `UPDATE white SET row='bottom', positions='green:00,green:10,red:00', face_id=3 WHERE id=3;`,
  `UPDATE blue SET row='top', positions='green:02,green:12,green:20', face_id=4 WHERE id=1;`,
  `UPDATE blue SET row='middle', positions='orange:01,blue:11,white:21', face_id=4 WHERE id=2;`,
  `UPDATE blue SET row='bottom', positions='red:22,yellow:21,red:20', face_id=4 WHERE id=3;`,
  `UPDATE red SET row='top', positions='orange:02,orange:12,white:20', face_id=5 WHERE id=1;`,
  `UPDATE red SET row='middle', positions='red:21,red:11,white:01', face_id=5 WHERE id=2;`,
  `UPDATE red SET row='bottom', positions='white:22,white:12,yellow:02', face_id=5 WHERE id=3;`,
  `UPDATE yellow SET row='top', positions='blue:00,blue:01,blue:20', face_id=6 WHERE id=1;`,
  `UPDATE yellow SET row='middle', positions='yellow:12,yellow:11,orange:21', face_id=6 WHERE id=2;`,
  `UPDATE yellow SET row='bottom', positions='yellow:22,blue:12,green:22', face_id=6 WHERE id=3;`
];


let sqlArray2 = [
  `UPDATE orange SET row='top', positions='white:22,orange:01,orange:20', face_id=1 WHERE id=1;`,
  `UPDATE orange SET row='middle', positions='yellow:21,orange:11,green:12', face_id=1 WHERE id=2;`,
  `UPDATE orange SET row='bottom', positions='red:22,yellow:12,green:22', face_id=1 WHERE id=3;`,
  `UPDATE green SET row='top', positions='blue:22,green:21,green:20', face_id=2 WHERE id=1;`,
  `UPDATE green SET row='middle', positions='red:10,green:11,orange:10', face_id=2 WHERE id=2;`,
  `UPDATE green SET row='bottom', positions='red:20,red:01,orange:00', face_id=2 WHERE id=3;`,
  `UPDATE white SET row='top', positions='yellow:22,white:01,red:02', face_id=3 WHERE id=1;`,
  `UPDATE white SET row='middle', positions='yellow:10,white:11,yellow:01', face_id=3 WHERE id=2;`,
  `UPDATE white SET row='bottom', positions='yellow:20,blue:01,green:02', face_id=3 WHERE id=3;`,
  `UPDATE blue SET row='top', positions='white:20,red:21,blue:00', face_id=4 WHERE id=1;`,
  `UPDATE blue SET row='middle', positions='red:12,blue:11,orange:21', face_id=4 WHERE id=2;`,
  `UPDATE blue SET row='bottom', positions='orange:02,orange:12,yellow:02', face_id=4 WHERE id=3;`,
  `UPDATE red SET row='top', positions='orange:22,white:12,red:00', face_id=5 WHERE id=1;`,
  `UPDATE red SET row='middle', positions='blue:12,red:11,blue:10', face_id=5 WHERE id=2;`,
  `UPDATE red SET row='bottom', positions='blue:02,green:01,green:00', face_id=5 WHERE id=3;`,
  `UPDATE yellow SET row='top', positions='white:02,white:10,white:00', face_id=6 WHERE id=1;`,
  `UPDATE yellow SET row='middle', positions='white:21,yellow:11,green:10', face_id=6 WHERE id=2;`,
  `UPDATE yellow SET row='bottom', positions='yellow:00,blue:21,blue:20', face_id=6 WHERE id=3;`
];


let sqlArray3 = [
  `UPDATE orange SET row='top', positions='blue:22,orange:12,yellow:22', face_id=1 WHERE id=1;`,
  `UPDATE orange SET row='middle', positions='white:21,orange:11,blue:10', face_id=1 WHERE id=2;`,
  `UPDATE orange SET row='bottom', positions='orange:22,yellow:12,yellow:20', face_id=1 WHERE id=3;`,
  `UPDATE green SET row='top', positions='white:00,green:01,white:22', face_id=2 WHERE id=1;`,
  `UPDATE green SET row='middle', positions='blue:12,green:11,red:12', face_id=2 WHERE id=2;`,
  `UPDATE green SET row='bottom', positions='blue:02,white:12,red:00', face_id=2 WHERE id=3;`,
  `UPDATE white SET row='top', positions='blue:20,blue:01,green:00', face_id=3 WHERE id=1;`,
  `UPDATE white SET row='middle', positions='orange:10,white:11,yellow:10', face_id=3 WHERE id=2;`,
  `UPDATE white SET row='bottom', positions='orange:20,orange:21,green:02', face_id=3 WHERE id=3;`,
  `UPDATE blue SET row='top', positions='white:20,orange:01,orange:00', face_id=4 WHERE id=1;`,
  `UPDATE blue SET row='middle', positions='yellow:12,blue:11,red:01', face_id=4 WHERE id=2;`,
  `UPDATE blue SET row='bottom', positions='yellow:02,white:10,yellow:00', face_id=4 WHERE id=3;`,
  `UPDATE red SET row='top', positions='orange:22,white:01,white:02', face_id=5 WHERE id=1;`,
  `UPDATE red SET row='middle', positions='yellow:21,red:11,blue:21', face_id=5 WHERE id=2;`,
  `UPDATE red SET row='bottom', positions='blue:00,whitee:12,red:00', face_id=5 WHERE id=3;`,
  `UPDATE yellow SET row='top', positions='yellow:00,yellow:12,green:00', face_id=6 WHERE id=1;`,
  `UPDATE yellow SET row='middle', positions='red:01,yellow:11,orange:10', face_id=6 WHERE id=2;`,
  `UPDATE yellow SET row='bottom', positions='blue:22,red:21,yellow:22', face_id=6 WHERE id=3;`
];


let sqlArray4 = [
  `UPDATE orange SET row='top', positions='blue:00,red:10,green:22', face_id=1 WHERE id=1;`,
  `UPDATE orange SET row='middle', positions='orange:21,orange:11,yellow:12', face_id=1 WHERE id=2;`,
  `UPDATE orange SET row='bottom', positions='yellow:02,blue:01,orange:20', face_id=1 WHERE id=3;`,
  `UPDATE green SET row='top', positions='white:20,yellow:01,yellow:00', face_id=2 WHERE id=1;`,
  `UPDATE green SET row='middle', positions='white:12,green:11,green:01', face_id=2 WHERE id=2;`,
  `UPDATE green SET row='bottom', positions='red:20,green:21,white:22', face_id=2 WHERE id=3;`,
  `UPDATE white SET row='top', positions='orange:02,green:10,red:00', face_id=3 WHERE id=1;`,
  `UPDATE white SET row='middle', positions='yellow:21,white:11,orange:01', face_id=3 WHERE id=2;`,
  `UPDATE white SET row='bottom', positions='red:22,blue:10,green:00', face_id=3 WHERE id=3;`,
  `UPDATE blue SET row='top', positions='yellow:22,red:21,blue:22', face_id=4 WHERE id=1;`,
  `UPDATE blue SET row='middle', positions='orange:10,blue:11,white:01', face_id=4 WHERE id=2;`,
  `UPDATE blue SET row='bottom', positions='white:02,white:21,green:00', face_id=4 WHERE id=3;`,
  `UPDATE red SET row='top', positions='blue:02,orange:12,blue:20', face_id=5 WHERE id=1;`,
  `UPDATE red SET row='middle', positions='yellow:10,red:11,blue:21', face_id=5 WHERE id=2;`,
  `UPDATE red SET row='bottom', positions='green:02,red:12,green:20', face_id=5 WHERE id=3;`,
  `UPDATE yellow SET row='top', positions='blue:20,white:10,white:00', face_id=6 WHERE id=1;`,
  `UPDATE yellow SET row='middle', positions='blue:21,yellow:11,red:01', face_id=6 WHERE id=2;`,
  `UPDATE yellow SET row='bottom', positions='yellow:20,green:01,orange:22', face_id=6 WHERE id=3;`
];


let sqlArray5 = [
  `UPDATE orange SET row='top', positions='orange:00,white:10,white:00', face_id=1 WHERE id=1;`,
  `UPDATE orange SET row='middle', positions='orange:10,orange:11,yellow:12', face_id=1 WHERE id=2;`,
  `UPDATE orange SET row='bottom', positions='orange:22,orange:01,yellow:20', face_id=1 WHERE id=3;`,
  `UPDATE green SET row='top', positions='green:22,orange:21,red:20', face_id=2 WHERE id=1;`,
  `UPDATE green SET row='middle', positions='blue:21,green:11,orange:12', face_id=2 WHERE id=2;`,
  `UPDATE green SET row='bottom', positions='blue:02,white:12,red:22', face_id=2 WHERE id=3;`,
  `UPDATE white SET row='top', positions='green:00,green:01,white:02', face_id=3 WHERE id=1;`,
  `UPDATE white SET row='middle', positions='yellow:01,white:11,white:21', face_id=3 WHERE id=2;`,
  `UPDATE white SET row='bottom', positions='yellow:02,yellow:21,orange:20', face_id=3 WHERE id=3;`,
  `UPDATE blue SET row='top', positions='yellow:00,red:01,white:22', face_id=4 WHERE id=1;`,
  `UPDATE blue SET row='middle', positions='yellow:10,blue:11,red:21', face_id=4 WHERE id=2;`,
  `UPDATE blue SET row='bottom', positions='white:20,blue:10,red:02', face_id=4 WHERE id=3;`,
  `UPDATE red SET row='top', positions='yellow:22,blue:12,orange:02', face_id=5 WHERE id=1;`,
  `UPDATE red SET row='middle', positions='green:10,red:11,green:21', face_id=5 WHERE id=2;`,
  `UPDATE red SET row='bottom', positions='blue:20,green:12,green:02', face_id=5 WHERE id=3;`,
  `UPDATE yellow SET row='top', positions='blue:00,red:10,blue:22', face_id=6 WHERE id=1;`,
  `UPDATE yellow SET row='middle', positions='blue:01,yellow:11,red:12', face_id=6 WHERE id=2;`,
  `UPDATE yellow SET row='bottom', positions='green:20,white:01,red:01', face_id=6 WHERE id=3;`
];

let randomList = [
  {
    previousViewed: false,
    setList: sqlArray1
  },
  {
    previousViewed: false,
    setList: sqlArray2
  },
  {
    previousViewed: false,
    setList: sqlArray3
  },
  {
    previousViewed: false,
    setList: sqlArray4
  },
  {
    previousViewed: false,
    setList: sqlArray5
  },
]

function testStatement(arr) {

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
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; i++) {
      if (obj.hasOwnProperty(arr[i][j]) && obj[arr[i][j]] === 0) {
        obj[arr[i][j]] = 1;
      } else if (obj.hasOwnProperty(arr[i][j]) && obj[arr[i][j]] !== 0) {
        obj[arr[i][j]] = -1;
      }
    }
  }
  for (let i in obj) {

    if (obj[i] === -1 || obj[i] === 0) {
      return false;
    } else return true;
  }

}

function randomNum() {
  return Math.floor(Math.random() * randomList.length)
}

module.exports = function random_one(request, response) {
  let randomArray = []

  let newIndex = randomNum();
  while (randomList[newIndex].previousViewed === true) {
    newIndex = randomNum();
  }
  for (let i = 0; i < randomList.length; i++) {
    randomList[i].previousViewed = false;
  }
  // console.log(newIndex)
  // console.log(randomList[newIndex])
  randomList[newIndex].setList.forEach(str => {
    randomArray.push(client.query(str))
  })
  // console.log('before promise all in random set one', 'new index', newIndex, randomArray)
  Promise.all(randomArray).then(() => {
    randomList[newIndex].previousViewed = true;
    // console.log(randomList)
    response.status(200).redirect('/');
  }).catch(error => console.error('error', error))

}


