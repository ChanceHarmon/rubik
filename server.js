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
          console.log('agg array in server', aggArray)
          let test2 = aggArray.map(item => item.map(() => item.sort((a, b) => a.id - b.id)));

          // test2.forEach(item => {
          //   console.log(item)
          // })
          // console.log('testing sort', aggArray.map(item => item.map(() => item.sort((a, b) => a.id - b.id))))
          response.status(200).render('index', { cube: aggArray })
        })
    }).catch('error', error => console.error(error))
}

/* Big story is, formInput is already huge and ugly. Several refactors need to take place. Equation array may need to become global of some kind, we might also want to think about refering to global array positions at [i[0-5]] instead of green blue orange etc. 
One thing to watch for when we start a new color roll(green is the first), we had the issue with sql making the array positions in a different order because it nicely moves the last thing we altered to the bottom of the print list, hence why we grabbed them by id.

A big one is, i would like to call a seperate function for each color. I am guessing the string of face selected needs to be passed, but also need to work out how the travel log works and where it is defined....

//I think this works now, going to try with green
*/

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
}

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`${PORT} is rockin...`)
    })
  })