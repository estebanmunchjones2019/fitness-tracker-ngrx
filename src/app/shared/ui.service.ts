import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private _snackBar: MatSnackBar) { }
  
  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 5000,
      verticalPosition: 'top'
    });
  }
}
