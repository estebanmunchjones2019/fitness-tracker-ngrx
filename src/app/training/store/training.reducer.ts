import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as TrainingActions from './training.actions';
import { Exercise } from '../exercise.model';
import { AppState } from 'src/app/store/app.reducer';

export interface TrainingState {
    availableExercises: Exercise[];
    finishedExercises: Exercise[];
    runningExercise: Exercise;
}

export interface State extends AppState {
    training: TrainingState;
}
//the AppState doesn't include the trining slice until the module is lazyloaded

const initialState: TrainingState = {
    availableExercises: [],
    finishedExercises: [],
    runningExercise: null,
}

export function trainingReducer(state = initialState, action: TrainingActions.TrainingActions) {
    switch(action.type) {
        case TrainingActions.SET_AVAILABLE_EXERCISES:
            return {
                ...state,
                availableExercises: [...action.payload]
            }
        case TrainingActions.SET_FINISHED_EXERCISES:
            return {
                ...state,
            finishedExercises: [...action.payload]
            }
        case TrainingActions.START_TRAINING:
            const selectedId = action.payload;
            const runningExercise = [...state.availableExercises].find(exercise => selectedId == exercise.id);
            return {
                ...state,
            runningExercise: {...runningExercise}
            }
        case TrainingActions.STOP_TRAINING:
            return {
                ...state,
                runningExercise: null,
            }
        default:
            return {
                ...state
            }
    }
}

export const getTrainingState  = createFeatureSelector<TrainingState>('training')
export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getRunningExercise = createSelector(getTrainingState, (state: TrainingState) => state.runningExercise);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.runningExercise != null);