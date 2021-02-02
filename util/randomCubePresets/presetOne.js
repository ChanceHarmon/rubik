
'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));
client.connect()

module.exports = function random_one(request, response) {
  let randomArray = []

  let sqlArray = [`UPDATE orange SET row='top', positions='yellow:00,yellow:01,red:02', face_id=1 WHERE id=1;`,
    `UPDATE orange SET row='middle', positions='red:12,orange:11,yellow:10', face_id=1 WHERE id=2;`,
    `UPDATE orange SET row='bottom', positions='blue:00,orange:12,blue:02', face_id=1 WHERE id=3;`,
    `UPDATE green SET row='top', positions='green:20,red:10,green:00', face_id=2 WHERE id=1;`,
    `UPDATE green SET row='middle', positions='green:01,green:11,green:21', face_id=2 WHERE id=2;`,
    `UPDATE green SET row='bottom', positions='yellow:20,yellow:21,red:22', face_id=2 WHERE id=3;`,
    `UPDATE white SET row='top', positions='yellow:22,orange:01,orange:02', face_id=3 WHERE id=1;`,
    `UPDATE white SET row='middle', positions='green:12,white:11,green:10', face_id=3 WHERE id=2;`,
    `UPDATE white SET row='bottom', positions='yellow:02,orange:21,orange:22', face_id=3 WHERE id=3;`,
    `UPDATE blue SET row='top', positions='blue:22,yellow:12,blue:20', face_id=4 WHERE id=1;`,
    `UPDATE blue SET row='middle', positions='blue:12,blue:11,blue:10', face_id=4 WHERE id=2;`,
    `UPDATE blue SET row='bottom', positions='white:20,white:21,orange:00', face_id=4 WHERE id=3;`,
    `UPDATE red SET row='top', positions='white:00,white:01,orange:20', face_id=5 WHERE id=1;`,
    `UPDATE red SET row='middle', positions='white:10,red:11,orange:10', face_id=5 WHERE id=2;`,
    `UPDATE red SET row='bottom', positions='green:02,white:12,green:22', face_id=5 WHERE id=3;`,
    `UPDATE yellow SET row='top', positions='red:20,blue:01,red:00', face_id=6 WHERE id=1;`,
    `UPDATE yellow SET row='middle', positions='red:21,yellow:11,red:01', face_id=6 WHERE id=2;`,
    `UPDATE yellow SET row='bottom', positions='white:22,blue:21,white:02', face_id=6 WHERE id=3;`
  ]

  sqlArray.forEach(str => {
    randomArray.push(client.query(str))
  })
  console.log('before promise all in random set one', randomArray)
  Promise.all(randomArray).then(results => {
    console.log(results)
    response.status(200).redirect('/');
  }).catch(error => console.error(error))

}


