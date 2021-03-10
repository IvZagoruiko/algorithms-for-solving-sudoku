import {IPeersMap, IUnitsMap, Squares} from './types';

export class SudokuHelper {
  static cross(x: string, y: string): Squares {
    const result = [];
    for (const a of x) {
      for (const b of y) {
        result.push(a + b);
      }
    }
    return result;
  }

  static getUnitsMap(rows: string, cols: string, squares: string[]): IUnitsMap {
    const units = [];

    for (const row of rows) {
      units.push(this.cross(row, cols));
    }

    for (const col of cols) {
      units.push(this.cross(rows, col));
    }

    const rowSquares = ['ABC', 'DEF', 'GHI'];
    const colSquares = ['123', '456', '789'];

    for (const rs of rowSquares) {
      for (const cs of colSquares) {
        units.push(this.cross(rs, cs));
      }
    }

    const unitsMap = {};

    for (const square of squares) {
      unitsMap[square] = [];
      for (const unit of units) {
        if (unit.indexOf(square) !== -1) {
          unitsMap[square].push(unit);
        }
      }
    }

    return unitsMap;
  }

  static getPeersMap(squares: Squares, unitsMap: IUnitsMap): IPeersMap {
    const peersMap = {};

    for (const square of squares) {
      peersMap[square] = [];
      for (const units of unitsMap[square]) {
        for (const unit of units) {
          if (unit !== square && peersMap[square].indexOf(unit) === -1) {
            peersMap[square].push(unit);
          }
        }
      }
    }

    return peersMap;
  }
}
