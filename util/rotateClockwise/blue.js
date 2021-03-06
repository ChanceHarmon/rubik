'use strict';

require('dotenv').config();
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));
client.connect()

const rotate = require('../../util/rotateClockwiseAlgo');

module.exports = function rotateBlueClockwise(str) {
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
  sql2 = `SELECT * FROM ${equationArray[2]};`;
  sql3 = `SELECT * FROM ${equationArray[4]};`;
  sql4 = `SELECT * FROM ${equationArray[0]};`;
  sql5 = `SELECT * FROM ${equationArray[5]};`;

  client.query(sql)
    .then(results => {
      let presort = results.rows.sort((a, b) => a.id - b.id)
      let faceArray = presort.map(item => item.positions.split(','));
      rotate(faceArray);
      travelLog.face_array = faceArray;
    }).then(() => {
      client.query(sql2)
        .then(results => {
          travelLog.og_white = results.rows.sort((a, b) => a.id - b.id)
          travelLogArray.push(travelLog.og_white)
        })
        .then(() => {
          client.query(sql3)
            .then(results => {
              travelLog.og_red = results.rows.sort((a, b) => a.id - b.id)
              travelLogArray.push(travelLog.og_red)
            })
            .then(() => {
              client.query(sql4)
                .then(results => {
                  travelLog.og_orange = results.rows.sort((a, b) => a.id - b.id)
                  travelLogArray.push(travelLog.og_orange)
                })
                .then(() => {
                  client.query(sql5)
                    .then(results => {
                      travelLog.og_yellow = results.rows.sort((a, b) => a.id - b.id)
                      travelLogArray.push(travelLog.og_yellow)
                    })
                    .then(() => {
                      let num = 1;
                      while (num < 3) {
                        travelLog.face_array.forEach(item => {
                          let sql = `UPDATE ${travelLog.table} SET positions='${item}' WHERE id=${num};`
                          client.query(sql)
                          num++;
                        })
                      }
                    }).then(() => {
                      console.log('travel log array before update in blue', travelLogArray)
                      let sql = `UPDATE white SET positions='${travelLogArray[0][0].positions.split(',')[0]},${travelLogArray[0][0].positions.split(',')[1]},${travelLogArray[1][0].positions.split(',')[2]}' WHERE id=1;`;
                      client.query(sql)
                        .then(() => {
                          let sql = `UPDATE white SET positions='${travelLogArray[0][1].positions.split(',')[0]},${travelLogArray[0][1].positions.split(',')[1]},${travelLogArray[1][1].positions.split(',')[2]}' WHERE id=2;`;
                          client.query(sql)
                            .then(() => {
                              let sql = `UPDATE white SET positions='${travelLogArray[0][2].positions.split(',')[0]},${travelLogArray[0][2].positions.split(',')[1]},${travelLogArray[1][2].positions.split(',')[2]}' WHERE id=3;`;
                              client.query(sql)
                                .then(() => {
                                  let sql = `UPDATE red SET positions='${travelLogArray[1][0].positions.split(',')[0]},${travelLogArray[1][0].positions.split(',')[1]},${travelLogArray[3][0].positions.split(',')[2]}' WHERE id=1;`;
                                  client.query(sql)
                                    .then(() => {
                                      let sql = `UPDATE red SET positions='${travelLogArray[1][1].positions.split(',')[0]},${travelLogArray[1][1].positions.split(',')[1]},${travelLogArray[3][1].positions.split(',')[2]}' WHERE id=2;`;
                                      client.query(sql)
                                        .then(() => {
                                          let sql = `UPDATE red SET positions='${travelLogArray[1][2].positions.split(',')[0]},${travelLogArray[1][2].positions.split(',')[1]},${travelLogArray[3][2].positions.split(',')[2]}' WHERE id=3;`;
                                          client.query(sql)
                                            .then(() => {
                                              let sql = `UPDATE orange SET positions='${travelLogArray[0][2].positions.split(',')[2]},${travelLogArray[2][0].positions.split(',')[1]},${travelLogArray[2][0].positions.split(',')[2]}' WHERE id=1;`;
                                              client.query(sql)
                                                .then(() => {
                                                  let sql = `UPDATE orange SET positions='${travelLogArray[0][1].positions.split(',')[2]},${travelLogArray[2][1].positions.split(',')[1]},${travelLogArray[2][1].positions.split(',')[2]}' WHERE id=2;`;
                                                  client.query(sql)
                                                    .then(() => {
                                                      let sql = `UPDATE orange SET positions='${travelLogArray[0][0].positions.split(',')[2]},${travelLogArray[2][2].positions.split(',')[1]},${travelLogArray[2][2].positions.split(',')[2]}' WHERE id=3;`;
                                                      client.query(sql)
                                                        .then(() => {
                                                          let sql = `UPDATE yellow SET positions='${travelLogArray[3][0].positions.split(',')[0]},${travelLogArray[3][0].positions.split(',')[1]},${travelLogArray[2][2].positions.split(',')[0]}' WHERE id=1;`;
                                                          client.query(sql)
                                                            .then(() => {
                                                              let sql = `UPDATE yellow SET positions='${travelLogArray[3][1].positions.split(',')[0]},${travelLogArray[3][1].positions.split(',')[1]},${travelLogArray[2][1].positions.split(',')[0]}' WHERE id=2;`;
                                                              client.query(sql)
                                                                .then(() => {
                                                                  let sql = `UPDATE yellow SET positions='${travelLogArray[3][2].positions.split(',')[0]},${travelLogArray[3][2].positions.split(',')[1]},${travelLogArray[2][0].positions.split(',')[0]}' WHERE id=3;`;
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