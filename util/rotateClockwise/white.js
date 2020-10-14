'use strict';

require('dotenv').config();
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));
client.connect()

const rotate = require('../../util/rotateClockwiseAlgo');

let travelLog = {};
let faceValue;
let equationArray = ['orange', 'green', 'white', 'blue', 'red', 'yellow'];

let sql;
let sql2;
let sql3;
let sql4;
let sql5;

module.exports = function rotateWhiteClockwise(str) {
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