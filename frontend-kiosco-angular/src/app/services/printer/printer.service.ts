import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {

  constructor(private http : HttpClient) { }

  printTicket(order: any){
    return this.http.post(`${AppConfig.API_URL}/print-receipt`, order);
  }
}
