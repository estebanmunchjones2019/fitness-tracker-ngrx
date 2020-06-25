import { Injectable } from '@angular/core';
import { Router, Route, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  constructor(private router: Router,
              private store: Store<fromApp.AppState>) { }

  canLoad(route: Route): 
  boolean 
  | Promise<boolean> 
  | Observable<boolean> {
    return this.store.select(fromApp.getAuth)
    .pipe(
      take(1),
      map(isAuth => {
        if (isAuth) {
          return true;
        } else {
          this.router.navigate(['/login']);
          // UrlTree can't be used
        }
      })
    )
  }
} 
