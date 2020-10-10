'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const pg = require('pg');
const e = require('express');
const PORT = process.env.PORT;
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.error(error));

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', getCube);
app.post('/testing_form', formInput);

function getCube(request, response) {
  let sql = `SELECT * FROM holy_cube;`;
  client.query(sql)
    .then(result => {
      let grid = result.rows.map(row => {
        let sql = `SELECT * FROM ${row.cube_side};`;
        return client.query(sql)
      })
      Promise.all(grid)
        .then(result => {
          let aggArray = result.map(value => value.rows);
          response.status(200).render('index', { cube: aggArray })
        })
    }).catch('error', error => console.error(error))
}

const rotate = matrix => {
  //Step One: Turn rows into columns, and columns into rows
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i; j < matrix.length; j++) {
      let pivot = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = pivot;
    }
  }
  //Step Two: Reverse the rows from the middle out.
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length / 2; j++) {
      let pivot = matrix[i][j];
      matrix[i][j] = matrix[i][matrix.length - 1 - j];
      matrix[i][matrix.length - 1 - j] = pivot;
    }
  }
  return matrix
};




/* Big story is, formInput is already huge and ugly. Several refactors need to take place. Equation array may need to become global of some kind, we might also want to think about refering to global array positions at [i[0-5]] instead of green blue orange etc. 
One thing to watch for when we start a new color roll(green is the first), we had the issue with sql making the array positions in a different order because it nicely moves the last thing we altered to the bottom of the print list, hence why we grabbed them by id.

A big one is, i would like to call a seperate function for each color. I am guessing the string of face selected needs to be passed, but also need to work out how the travel log works and where it is defined....
*/

function delay() {
  return new Promise(resolve => setTimeout(resolve, 500));
}
async function delayedLog() {
  await delay();
}




let travelLog = {};
let faceValue;
let equationArray = ['orange', 'green', 'white', 'blue', 'red', 'yellow'];

let sql;
let sql2;
let sql3;
let sql4;
let sql5;

async function formInput(request, response) {

  let { cube_side, rotate_roll, face_clock } = request.body;
  if (cube_side === 'white') {
    console.log('in if statement')
    await delayedLog(rotateWhiteClockwise(cube_side)).then(() => {
      response.status(200).redirect('/')
    })
  }

}


function rotateWhiteClockwise(str) {
  faceValue = str;
  travelLog.table = faceValue;
  sql = `SELECT * FROM ${faceValue};`;
  sql2 = `SELECT * FROM ${equationArray[0]} WHERE id=1;`;
  sql3 = `SELECT * FROM ${equationArray[1]} WHERE id=1;`;
  sql4 = `SELECT * FROM ${equationArray[3]} WHERE id=1;`;
  sql5 = `SELECT * FROM ${equationArray[4]} WHERE id=1;`;

  client.query(sql)
    .then(results => {
      let faceArray = results.rows.map(item => item.positions.split(','));
      rotate(faceArray);
      travelLog.face_array = faceArray;
    }).then(() => {
      client.query(sql2)
        .then(results => {
          travelLog.orange = results.rows[0].positions.split(',')
        })
        .then(() => {
          client.query(sql3)
            .then(results => {
              travelLog.green = results.rows[0].positions.split(',')
            })
            .then(() => {
              client.query(sql4)
                .then(results => {
                  travelLog.blue = results.rows[0].positions.split(',')
                })
                .then(() => {
                  client.query(sql5)
                    .then(results => {
                      travelLog.red = results.rows[0].positions.split(',')
                    })
                    .then(() => {
                      console.log(travelLog)
                      let num = 1;
                      while (num < 3) {
                        travelLog.face_array.forEach(item => {
                          let sql = `UPDATE ${travelLog.table} SET positions='${item}' WHERE id=${num};`
                          client.query(sql)
                          num++;
                          console.log('in function, in while loop')
                        })
                      }
                    }).then(() => {
                      let sql = `UPDATE orange SET positions='${travelLog.green}' WHERE id=1;`;
                      client.query(sql)
                        .then(() => {
                          let sql = `UPDATE blue SET positions='${travelLog.orange}' WHERE id=1;`;
                          client.query(sql)
                            .then(() => {
                              let sql = `UPDATE red SET positions='${travelLog.blue}' WHERE id=1;`;
                              client.query(sql)
                                .then(() => {
                                  let sql = `UPDATE green SET positions='${travelLog.red}' WHERE id=1;`;
                                  client.query(sql)
                                    .then(() => {
                                      return travelLog;
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }).catch('error', error => console.error(error))

}






function reset_cube(request, response) {
  let resetArray = []

  let sqlArray = [`UPDATE orange SET row='top', positions='orange:00,orange:01,orange:02', face_id=1 WHERE id=1;`,
    `UPDATE orange SET row='middle', positions='orange:10,orange:11,orange:12', face_id=1 WHERE id=2;`,
    `UPDATE orange SET row='bottom', positions='orange:20,orange:21,orange:22', face_id=1 WHERE id=3;`,
    `UPDATE green SET row='top', positions='green:00,green:01,green:02', face_id=2 WHERE id=1;`,
    `UPDATE green SET row='middle', positions='green:10,green:11,green:12', face_id=2 WHERE id=2;`,
    `UPDATE green SET row='bottom', positions='green:20,green:21,green:22', face_id=2 WHERE id=3;`,
    `UPDATE white SET row='top', position='white:00,white:01,white:02', face_id=3 WHERE id=1;`,
    `UPDATE white SET row='middle', position='white:10,white:11,white:12', face_id=3 WHERE id=2;`,
    `UPDATE white SET row='bottom', position='white:20,white:21,white:22', face_id=3 WHERE id=3;`,
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
  Promise.all[resetArray].then(results => {
    console.log(results)
    response.status(200).redirect('/');
  })

}

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`${PORT} is rockin...`)
    })
  })