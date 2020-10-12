'use strict'

module.exports = function rotate(matrix) {
  //Step One: Turn rows into columns, and columns into rows
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i; j < matrix.length; j++) {
      let pivot = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = pivot;
    }
  }
  //Step Two: Reverse the rows from the middle out.
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length / 2; j++) {
      let pivot = matrix[i][j];
      matrix[i][j] = matrix[i][matrix.length - 1 - j];
      matrix[i][matrix.length - 1 - j] = pivot;
    }
  }
  return matrix
};