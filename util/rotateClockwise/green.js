'use strict';

require('dotenv').config();
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));
client.connect()

const rotate = require('../../util/rotateClockwiseAlgo');


module.exports = function rotateGreenClockwise(str) {

  let travelLog = {};
  let faceValue;
  let equationArray = ['orange', 'green', 'white', 'blue', 'red', 'yellow'];
  let travelLogArray = [];

  let sql;
  let sql2;
  let sql3;
  let sql4;
  let sql5;

  faceValue = str;
  travelLog.table = faceValue;
  sql = `SELECT * FROM ${faceValue};`;
  sql2 = `SELECT * FROM ${equationArray[0]};`;
  sql3 = `SELECT * FROM ${equationArray[5]};`;
  sql4 = `SELECT * FROM ${equationArray[2]};`;
  sql5 = `SELECT * FROM ${equationArray[4]};`;

  client.query(sql)
    .then(results => {
      let faceArray = results.rows.map(item => item.positions.split(','));
      rotate(faceArray);
      travelLog.face_array = faceArray;
    }).then(() => {
      client.query(sql2)
        .then(results => {
          console.log('orange sql results', results)
          console.log('orange sql result1 with travel log array', travelLogArray)
          travelLog.og_orange = results.rows;
          travelLogArray.push(travelLog.og_orange)
          travelLog.orange = [results.rows[0].positions.split(',')[0], results.rows[1].positions.split(',')[0], results.rows[2].positions.split(',')[0]]
        })
        .then(() => {
          client.query(sql3)
            .then(results => {
              console.log('yellow sql results', results)
              travelLog.og_yellow = results.rows;
              travelLogArray.push(travelLog.og_yellow)
              travelLog.yellow = [results.rows[0].positions.split(',')[2], results.rows[1].positions.split(',')[2], results.rows[2].positions.split(',')[2]]
            })
            .then(() => {
              client.query(sql4)
                .then(results => {
                  console.log('white sql results', results)
                  travelLog.og_white = results.rows;
                  travelLogArray.push(travelLog.og_white)
                  travelLog.white = [results.rows[0].positions.split(',')[0], results.rows[1].positions.split(',')[0], results.rows[2].positions.split(',')[0]]
                })
                .then(() => {
                  client.query(sql5)
                    .then(results => {
                      console.log('red sql results', results)
                      travelLog.og_red = results.rows;
                      travelLogArray.push(travelLog.og_red)
                      travelLog.red = [results.rows[0].positions.split(',')[0], results.rows[1].positions.split(',')[0], results.rows[2].positions.split(',')[0]]
                    })
                    .then(() => {
                      //console.log(travelLog)
                      let num = 1;
                      while (num < 3) {
                        travelLog.face_array.forEach(item => {
                          let sql = `UPDATE ${travelLog.table} SET positions='${item}' WHERE id=${num};`
                          client.query(sql)
                          num++;
                          //console.log('in function, in while loop')
                        })
                      }
                    }).then(() => {
                      console.log('the travel log array bfore first update', travelLogArray, 'and travel log obj', travelLog)
                      let sql = `UPDATE orange SET positions='${travelLogArray[0][0].positions.split(',')[0]},${travelLogArray[0][0].positions.split(',')[1]},${travelLogArray[1][2].positions.split(',')[0]}' WHERE id=1;`;
                      console.log('first orange sql', sql)
                      client.query(sql)
                        .then(() => {
                          let sql = `UPDATE orange SET positions='${travelLogArray[0][1].positions.split(',')[0]},${travelLogArray[0][1].positions.split(',')[1]},${travelLogArray[1][1].positions.split(',')[0]}' WHERE id=2;`;
                          console.log('second 0range sql', sql)
                          client.query(sql)
                            .then(() => {
                              let sql = `UPDATE orange SET positions='${travelLogArray[0][2].positions.split(',')[0]},${travelLogArray[0][2].positions.split(',')[1]},${travelLogArray[1][0].positions.split(',')[0]}' WHERE id=3;`;
                              console.log('orange sql 3', sql)
                              client.query(sql)

                                .then(() => {
                                  let sql = `UPDATE yellow SET positions='${travelLogArray[3][0].positions.split(',')[0]},${travelLogArray[1][0].positions.split(',')[1]},${travelLogArray[1][0].positions.split(',')[2]}' WHERE id=1;`;
                                  console.log('yellow sql 1', sql)
                                  client.query(sql)
                                    .then(() => {
                                      let sql = `UPDATE yellow SET positions='${travelLogArray[3][1].positions.split(',')[0]},${travelLogArray[1][1].positions.split(',')[1]},${travelLogArray[1][1].positions.split(',')[2]}' WHERE id=2;`;
                                      console.log('yellow sql 2', sql)
                                      client.query(sql)
                                        .then(() => {
                                          let sql = `UPDATE yellow SET positions='${travelLogArray[3][2].positions.split(',')[0]},${travelLogArray[1][2].positions.split(',')[1]},${travelLogArray[1][2].positions.split(',')[2]}' WHERE id=3;`;
                                          console.log('yellow sql 3', sql)
                                          client.query(sql)

                                            .then(() => {
                                              let sql = `UPDATE white SET positions='${travelLogArray[0][2].positions.split(',')[2]},${travelLogArray[2][0].positions.split(',')[1]},${travelLogArray[2][0].positions.split(',')[2]}' WHERE id=1;`;
                                              console.log('white sql 1', sql)
                                              client.query(sql)
                                                .then(() => {
                                                  let sql = `UPDATE white SET positions='${travelLogArray[0][1].positions.split(',')[2]},${travelLogArray[2][1].positions.split(',')[1]},${travelLogArray[2][1].positions.split(',')[2]}' WHERE id=2;`;

                                                  console.log('white sql 2', sql)
                                                  client.query(sql)
                                                    .then(() => {
                                                      let sql = `UPDATE white SET positions='${travelLogArray[0][0].positions.split(',')[2]},${travelLogArray[2][2].positions.split(',')[1]},${travelLogArray[2][2].positions.split(',')[2]}' WHERE id=3;`;
                                                      console.log('white sql 3', sql)
                                                      client.query(sql)

                                                        //yuck, big time issue with retnourn order and .then chain, barf

                                                        .then(() => {
                                                          let sql = `UPDATE red SET positions='${travelLogArray[2][0].positions.split(',')[0]},${travelLogArray[3][0].positions.split(',')[1]},${travelLogArray[3][0].positions.split(',')[2]}' WHERE id=1;`;
                                                          console.log('red sql 1', sql)
                                                          client.query(sql)
                                                            .then(() => {
                                                              let sql = `UPDATE red SET positions='${travelLogArray[2][1].positions.split(',')[0]},${travelLogArray[3][1].positions.split(',')[1]},${travelLogArray[3][1].positions.split(',')[2]}' WHERE id=2;`;
                                                              console.log('red sql 2', sql)
                                                              client.query(sql)
                                                                .then(() => {
                                                                  let sql = `UPDATE red SET positions='${travelLogArray[2][2].positions.split(',')[0]},${travelLogArray[3][2].positions.split(',')[1]},${travelLogArray[3][2].positions.split(',')[2]}' WHERE id=3;`;
                                                                  console.log('red sql 3', sql)
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

//Green works once, not at all twice..