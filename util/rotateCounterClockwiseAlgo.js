'use strict';

module.exports = function rotateCounter(matrix) {
  //Step One: Turn rows into columns, and columns into rows
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i; j < matrix.length; j++) {

      let pivot = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = pivot;
    }
  }
  //Step Two: Reverse the rows from the middle out.
  let i = 0;
  let j = matrix.length - 1;
  let count = 0;
  while (count < matrix.length) {
    while (i <= j) {
      let temp = matrix[i][count];
      matrix[i][count] = matrix[j][count];
      matrix[j][count] = temp;
      i += 1;
      j -= 1;
    }
    count += 1;
    i = 0;
    j = matrix.length - 1;
  }
  return matrix
};