import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  public groups: any[] = [
    {
      id: "1",
      name: "Escoge tu salsa",
    },
    {
      id: "2",
      name: "Selecciona el punto de la carne",
    },
    {
      id: "3",
      name: "Selecciona el pan",
    },
    {
      id: "4",
      name: "Escoge tu postre favorito",
    }
  ];

  constructor(private http: HttpClient) {
    
  }

  getGroupsObservable(): Observable<any[]> {
    return this.http.get<any[]>(`${AppConfig.API_URL}/preguntas`);
  }

}
