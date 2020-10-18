'use strict';

require('dotenv').config();
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));
client.connect()

const rotate = require('../../util/rotateClockwiseAlgo');



module.exports = function rotateWhiteClockwise(str) {

  let travelLog = {};
  let faceValue;
  let equationArray = ['orange', 'green', 'white', 'blue', 'red', 'yellow'];

  let sql;
  let sql2;
  let sql3;
  let sql4;
  let sql5;
  let travelLogArray = [];

  faceValue = str;
  travelLog.table = faceValue;
  sql = `SELECT * FROM ${faceValue};`;
  sql2 = `SELECT * FROM ${equationArray[0]};`;
  sql3 = `SELECT * FROM ${equationArray[1]};`;
  sql4 = `SELECT * FROM ${equationArray[3]};`;
  sql5 = `SELECT * FROM ${equationArray[4]};`;

  client.query(sql)
    .then(results => {
      let presort = results.rows.sort((a, b) => a.id - b.id)
      let faceArray = presort.map(item => item.positions.split(','));
      console.log('rotate white, face before rotate', faceArray)
      rotate(faceArray);
      console.log('rotate white, face after rotate', faceArray)
      travelLog.face_array = faceArray;
    }).then(() => {
      client.query(sql2)
        .then(results => {
          travelLog.og_orange = results.rows.sort((a, b) => a.id - b.id)
          travelLogArray.push(travelLog.og_orange)
          travelLog.orange = results.rows[0].positions.split(',')
          console.log('in white, orange', travelLog)
        })
        .then(() => {
          client.query(sql3)
            .then(results => {
              travelLog.og_green = results.rows.sort((a, b) => a.id - b.id)
              travelLogArray.push(travelLog.og_green)
              travelLog.green = results.rows[0].positions.split(',')
              console.log('in white, green', travelLog)
            })
            .then(() => {
              client.query(sql4)
                .then(results => {
                  travelLog.og_blue = results.rows.sort((a, b) => a.id - b.id)
                  travelLogArray.push(travelLog.og_blue)
                  travelLog.blue = results.rows[0].positions.split(',')
                  console.log('in white, blue', travelLog)
                })
                .then(() => {
                  client.query(sql5)
                    .then(results => {
                      travelLog.og_red = results.rows.sort((a, b) => a.id - b.id)
                      travelLogArray.push(travelLog.og_red)
                      travelLog.red = results.rows[0].positions.split(',')
                      console.log('in white, red', travelLog)
                    })
                    .then(() => {
                      console.log('travel log before loop', travelLog)
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
                      console.log('rotate white, before updates', travelLog, 'and travel log array', travelLogArray)
                      let sql = `UPDATE orange SET positions='${travelLogArray[1][0].positions.split(',')[0]},${travelLogArray[1][0].positions.split(',')[1]},${travelLogArray[1][0].positions.split(',')[2]}' WHERE id=1;`;
                      console.log('only white sql', sql)
                      client.query(sql)
                        .then(() => {
                          let sql = `UPDATE blue SET positions='${travelLogArray[0][0].positions.split(',')[0]},${travelLogArray[0][0].positions.split(',')[1]},${travelLogArray[0][0].positions.split(',')[2]}' WHERE id=1;`;
                          console.log('only white sql', sql)
                          client.query(sql)
                            .then(() => {
                              let sql = `UPDATE red SET positions='${travelLogArray[2][0].positions.split(',')[0]},${travelLogArray[2][0].positions.split(',')[1]},${travelLogArray[2][0].positions.split(',')[2]}' WHERE id=1;`;
                              console.log('only white sql', sql)
                              client.query(sql)
                                .then(() => {
                                  let sql = `UPDATE green SET positions='${travelLogArray[3][0].positions.split(',')[0]},${travelLogArray[3][0].positions.split(',')[1]},${travelLogArray[3][0].positions.split(',')[2]}' WHERE id=1;`;
                                  console.log('only white sql', sql)
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