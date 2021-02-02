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

const random_one = require('./util/randomCubePresets/presetOne')

const rotateWhiteClockwise = require('./util/rotateClockwise/white');
const rotateGreenClockwise = require('./util/rotateClockwise/green');
const rotateOrangeClockwise = require('./util/rotateClockwise/orange');
const rotateBlueClockwise = require('./util/rotateClockwise/blue');
const rotateRedClockwise = require('./util/rotateClockwise/red');
const rotateYellowClockwise = require('./util/rotateClockwise/yellow');

const rotateWhiteCounterClockwise = require('./util/rotateCounter/white');
const rotateGreenCounterClockwise = require('./util/rotateCounter/green');
const rotateOrangeCounterClockwise = require('./util/rotateCounter/orange');
const rotateBlueCounterClockwise = require('./util/rotateCounter/blue');
const rotateRedCounterClockwise = require('./util/rotateCounter/red');
const rotateYellowCounterClockwise = require('./util/rotateCounter/yellow');

//Routes

app.get('/', getCube);  //Calls whatever is the current saved cube among all of the different color tables
app.get('/reset', reset_cube);  //Calls the imported function, that resets the cube to solved, then redirects to / route
app.get('/randomCube', random_one);  //Calls the imported function, currently produces one random cube set, then redirects to / route
app.post('/user_action', formInput);//  Takes in the user selection based on the radio selection

//The rest of it...

//Renders Home page, basic select everything and send it to the front to make look pretty.
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

//These belove two functions I have had as tools for a long time. They work if you pay atteention to what is called in the await calls in the formInput function
function delay() {
  return new Promise(resolve => setTimeout(resolve, 500));
}
async function delayedLog() {
  await delay();
}


//Handles the user input, and calls the correct sequence of how to rotate the cube and update all of the tables. Looks like a lot but is really just a repeat of the same idea 12 times, just variable names change.

async function formInput(request, response) {

  let { cube_side, rotate_roll, face_clock } = request.body;

  if (rotate_roll === 'rotate_face_clockwise') {
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
  } else if (rotate_roll === 'rotate_face_counter_clockwise') {
    if (cube_side === 'white') {
      await delayedLog(rotateWhiteCounterClockwise(cube_side)).then(() => {
        response.status(200).redirect('/')
      })
    } else if (cube_side === 'green') {
      await delayedLog(rotateGreenCounterClockwise(cube_side)).then(() => {
        response.status(200).redirect('/')
      })
    }
    else if (cube_side === 'orange') {
      await delayedLog(rotateOrangeCounterClockwise(cube_side)).then(() => {
        response.status(200).redirect('/')
      })
    }
    else if (cube_side === 'blue') {
      await delayedLog(rotateBlueCounterClockwise(cube_side)).then(() => {
        response.status(200).redirect('/')
      })
    }
    else if (cube_side === 'red') {
      await delayedLog(rotateRedCounterClockwise(cube_side)).then(() => {
        response.status(200).redirect('/')
      })
    }
    else if (cube_side === 'yellow') {
      await delayedLog(rotateYellowCounterClockwise(cube_side)).then(() => {
        response.status(200).redirect('/')
      })
    }
  }
}

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`${PORT} is rockin...`)
    })
  })