import {Injectable} from '@angular/core';
import {SIZE} from '../models/constants';

type Matrix = number[][];

@Injectable()
export class BacktrackingAlgorithm {

  public solve(matrix: Matrix): Matrix {
    const emptyPosition = this._emptyPosition(matrix);

    if (!emptyPosition) {
      return matrix;
    }

    const [row, col] = emptyPosition;

    for (let num = 1; num <= SIZE; num++) {
      if (this._isValidNumber(matrix, row, col, num)) {

        matrix[row][col] = num;

        if (this.solve(matrix)) {
          return matrix;
        }

        matrix[row][col] = 0;
      }
    }

    return null;
  }

  private _emptyPosition(matrix: Matrix): number[] {
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (!matrix[row][col]) {
          return [row, col];
        }
      }
    }
    return null;
  }

  private _isValidNumber(matrix, row, col, num): boolean {
    return !(this._usedInRow(matrix, row, num)
      || this._usedInColumn(matrix, col, num)
      || this._usedInBlock(matrix, row - row % 3, col - col % 3, num));
  }

  private _usedInRow(matrix, row, num): boolean {
    for (let col = 0; col < SIZE; col++) {
      if (matrix[row][col] === num) {
        return true;
      }
    }

    return false;
  }

  private _usedInColumn(matrix, col, num): boolean {
    for (let row = 0; row < SIZE; row++) {
      if (matrix[row][col] === num) {
        return true;
      }
    }

    return false;
  }

  private _usedInBlock(matrix: Matrix, rowStart: number, colStart: number, num: number): boolean {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (matrix[row + rowStart][col + colStart] === num) {
          return true;
        }
      }
    }
    return false;
  }
}
