import { Injectable } from '@angular/core';
import { AlertModalComponent } from '../../components/modals/alert-modal/alert-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private dialog: MatDialog
  ) { }

  openAlertModal(msg:string): void {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      width: '626px',
      data: { msg, paymentAlert: false},
      disableClose: true
    });
  }
}
