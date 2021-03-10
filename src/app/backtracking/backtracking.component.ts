import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BacktrackingAlgorithm} from '../services/backtracking-algorithm.service';

@Component({
  selector: 'app-backtracking',
  templateUrl: './backtracking.component.html',
  styleUrls: ['./backtracking.component.scss']
})
export class BacktrackingComponent implements OnChanges {
  @Input()
  public puzzle: number[][];
  public state: number[][];
  public time: number;

  constructor(private readonly backtracking: BacktrackingAlgorithm) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.initState();
  }

  public initState(): void {
    this.state = this.puzzle.map(subArr => subArr.map(val => val));
    this.time = 0;
  }

  public startSolving(): void {
    const start = Date.now();
    this.state = this.backtracking.solve(this.state);
    this.time = Date.now() - start;
  }
}


