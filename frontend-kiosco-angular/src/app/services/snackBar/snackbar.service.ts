import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  defaultActionValue: string = 'Cerrar';
  defaultClassNames: string[] = ['custom-snackbar'];

  constructor(
    private snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string = this.defaultActionValue, duration:number = 3000, defaultClassNames = this.defaultClassNames): void {
    this.snackBar.open(message, action, {
      duration: duration, // Duración en milisegundos
      horizontalPosition: 'right', // Posición horizontal: start, center, end, left, right
      verticalPosition: 'bottom',  // Posición vertical: top, bottom
      panelClass: defaultClassNames
    })
  }
}