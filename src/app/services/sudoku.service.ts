import {Injectable} from '@angular/core';
import {COMPLEXITY, EMPTY_SQUARE, SIZE, SQUARES} from '../models/constants';
import {ConstraintAlgorithm} from './constraint-algorithm.service';

@Injectable()
export class SudokuService {

  constructor(private readonly constraintAlgorithm: ConstraintAlgorithm) { }

  public generate(complexityLevel: number = COMPLEXITY.Easy): number[][] {
    const shuffledSquares = this._shuffle(SQUARES);
    const candidates = this.constraintAlgorithm.getCandidatesMap('');

    for (const square of shuffledSquares) {
      const randCandidateIndex = this._randomRange(candidates[square].length);
      const randCandidate = candidates[square][randCandidateIndex];
      if (!this.constraintAlgorithm.assign(candidates, square, randCandidate)) {
        break;
      }

      const uniques = {};
      let assignIndexes = [];
      let board = Object.values(candidates).reduce((acc, val, i) => {
        if (val.length === 1) {
          assignIndexes.push(i);
          uniques[val] = true;
          return acc += val;
        }

        return acc += EMPTY_SQUARE;
      }, '');

      if (assignIndexes.length >= complexityLevel && Object.values(uniques).length > SIZE - 2) {

        if (assignIndexes.length > complexityLevel) {
          assignIndexes = this._shuffle(assignIndexes);
          for (let i = 0; i < assignIndexes.length - complexityLevel; ++i) {
            const index = assignIndexes[i];
            board = board.substr(0, index) + EMPTY_SQUARE + board.substr(index + 1);
          }
        }

        if (this.constraintAlgorithm.solve(board)) {
          return this._createMatrix(board);
        }
      }
    }

    return this.generate(complexityLevel);
  }

  private _createMatrix(board: string): number[][] {
    return board.match(/.{1,9}/g)
      .map(row => row.split('')
        .map(v => parseInt(v, 10)));
  }

  private _shuffle<T>(items: T[]): T[] {
    const shuffled = [];
    for (let i = 0; i < items.length; ++i) {
      shuffled.push(false);
    }

    for (let i = 0; i < items.length; i++) {
      let randInd = this._randomRange(items.length);

      while (shuffled[randInd]) {
        randInd = (randInd + 1) > (items.length - 1) ? 0 : (randInd + 1);
      }

      shuffled[randInd] = items[i];
    }

    return shuffled;
  }

  private _randomRange(max: number, min?: number): number {
    min = min || 0;
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
