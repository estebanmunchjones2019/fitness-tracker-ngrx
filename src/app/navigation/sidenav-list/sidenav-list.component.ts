import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/auth/auth.service';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavToggled = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  
  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromApp.getAuth);
  }

  toggleSidenav() {
    this.sidenavToggled.emit();
  }

  onLogout() {
    this.authService.logout();
    this.toggleSidenav();
  }

}
