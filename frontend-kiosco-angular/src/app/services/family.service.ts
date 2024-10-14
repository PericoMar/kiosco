import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Family } from '../interfaces/family';
import { AppConfig } from '../../config/app-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  public families!: Family[];

  constructor(private http: HttpClient) {
  }

  getFamiliesObservable(): Observable<Family[]> {
    return this.http.get<Family[]>(`${AppConfig.API_URL}/familias`);
  }

  getFamilyById(id: string): Family | undefined {
    return this.families.find((family) => family.id == id);
  }

  getFirstFamilyId(): string {
    return this.families[0].id;
  }
}
