import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { TrainingComponent } from './training.component';
import { SharedModule } from '../shared/shared.module';
import { StopTrainingComponent } from './current-training/stop-training/stop-training.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { trainingReducer } from './store/training.reducer';

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: '', component: TrainingComponent }
        ]),
        SharedModule,
        AngularFirestoreModule,
        StoreModule.forFeature('training', trainingReducer)
        //the slice 'training' is now linked tp trainingReducer
        //the scope if AngularFirestoreModule is all services provided in root and the components inside this module
        //if AngularFirestoreModule intended to use in another component, must be imported in the respective module
    ]
})

export class TrainingModule  { } 