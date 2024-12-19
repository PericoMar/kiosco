import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app-config';
import { Observable } from 'rxjs';
import { Printer } from '../../interfaces/printer';
import { SnackbarService } from '../snackBar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {

  readonly PRINTERS_KEY = 'printers';

  constructor(private http : HttpClient,
    private snackbarService: SnackbarService
  ) { }

  getPrintersObservable(cliente_id: number) : Observable<any[]> {
    return this.http.get<any[]>(`${AppConfig.API_URL}/impresoras/${cliente_id}`)
  }

  get printers(): Printer[] {
    return JSON.parse(localStorage.getItem(this.PRINTERS_KEY) || '[]');
  }

  set printers(printers: Printer[]) {
    localStorage.setItem(this.PRINTERS_KEY, JSON.stringify(printers));
  }

  addPrinter(printer: Printer): void {
    this.printers = [...this.printers, printer];
    this.addPrinterObservable(printer).subscribe({
      next: () => {
        this.snackbarService.openSnackBar(`Impresora añadida correctamente`, 'Cerrar', 3000, ['custom-snackbar', 'success-snackbar']);
      },
      error: (error) => {
        console.error('Error al añadir impresora', error);
      }
    })
  }

  addPrinterObservable(printer: Printer): Observable<any> {
    return this.http.post(`${AppConfig.API_URL}/impresora`, {...printer});
  }

  printTicket(order: any): Observable<any> {
    return this.http.post(`${AppConfig.API_URL}/print-receipt`, {...order} );
  }

}
