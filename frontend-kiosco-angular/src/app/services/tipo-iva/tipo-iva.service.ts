import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoIvaService {

  public tiposIva: any[] = [
    {
      id: "1",
      name: "21%",
    },
    {
      id: "2",
      name: "10.5%",
    },
    {
      id: "3",
      name: "27%",
    }
  ];

  constructor(private http : HttpClient) { }

  getTiposIva() {
    return this.http.get('http://localhost:3000/tipo-iva');
  }
}
