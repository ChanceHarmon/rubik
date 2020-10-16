'use strict';

//Basic imports for server setup and database connection

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const pg = require('pg');
const PORT = process.env.PORT;
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.error(error));


//Setup of middleware

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))

//import functions from util files
const reset_cube = require('./util/reset/resetCube');
const rotateWhiteClockwise = require('./util/rotateClockwise/white');
const rotateGreenClockwise = require('./util/rotateClockwise/green');
const rotateOrangeClockwise = require('./util/rotateClockwise/orange');

//Routes

app.get('/', getCube);
app.get('/reset', reset_cube);
app.post('/testing_form', formInput);

//The rest of it...


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
          aggArray.sort((a,b) => a.id - b.id)
          // let test2 = aggArray.map(item => item.map(() => item.sort((a, b) => a.id - b.id)));
          console.log('soorted agg array in server', aggArray)
          //console.log('soorted test2 in server', test2)

          // test2.forEach(item => {
          //   console.log(item)
          // })
          // console.log('testing sort', aggArray.map(item => item.map(() => item.sort((a, b) => a.id - b.id))))
          response.status(200).render('index', { cube: aggArray })
        })
    }).catch('error', error => console.error(error))
}


function delay() {
  return new Promise(resolve => setTimeout(resolve, 500));
}
async function delayedLog() {
  await delay();
}

// let travelLog = {};
// let faceValue;
// let equationArray = ['orange', 'green', 'white', 'blue', 'red', 'yellow'];

// let sql;
// let sql2;
// let sql3;
// let sql4;
// let sql5;

async function formInput(request, response) {

  let { cube_side, rotate_roll, face_clock } = request.body;
  if (cube_side === 'white') {
    console.log('in if statement')
    await delayedLog(rotateWhiteClockwise(cube_side)).then(() => {
      response.status(200).redirect('/')
    })
  } else if (cube_side === 'green') {
    console.log('in if statement')
    await delayedLog(rotateGreenClockwise(cube_side)).then(() => {
      response.status(200).redirect('/')
    })

  }
  else if (cube_side === 'orange') {
    console.log('in if statement')
    await delayedLog(rotateOrangeClockwise(cube_side)).then(() => {
      response.status(200).redirect('/')
    })

  }
}

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`${PORT} is rockin...`)
    })
  })