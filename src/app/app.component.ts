import {Component} from '@angular/core';
import {SudokuService} from './services/sudoku.service';
import {COMPLEXITY} from './models/constants';

const PUZZLE = [
  [0, 0, 3, 0, 0, 8, 2, 0, 4],
  [0, 2, 0, 0, 6, 4, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 8],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 6, 9, 8, 0],
  [0, 0, 0, 0, 0, 0, 5, 0, 0],
  [0, 0, 4, 9, 0, 7, 0, 3, 0],
  [8, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 7, 0, 0, 5, 0, 4, 0, 0]
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public puzzle: number[][];
  public currLevel = COMPLEXITY.Hard;
  public complexity = COMPLEXITY;
  public complexityKeys = Object.keys(COMPLEXITY);

  constructor(private readonly sudoku: SudokuService) {
    this.puzzle = PUZZLE;
  }

  public generateSudoku() {
    this.puzzle = this.sudoku.generate(this.currLevel);
  }
}
