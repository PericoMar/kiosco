import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {

  public printers: any[] = [
    {
      id: "1",
      name: "Platos frios",
      address: "192.213.432.232",
      location: "Cocina"
    },
    {
      id: "2",
      name: "Bebidas",
      address: "XP-80C",
      location: "Barra"
    },
    {
      id: "3",
      name: "Platos calientes",
      address: "124.432.432.123",
      location: "Planchas"
    },
    {
      id: "4",
      name: "Horno",
      address: "129.432.423.342",
      location: "Horno"
    }
  ];

  constructor(private http : HttpClient) { }

  printTicket(order: any): Observable<any> {
    return this.http.post(`${AppConfig.API_URL}/print-receipt-text`, {...order} );
  }
}
