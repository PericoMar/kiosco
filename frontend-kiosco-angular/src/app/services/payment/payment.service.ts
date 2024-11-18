import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModalComponent } from '../../components/modals/payment-modal/payment-modal.component';
import { PrinterService } from '../printer/printer.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private dialog: MatDialog,
    private printerService: PrinterService,
    private http: HttpClient
  ) { }

  openCardPaymentModal(order: any): void {
    const dialogRef = this.dialog.open(PaymentModalComponent, {
      width: '700px',
      data: structuredClone(order)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }

  payWithCard(order: any): Observable<any> {
    return this.http.post(`${AppConfig.DOJO_API_URL}/payment`, order)
  }
}
