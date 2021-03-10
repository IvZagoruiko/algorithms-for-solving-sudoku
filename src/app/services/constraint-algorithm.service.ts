import {Injectable} from '@angular/core';
import {ICandidates, Square} from '../models/types';
import {DIGITS, EMPTY_SQUARE, PEERS_MAP, SQUARES, UNITS_MAP} from '../models/constants';

@Injectable()
export class ConstraintAlgorithm {

  public solve(board: string): number[][] {
    const candidates = this.getCandidatesMap(board);
    return this._createMatrix(this._search(candidates));
  }

  private _createMatrix(candidates: ICandidates): number[][] {
    if (!candidates) {
      return null;
    }

    return Object.values(candidates).join('').match(/.{1,9}/g)
      .map(row => row.split('')
        .map(v => parseInt(v, 10)));
  }

  public getCandidatesMap(board: string): ICandidates {
    const candidatesMap = {};

    SQUARES.forEach(square => candidatesMap[square] = DIGITS);

    for (let i = 0; i < board.length; i++) {
      const val = board[i];
      if (val !== EMPTY_SQUARE && !this.assign(candidatesMap, SQUARES[i], val)) {
        return null;
      }
    }

    return candidatesMap;
  }

  public assign(candidates: ICandidates, square: Square, val: string): ICandidates {
    const otherValues = candidates[square].replace(val, '');

    for (const otherVal of otherValues) {
      if (!this.eliminate(candidates, square, otherVal)) {
        return null;
      }
    }

    return candidates;
  }

  public eliminate(candidates: ICandidates, square: Square, val: string): ICandidates {
    if (!this._in(val, candidates[square])) {
      // already eliminated
      return candidates;
    }

    candidates[square] = candidates[square].replace(val, '');

    const candidatesLen = candidates[square].length;
    if (candidatesLen === 1) {
      // value assigned, remove it from peers
      for (const peer of PEERS_MAP[square]) {
        if (!this.eliminate(candidates, peer, candidates[square])) {
          return null;
        }
      }
    } else if (candidatesLen === 0) {
      // invalid input
      return null;
    }

    // after eliminate check auto assigned values in units
    for (const units of UNITS_MAP[square]) {
      const valueInUnits = [];

      for (const unit of units) {
        if (this._in(val, candidates[unit])) {
          valueInUnits.push(unit);
        }
      }

      if (valueInUnits.length === 0 || (valueInUnits.length === 1 && !this.assign(candidates, valueInUnits[0], val))) {
        return null;
      }
    }

    return candidates;
  }

  private _search(candidates: ICandidates): ICandidates {
    if (!candidates) {
      return null;
    }

    const allAssigned = Object.values(candidates).every(val => val.length === 1);
    if (allAssigned) {
      return candidates;
    }

    // find min not assigned candidates square
    let minCandidatesLen = 10;
    let minCandidatesSquare = null;
    for (const square of SQUARES) {
      const candidatesLen = candidates[square].length;

      if (candidatesLen < minCandidatesLen && candidatesLen > 1) {
        minCandidatesLen = candidatesLen;
        minCandidatesSquare = square;
      }
    }

    for (const val of candidates[minCandidatesSquare]) {
      const candidatesCopy = {...candidates};
      const candidatesNext = this._search(this.assign(candidatesCopy, minCandidatesSquare, val));

      if (candidatesNext) {
        return candidatesNext;
      }
    }

    return null;
  }

  private _in(val, items): boolean {
    return items.indexOf(val) !== -1;
  }
}
