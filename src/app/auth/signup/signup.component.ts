import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  isLoading$: Observable<boolean>;
 
  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>) {
   }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.isLoading$ = this.store.select(fromApp.getIsLoading);
  }  

  onSubmit(f: NgForm) {
    const authData: AuthData = {
      email: f.value.email,
      password: f.value.password
    }
    this.authService.registerUser(authData);
  }

}
