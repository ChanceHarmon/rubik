
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

module.exports = function reset_cube(request, response) {
  let resetArray = []

  let sqlArray = [`UPDATE orange SET row='top', positions='orange:00,orange:01,orange:02', face_id=1 WHERE id=1;`,
    `UPDATE orange SET row='middle', positions='orange:10,orange:11,orange:12', face_id=1 WHERE id=2;`,
    `UPDATE orange SET row='bottom', positions='orange:20,orange:21,orange:22', face_id=1 WHERE id=3;`,
    `UPDATE green SET row='top', positions='green:00,green:01,green:02', face_id=2 WHERE id=1;`,
    `UPDATE green SET row='middle', positions='green:10,green:11,green:12', face_id=2 WHERE id=2;`,
    `UPDATE green SET row='bottom', positions='green:20,green:21,green:22', face_id=2 WHERE id=3;`,
    `UPDATE white SET row='top', positions='white:00,white:01,white:02', face_id=3 WHERE id=1;`,
    `UPDATE white SET row='middle', positions='white:10,white:11,white:12', face_id=3 WHERE id=2;`,
    `UPDATE white SET row='bottom', positions='white:20,white:21,white:22', face_id=3 WHERE id=3;`,
    `UPDATE blue SET row='top', positions='blue:00,blue:01,blue:02', face_id=4 WHERE id=1;`,
    `UPDATE blue SET row='middle', positions='blue:10,blue:11,blue:12', face_id=4 WHERE id=2;`,
    `UPDATE blue SET row='bottom', positions='blue:20,blue:21,blue:22', face_id=4 WHERE id=3;`,
    `UPDATE red SET row='top', positions='red:00,red:01,red:02', face_id=5 WHERE id=1;`,
    `UPDATE red SET row='middle', positions='red:10,red:11,red:12', face_id=5 WHERE id=2;`,
    `UPDATE red SET row='bottom', positions='red:20,red:21,red:22', face_id=5 WHERE id=3;`,
    `UPDATE yellow SET row='top', positions='yellow:00,yellow:01,yellow:02', face_id=6 WHERE id=1;`,
    `UPDATE yellow SET row='middle', positions='yellow:10,yellow:11,yellow:12', face_id=6 WHERE id=2;`,
    `UPDATE yellow SET row='bottom', positions='yellow:20,yellow:21,yellow:22', face_id=6 WHERE id=3;`
  ]

  sqlArray.forEach(str => {
    resetArray.push(client.query(str))
  })
  console.log('before promise all', resetArray)
  Promise.all(resetArray).then(results => {
    console.log(results)
    response.status(200).redirect('/');
  }).catch(error => console.error(error))

}