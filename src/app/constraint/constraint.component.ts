import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ConstraintAlgorithm} from '../services/constraint-algorithm.service';

@Component({
  selector: 'app-constraint',
  templateUrl: './constraint.component.html',
  styleUrls: ['./constraint.component.scss']
})
export class ConstraintComponent implements OnChanges {
  @Input()
  public puzzle: number[][];
  public state: number[][];
  public time: number;

  constructor(private readonly constraintAlgorithm: ConstraintAlgorithm) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.initState();
  }

  public initState(): void {
    this.state = this.puzzle.map(subArr => subArr.map(val => val));
    this.time = 0;
  }

  public solve(): void {
    const board = this.state.map(row => row.join('')).join('');
    const start = Date.now();
    this.state = this.constraintAlgorithm.solve(board);

    this.time = Date.now() - start;
  }
}
