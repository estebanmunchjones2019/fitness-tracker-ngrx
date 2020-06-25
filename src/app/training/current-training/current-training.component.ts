import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingService } from '../training.service';
import * as fromTraining from '../store/training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  timer;
  
  constructor(public dialog: MatDialog,
              private trainingService: TrainingService,
              private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.initTimer();
  } 

  initTimer() {
    this.store.select(fromTraining.getRunningExercise).pipe(take(1)).subscribe(exercise => {
      const step = exercise.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer); 
        }
      }, step)
    }) 
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, 
      { 
        width: '250px',
        data: {progress: this.progress} 
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.initTimer();  
      }
    });
  }

}
