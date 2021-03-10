import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatRadioModule} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from './app.component';
import {BacktrackingComponent} from './backtracking/backtracking.component';
import {ConstraintComponent} from './constraint/constraint.component';
import {SudokuService} from './services/sudoku.service';
import {ConstraintAlgorithm} from './services/constraint-algorithm.service';
import {BacktrackingAlgorithm} from './services/backtracking-algorithm.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BacktrackingComponent,
    ConstraintComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [SudokuService, BacktrackingAlgorithm, ConstraintAlgorithm],
  bootstrap: [AppComponent]
})
export class AppModule {
}
