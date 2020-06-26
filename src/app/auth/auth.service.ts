import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth} from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { UiService } from '../shared/ui.service';
import * as fromApp from '../store/app.reducer';
import * as UiActions from '../shared/store/ui.actions';
import * as AuthActions from './store/auth.actions';
import { TrainingService } from '../training/training.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  public initAuthListenerSubs: Subscription;
  
  constructor(private router: Router,
              private fireAuth: AngularFireAuth,
              private uiService: UiService,
              private store: Store<fromApp.AppState>,
              private trainingService: TrainingService) { }

  initAuthListener() {
    this.initAuthListenerSubs = this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new AuthActions.SetAuthenticated());
        this.router.navigate(['/training']);
        this.store.dispatch(new UiActions.StopLoading())
      } else {
        this.trainingService.cancelExercisesSubs();
        this.store.dispatch(new AuthActions.SetUnauthenticated());
        this.router.navigate(['/']);
      }
    })
  }

  cancelAuthListenerSubs() {
    if (this.initAuthListenerSubs) {
      this.initAuthListenerSubs.unsubscribe();
    } 
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UiActions.StartLoading)
    this.fireAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(user => {
    })
    .catch(error => {
      this.store.dispatch(new UiActions.StopLoading())
      this.uiService.openSnackBar(error.message);
    })
  }

  login(authData: AuthData) {
    this.store.dispatch(new UiActions.StartLoading)
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password) 
    .then(user => {
    })
    .catch(error => {
      this.store.dispatch(new UiActions.StopLoading())
      this.uiService.openSnackBar(error.message);
    }) 
  } 

  logout() {
    this.fireAuth.signOut();
  }

} 
