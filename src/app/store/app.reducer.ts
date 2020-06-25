import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from '../shared/store/ui.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromTraining from '../training/store/training.reducer';

export interface AppState {
    ui: fromUi.State,
    auth: fromAuth.State
}


export const appReducer: ActionReducerMap<AppState> = {
    ui: fromUi.uiReducer,
    auth: fromAuth.authReducer
}

export const getUiState = createFeatureSelector<fromUi.State>('ui'); //getUiState holds the ui slice
export const getIsLoading = createSelector(getUiState, fromUi.getIsloading);// getIsLoading gets the isLoading boolean inside the slice

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getAuth = createSelector(getAuthState, fromAuth.getAuth);

export const getTrainingState = createFeatureSelector<fromTraining.TrainingState>('training');
export const getAvailableExercises = createSelector(getTrainingState, fromTraining.getAvailableExercises);
export const getFinishedExercises = createSelector(getTrainingState, fromTraining.getFinishedExercises);
export const getRunningExercise = createSelector(getTrainingState, fromTraining.getRunningExercise);