import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModalComponent } from '../../components/modals/payment-modal/payment-modal.component';
import { PrinterService } from '../printer/printer.service';
import { HttpClient } from '@angular/common/http';
import { last, Observable } from 'rxjs';
import { AppConfig } from '../../../config/app-config';
import { Router } from '@angular/router';
import { Order } from '../../interfaces/pedido';
import { AlertModalComponent } from '../../components/modals/alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public statusMessages: Record<string, string> = {
    Captured: 'El pago se completó con éxito.',
    Declined: 'El pago fue denegado. Por favor, intente de nuevo.',
    Expired: 'La sesión de pago ha expirado. Por favor, reinicie el proceso.',
    Canceled: 'El pago fue cancelado.',
    SignatureVerificationRequired: 'Se requiere verificación de firma. Para pagar con tarjeta acuda a la caja.',
    Unauthorized: 'No se ha podido establecer conexión con el terminal de pago. Por favor, acuda a caja.',
  };

  constructor(
    private dialog: MatDialog,
    private printerService: PrinterService,
    private http: HttpClient,
    private router: Router
  ) { }

  openCardPaymentModal(amount: any): void {
    const dialogRef = this.dialog.open(PaymentModalComponent, {
      width: '626px',
      data: amount,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.cancel) {
        this.cancelPayment().subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.error(error);
          }
        });
      }

      if(result.success){
        this.router.navigate(['/confirm-page']);
      } else {
        const message = this.statusMessages[result.status] || 'Ha ocurrido un error desconocido.';
        const alertDialogRef = this.dialog.open(AlertModalComponent, {
          width: '626px',
          data: { msg: message, status: result.status, data: result.data },
          disableClose: true
        });

        alertDialogRef.afterClosed().subscribe(retry => {
          if (retry) {
            this.openCardPaymentModal(amount);
          }
        });
      }
    });
  }

  pollTerminalSession(terminalSessionId: string): Observable<any> {
    return new Observable((observer) => {
      const interval = setInterval(() => {
        this.getTerminalSessionStatus(terminalSessionId).subscribe({
          next: (response: any) => {
            console.log('Mensaje de estado:', response.status);
            console.log('Estado de la sesión:', response);
            if (response.status === 'Captured') {
              clearInterval(interval);
              observer.next({ status: 'Captured', data: response }); // Emitimos el estado
              observer.complete();
            } else if (['Declined', 'Expired', 'Canceled', 'SignatureVerificationRequired'].includes(response.status)) {
              clearInterval(interval);
              observer.error({ status: response.status, data: response }); // Emitimos el estado
            }
          },
          error: (error) => {
            clearInterval(interval);
            observer.error({ status: 'Error', data: error }); // Emitimos un error genérico
          },
        });
      }, 2000);
  
      setTimeout(() => {
        clearInterval(interval);
        observer.error({ status: 'Timeout' }); // Error de tiempo agotado
      }, 60000);
    });
  }
  

  handleFinalResponse(response: any): void {
    if (response) {
      console.log('Última respuesta enviada:', response);
    } else {
      console.log('No se obtuvo una respuesta válida antes de finalizar.');
    }
  }

  payWithCard(amount: number): Observable<any> {
    return this.http.post(`${AppConfig.API_URL}/payment/`, { amount })
  }

  cancelPayment(): Observable<any> {
    return this.http.post(`${AppConfig.API_URL}/payment/cancel`, {})
  }

  getTerminalSessionStatus(terminalSessionId: string): Observable<any> {
    return this.http.get(`${AppConfig.API_URL}/payment/status/${terminalSessionId}`)
  }
}
