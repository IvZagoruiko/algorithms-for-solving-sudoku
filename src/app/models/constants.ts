import {SudokuHelper} from './sudoku-helper';

export const SIZE = 9;
export const EMPTY_SQUARE = '0';
export const DIGITS = '123456789';
export const ROWS = 'ABCDEFGHI';
export const COLS = DIGITS;
export const SQUARES = SudokuHelper.cross(ROWS, COLS);
export const UNITS_MAP = SudokuHelper.getUnitsMap(ROWS, COLS, SQUARES);
export const PEERS_MAP = SudokuHelper.getPeersMap(SQUARES, UNITS_MAP);
export const COMPLEXITY = {
  Easy : 50,
  Medium : 22,
  Hard : 17
};


