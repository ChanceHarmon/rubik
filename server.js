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

function formInput(request, response) {
  console.log(request.body)
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