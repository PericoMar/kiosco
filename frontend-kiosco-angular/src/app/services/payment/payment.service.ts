import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModalComponent } from '../../components/modals/payment-modal/payment-modal.component';
import { PrinterService } from '../printer/printer.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config/app-config';
import { Router } from '@angular/router';
import { Order } from '../../interfaces/pedido';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private dialog: MatDialog,
    private printerService: PrinterService,
    private http: HttpClient,
    private router: Router
  ) { }

  openCardPaymentModal(order: any): void {
    const dialogRef = this.dialog.open(PaymentModalComponent, {
      width: '500px',
      data: structuredClone(order)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }

  payWithCard(order: Order): Observable<any> {
    return this.http.post(`${AppConfig.DOJO_API_URL}/payment`, order)
  }
}
