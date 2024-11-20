import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModalComponent } from '../../components/modals/payment-modal/payment-modal.component';
import { PrinterService } from '../printer/printer.service';
import { HttpClient } from '@angular/common/http';
import { last, Observable } from 'rxjs';
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
      width: '626px',
      data: structuredClone(order),
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
      }
    });
  }

  pollTerminalSession(terminalSessionId: string): Observable<any> {
    return new Observable((observer) => {
      let lastResponse: any = null;

      const interval = setInterval(() => {
        this.getTerminalSessionStatus(terminalSessionId).subscribe({
          next: (response: any) => {
            console.log('Respuesta: ', response);
            lastResponse = response;

            if (response.status === 'Captured' && response.paymentDetails.message === 'SUCCESSFUL') {
              console.log('Condición cumplida:', response);
              clearInterval(interval); // Detenemos el polling
              observer.next(response); // Emitimos la respuesta al suscriptor
              observer.complete(); // Finalizamos el Observable
            }
          },
          error: (error) => {
            console.error('Error:', error);
            lastResponse = error;
            clearInterval(interval);
            observer.error(error); // Emitimos el error al suscriptor
          }
        });
      }, 2000); // Repetir cada 2 segundos

      // // Opción para finalizar tras un tiempo límite
      // setTimeout(() => {
      //   clearInterval(interval);

      //   // Si hubo alguna respuesta, la emitimos
      //   if (lastResponse) {
      //     observer.next(lastResponse); // Emitimos la última respuesta
      //   } else {
      //     observer.error(new Error('Tiempo de espera agotado sin respuesta válida'));
      //   }

      //   observer.complete(); // Cerramos el Observable
      // }, 20000); // Finalizar después de 20 segundos
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
