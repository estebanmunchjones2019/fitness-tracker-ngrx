import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Exercise } from './exercise.model';
import * as fromTraining from './store/training.reducer';
import * as TrainingActions from './store/training.actions';
import * as UiActions from '../shared/store/ui.actions';
import { UiService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  fsSubs: Subscription[] = [];

  constructor(private firestore: AngularFirestore,
              private store: Store<fromTraining.State>,
              private uiService: UiService) { }


  fetchAvailableExercises() {
    this.store.dispatch(new UiActions.StartLoading());
    this.fsSubs.push(
      this.firestore
      .collection('availableExercises')
      .snapshotChanges() 
      .pipe(
        map(docArray => {
          // throw(new Error('couldn get the data'))
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id, 
              ...doc.payload.doc.data() as {}
            } 
          })  
        })
      )
      .subscribe((exercises: Exercise[])  => {
        this.store.dispatch(new TrainingActions.SetAvailableExercises(exercises));
        this.store.dispatch(new UiActions.StopLoading());
      }, error => {
          this.uiService.openSnackBar(error.message);
          this.store.dispatch(new UiActions.StopLoading());
      }) 
    )
  }

  fetchFinishedExercises() {
    this.fsSubs.push(
      this.firestore.collection('exercises').valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new TrainingActions.SetFinishedExercises(exercises));
      })
    )
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new TrainingActions.StartTraining(selectedId));
  }

  completeExercise() { 
    this.playSound();
    this.store.select(fromTraining.getRunningExercise).pipe(take(1)).subscribe(exercise => {
      this.addToDatabase({
        ...exercise, 
        date: new Date().toString(), 
        state: 'completed'
      });
      this.store.dispatch(new TrainingActions.StopTraining());
    })
  }

  cancelExercise(progress: number) { 
    this.store.select(fromTraining.getRunningExercise).pipe(take(1)).subscribe(exercise => {
      const partialDuration = progress * exercise.duration / 100;
      const partialCalories = exercise.calories * progress / 100;
      this.addToDatabase({
        ...exercise, 
        duration: partialDuration,
        calories: partialCalories,
        date: new Date().toString(),
        state: 'cancelled'
      })
      this.store.dispatch(new TrainingActions.StopTraining());
    });
  }

  private addToDatabase(exercise: Exercise) {
    this.firestore.collection('exercises').add(exercise);
  }

  playSound() {
    var mp3Source = '<source src="/assets/alarm.mp3" type="audio/mpeg">';
    var embedSource = '<embed hidden="true" autostart="true" loop="false" src="/assets/alarm.mp3">';
    document.getElementById("sound").innerHTML='<audio autoplay="autoplay">' + mp3Source + embedSource + '</audio>';
  } 

  cancelExercisesSubs() {
    this.fsSubs.forEach(subs => {
      subs.unsubscribe();
    })
  }

}
