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


//All the code ....

//Create an array with 6 sides with colors, and make it a global item

app.get('/', getCube);

function getCube(request, response) {
  console.log('hi')
  let array = [[['green', 'green', 'green'],
  ['green', 'green', 'green'],
  ['green', 'green', 'green']
  ],
  [['yellow', 'yellow', 'yellow'],
  ['yellow', 'yellow', 'yellow'],
  ['yellow', 'yellow', 'yellow'],
  ],
  [['red', 'red', 'red'],
  ['red', 'red', 'red'],
  ['red', 'red', 'red']
  ],
  [['white', 'white', 'white'],
  ['white', 'white', 'white'],
  ['white', 'white', 'white']
  ],
  [['blue', 'blue', 'blue'],
  ['blue', 'blue', 'blue'],
  ['blue', 'blue', 'blue']
  ],
  [['orange', 'orange', 'orange'],
  ['orange', 'orange', 'orange'],
  ['orange', 'orange', 'orange']
  ]];
  console.log(array.toString())
  let value = array.toString()
  let sql = `INSERT INTO holy_cube(positions) VALUES ('${array}');`;

  // 'INSERT INTO books(title, author, isbn, image_url, description, bookshelf) VALUES($1, $2, $3, $4, $5, $6) RETURNING id;';





  client.query(sql)
    .then(() => {
      let sql = 'SELECT * FROM holy_cube;';
      client.query(sql)
        .then(result => {
          console.log('61', result)
          let grid = result.rows[0].positions
          console.log(grid)
          console.log(typeof grid)
        })
    })

}






client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`${PORT} is rockin...`)
    })
  })