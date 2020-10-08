'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.error(error))
app.use(cors());
const PORT = process.env.PORT;
app.set('view engine', 'ejs');
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))


//All the code ....

//Create an array with 6 sides with colors, and make it a global item

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
  console.log(request.body)
  if (request.body.cube_color === 'white') {
    console.log('test')
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
      console.log(results)
      let faceArray = results.rows.map(item => item.positions.split(','));
      rotate(faceArray);
      travelLog.face_array = faceArray;
    }).then(() => {
      client.query(sql2)
        .then(results => {
          console.log(results.rows[0].positions.split(','))
          travelLog.top = results.rows[0].positions.split(',')
        })
        .then(() => {
          client.query(sql3)
            .then(results => {
              console.log(results.rows[0].positions.split(','))
              travelLog.left_hand = results.rows[0].positions.split(',')
            })
            .then(() => {
              client.query(sql4)
                .then(results => {
                  console.log(results.rows[0].positions.split(','))
                  travelLog.right_hand = results.rows[0].positions.split(',')
                })
                .then(() => {
                  client.query(sql5)
                    .then(results => {
                      console.log(results.rows[0].positions.split(','))
                      travelLog.bottom = results.rows[0].positions.split(',')
                    })
                    .then(() => {
                      console.log(travelLog)
                      //We made it, we have an object with everything we need at an incrdibly ineffcient way, now we nee to keep doing things terribly inneficent : )


                      //First thing is to update the face as a whole.  I believe this will have to be a loop with update sql statements in them.
                      let num = 1;
                      while (num < 3) {
                        travelLog.face_array.forEach(item => {
                          console.log(item)
                          let sql = `UPDATE ${travelLog.table} SET positions='${item}' WHERE id=${num};`
                          console.log(sql)
                          client.query(sql)
                          num++;
                        })
                      }

                    }).then(() => {
                      //now start rotating rows, refer to notebook for order of clockwise values
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
                                      console.log('made it')
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



//generic prob, i need to make sure that the array from selecting the cube returns before I can reference the values to loop over, 
//then I need to figure outt how to make it wait for the next call of looping through each db callllll......
// }).then(() => {
//   Promise.all(cubeArray).then(result => {
//     console.log(result)
//   })







client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`${PORT} is rockin...`)
    })
  })