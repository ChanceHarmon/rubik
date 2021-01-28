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
const rotateBlueClockwise = require('./util/rotateClockwise/blue');
const rotateRedClockwise = require('./util/rotateClockwise/red');
const rotateYellowClockwise = require('./util/rotateClockwise/yellow');

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
          let aggArray = result.map(value => value.rows)
          aggArray.forEach(color => color.sort((a, b) => a.id - b.id));
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

async function formInput(request, response) {

  let { cube_side, rotate_roll, face_clock } = request.body;
  if (cube_side === 'white') {
    await delayedLog(rotateWhiteClockwise(cube_side)).then(() => {
      response.status(200).redirect('/')
    })
  } else if (cube_side === 'green') {
    await delayedLog(rotateGreenClockwise(cube_side)).then(() => {
      response.status(200).redirect('/')
    })
  }
  else if (cube_side === 'orange') {
    await delayedLog(rotateOrangeClockwise(cube_side)).then(() => {
      response.status(200).redirect('/')
    })
  }
  else if (cube_side === 'blue') {
    await delayedLog(rotateBlueClockwise(cube_side)).then(() => {
      response.status(200).redirect('/')
    })
  }
  else if (cube_side === 'red') {
    await delayedLog(rotateRedClockwise(cube_side)).then(() => {
      response.status(200).redirect('/')
    })
  }
  else if (cube_side === 'yellow') {
    await delayedLog(rotateYellowClockwise(cube_side)).then(() => {
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

  //TODO timer for promise is not slow enough for heroku, probably should figure out why the hell i need it any way, but change it be longer next time