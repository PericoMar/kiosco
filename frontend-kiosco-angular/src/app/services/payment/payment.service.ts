import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModalComponent } from '../../components/modals/payment-modal/payment-modal.component';
import { PrinterService } from '../printer/printer.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from '../../../config/app-config';
import { Router } from '@angular/router';
import { AlertModalComponent } from '../../components/modals/alert-modal/alert-modal.component';
import { OrderService } from '../order.service';
import { KioskService } from '../kiosk/kiosk.service';
import { Dataphone } from '../../interfaces/dataphone';
import { UserService } from '../user/user.service';
import { DataphoneModalComponent } from '../../pages/layouts/management-panel/modals/dataphone-modal/dataphone-modal.component';
import { DeleteModalComponent } from '../../pages/layouts/management-panel/modals/delete-modal/delete-modal.component';
import { SnackbarService } from '../snackBar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  readonly DATAPHONE_KEY = 'dataphones';

  readonly MILISECONDS_TIMEOUT = 100000;
  readonly MILISECONDS_POLLING = 1000;

  public statusMessages: Record<string, string> = {
    Timeout: 'El tiempo de espera ha sido superado. Por favor, reinicie el proceso. Si el problema persiste, acuda a caja.',
    Captured: 'El pago se completó con éxito.',
    Declined: 'El pago fue denegado. Por favor, intente de nuevo.',
    Expired: 'La conexión con el datafono se ha perdido durante la transacción. Por favor, vaya a caja y pida una verfificación manual en el datafono de que se ha completado la operación.',
    Canceled: 'El pago fue cancelado.',
    SignatureVerificationRequired: 'Se requiere verificación de firma. Para pagar con tarjeta acuda a la caja.',
    Unauthorized: 'No se ha podido establecer conexión con el terminal de pago (Conexión no autorizada). Por favor, acuda a caja.',
    '404': 'La conexión con el terminal de pago no se ha podido establecer, puede que este ocupado, apagado o la conexión no esté bien establecida. Por favor, acuda a caja.'
  };

  constructor(
    private dialog: MatDialog,
    private printerService: PrinterService,
    private orderService: OrderService,
    private http: HttpClient,
    private router: Router,
    private kioscoService: KioskService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) { }

  private dataphoneChangedSource = new Subject<any>();
  dataphoneChanged$ = this.dataphoneChangedSource.asObservable();

  emitDataphoneChange(changes: any): void {
    this.dataphoneChangedSource.next(changes);
  }

  getDataphonesObservable(cliente_id: number) : Observable<Dataphone[]> {
    return this.http.get<Dataphone[]>(`${AppConfig.API_URL}/datafonos/${cliente_id}`)
  }

  get dataphones(): Dataphone[] {
      return JSON.parse(localStorage.getItem(this.DATAPHONE_KEY) || '[]');
    }
  
  set dataphones(dataphones: Dataphone[]) {
    localStorage.setItem(this.DATAPHONE_KEY, JSON.stringify(dataphones));
  }

  getDataphoneById(id: number): Dataphone {
    return this.dataphones.find((dataphone) => dataphone.id === id)!;
  }

  addDataphoneObservable(dataphone: Dataphone): Observable<any> {
    dataphone.cliente_id = this.userService.clienteId;
    return this.http.post(`${AppConfig.API_URL}/datafono`, {...dataphone});
  }

  addDataphone(dataphone: Dataphone): void {
    this.dataphones = [...this.dataphones, dataphone];
  }

  updateDataphoneObservable(dataphone: Dataphone): Observable<any> {
    return this.http.put(`${AppConfig.API_URL}/datafono/${dataphone.id}`, {...dataphone});
  }

  updateDataphone(dataphone: Dataphone): void {
    this.deleteDataphone(dataphone.id);
    this.addDataphone(dataphone);
  }

  deleteDataphoneObservable(id: number): Observable<any> {
    return this.http.delete(`${AppConfig.API_URL}/datafono/${id}`);
  }

  deleteDataphone(id: number): void {
    this.dataphones = this.dataphones.filter((dataphone) => dataphone.id !== id);
  }

  openDataphoneModal(dataphone: Dataphone): void {
    const dialogRef = this.dialog.open(DataphoneModalComponent, {
      width: '700px',
      data: { ...dataphone },
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if(result.reload){
        this.emitDataphoneChange({ type: 'dataphone' });
      }
    });
  }

  openDeleteDataphoneModal(dataphone: Dataphone): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '500px',
      data: { productType: 'Datafono', name: dataphone.nombre, id: dataphone.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDataphone(dataphone.id);

        this.deleteDataphoneObservable(dataphone.id).subscribe({
          next: () => {
            this.emitDataphoneChange({ type: 'dataphone' });
            this.snackbarService.openSnackBar(`Datafono eliminado correctamente`, 'Cerrar', 3000, ['custom-snackbar', 'success-snackbar']);
          },
          error: (error) => {
            console.error('Error al eliminar datafono', error);
          }
        });
      }
    });
  }

  getDataphonesData(): any[] {
    return this.dataphones.map((dataphone) => {
      return {
        id : dataphone.id,
        nombre : dataphone.nombre,
        num_serie : dataphone.num_serie,
        TID : dataphone.TID,
        estado : dataphone.estado ? 'Habilitado' : 'Deshabilitado',
        zona: dataphone.zona,
        descripcion : dataphone.descripcion ? dataphone.descripcion : 'Sin descripción',
        supervisor : dataphone.supervisor,
        devoluciones : Number(dataphone.devoluciones) == 1 ? 'Devoluciones' : 'Cobros',
        type: 'datafono'
      }
    });
  }

  dataphoneToString(id: number): string {
    const dataphone = this.getDataphoneById(id);
    // Si no tiene o numero de serie o nombre no debe aparecer el guion
    if(!dataphone) return 'Sin datáfono';

    return dataphone.num_serie && dataphone.nombre ? `${dataphone.nombre} - ${dataphone.num_serie}` : dataphone.nombre || dataphone.num_serie || 'Sin datáfono';
  }

  openCardPaymentModal(): void {
    if(this.orderService.totalPrice > AppConfig.MINIMUM_CARD_AMOUNT){
      const dialogRef = this.dialog.open(PaymentModalComponent, {
        width: '626px',
        data: this.orderService.totalPrice,
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if(!result.canceled){
          if(result.success){
            this.printerService.printTicket({
              "id": 12345,
              "items": [
                {
                  "type": "product",
                  "quantity": 2,
                  "details": {
                    "id": "prod-001",
                    "name": "Hamburguesa Clásica",
                    "price": 5.99,
                    "taxes": 0.50,
                    "img": "https://example.com/images/hamburguesa-clasica.jpg",
                    "familyId": "family-001",
                    "description": "Hamburguesa con lechuga, tomate y queso",
                    "customizations": [
                      {
                        "customizationQuestionId": "cust-001",
                        "name": "Nivel de cocción",
                        "responses": [
                          {
                            "id": "option-001",
                            "value": "Bien cocida",
                            "price": 0
                          }
                        ]
                      },
                      {
                        "customizationQuestionId": "cust-002",
                        "name": "Salsa",
                        "responses": [
                          {
                            "id": "option-002",
                            "value": "Con ketchup",
                            "price": 0.25
                          }
                        ]
                      }
                    ]
                  }
                },
                {
                  "type": "product",
                  "quantity": 1,
                  "details": {
                    "id": "prod-002",
                    "name": "Patatas Fritas",
                    "price": 2.99,
                    "taxes": 0.30,
                    "img": "https://example.com/images/patatas-fritas.jpg",
                    "familyId": "family-002",
                    "description": "Patatas fritas crujientes",
                    "customizations": []
                  }
                }
              ],
              "total": 15.02,
              "date": "2024-09-26T14:30:00Z",
              "consumptionOption": "Para llevar",
              "paymentMethod": "Tarjeta"
          }).subscribe({
              next: (response) => {
                console.log('Ticket impreso:', response);
              },
              error: (error) => {
                console.error('Error al imprimir ticket:', error);
              }
            })
            this.router.navigate(['/kiosco', this.kioscoService.num_serie, 'confirm-page']);
          } else {
            const message = this.statusMessages[result.status] || 'Ha ocurrido un error.';
            this.openAlertModal({ msg: message, status: result.status, data: result.data, terminalSessionId: result.terminalSessionId });
          }
        }
      });
    } else {  
      const message = 'Seleccione algún producto antes de pagar.';
      this.openAlertModal({ msg: message, status: 'Error', data: null, terminalSessionId: '' });
    }
  }

  openAlertModal(data : { msg: string, status: string, data: any, terminalSessionId: string }): void {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      width: '626px',
      data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(retry => {
      if (retry) {
        this.openCardPaymentModal();
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
            } else if (['Declined', 'Expired', 'Canceled', 'SignatureVerificationRequired', '404'].includes(response.status.toString())) {
              clearInterval(interval);
              observer.error({ status: response.status, data: response }); // Emitimos el estado
            }
          },
          error: (error) => {
            clearInterval(interval);
            observer.error({ status: 'Error', data: error }); // Emitimos un error genérico
          },
        });
      }, this.MILISECONDS_POLLING);
  
      setTimeout(() => {
        clearInterval(interval);
        observer.error({ status: 'Timeout' }); // Error de tiempo agotado
      }, this.MILISECONDS_TIMEOUT);
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

  cancelPayment(terminalSessionId : string): Observable<any> {
    return this.http.put(`${AppConfig.API_URL}/payment/${terminalSessionId}/cancel`, {})
  }

  signatureVerfication(terminalSessionId: string, accepted: boolean): Observable<any> {
    return this.http.put(`${AppConfig.API_URL}/payment/signature-verification/${terminalSessionId}`, { accepted })
  }

  getTerminalSessionStatus(terminalSessionId: string): Observable<any> {
    return this.http.get(`${AppConfig.API_URL}/payment/status/${terminalSessionId}`)
  }

}
