'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const pg = require('pg');
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
          console.log(aggArray)
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
  console.log('matrix', matrix)
  return matrix
};

function formInput(request, response) {

  let travelLog = {};
  let faceValue;

  if (request.body.cube_color === 'white') {
    faceValue = 'face';
    travelLog.table = faceValue;
  }

  let sql = `SELECT * FROM ${faceValue};`;
  let sql2 = `SELECT * FROM top;`;
  let sql3 = `SELECT * FROM left_hand;`;
  let sql4 = `SELECT * FROM right_hand;`;
  let sql5 = `SELECT * FROM bottom;`;

  client.query(sql)
    .then(results => {
      let faceArray = results.rows.map(item => item.positions.split(','));
      rotate(faceArray);
      travelLog.face_array = faceArray;
    }).then(() => {
      client.query(sql2)
        .then(results => {
          travelLog.top = results.rows[0].positions.split(',')
        })
        .then(() => {
          client.query(sql3)
            .then(results => {
              travelLog.left_hand = results.rows[0].positions.split(',')
            })
            .then(() => {
              client.query(sql4)
                .then(results => {
                  travelLog.right_hand = results.rows[0].positions.split(',')
                })
                .then(() => {
                  client.query(sql5)
                    .then(results => {
                      travelLog.bottom = results.rows[0].positions.split(',')
                    })
                    .then(() => {
                      let num = 1;
                      while (num < 3) {
                        travelLog.face_array.forEach(item => {
                          let sql = `UPDATE ${travelLog.table} SET positions='${item}' WHERE id=${num};`
                          client.query(sql)
                          num++;
                        })
                      }
                    }).then(() => {
                      let sql = `UPDATE top SET positions='${travelLog.left_hand}' WHERE id=1;`;
                      client.query(sql)
                        .then(() => {
                          let sql = `UPDATE right_hand SET positions='${travelLog.top}' WHERE id=1;`;
                          client.query(sql)
                            .then(() => {
                              let sql = `UPDATE bottom SET positions='${travelLog.right_hand}' WHERE id=1;`;
                              client.query(sql)
                                .then(() => {
                                  let sql = `UPDATE left_hand SET positions='${travelLog.bottom}' WHERE id=1;`;
                                  client.query(sql)
                                    .then(() => {
                                      response.status(200).redirect('/');
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

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`${PORT} is rockin...`)
    })
  })