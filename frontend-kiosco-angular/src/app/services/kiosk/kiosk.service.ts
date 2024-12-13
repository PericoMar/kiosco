import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class KioskService {

  private KIOSCO_KEY = 'kiosco';

  constructor(private http: HttpClient) { }

  getKioscoByNumSerie(numSerie: string): any {
    return this.http.get(`${AppConfig.API_URL}/kiosko/${numSerie}`);
  }

  set kiosco(kiosco: any) {
    localStorage.setItem(this.KIOSCO_KEY, JSON.stringify(kiosco));
  }

  get kiosco(): any {
    const kioscoString = localStorage.getItem(this.KIOSCO_KEY);
    if (kioscoString) {
      return JSON.parse(kioscoString);
    }
    return null;
  }
}
