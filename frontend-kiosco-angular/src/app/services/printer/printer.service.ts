import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {

  constructor(private http : HttpClient) { }

  printTicket(order: any): Observable<any> {
    return this.http.post(`${AppConfig.API_URL}/print-receipt-text`, {...order} );
  }
}
