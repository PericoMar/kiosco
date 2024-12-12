import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config/app-config';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  // public groups: any[] = [
  //   {
  //     id: "1",
  //     name: "Escoge tu salsa",
  //   },
  //   {
  //     id: "2",
  //     name: "Selecciona el punto de la carne",
  //   },
  //   {
  //     id: "3",
  //     name: "Selecciona el pan",
  //   },
  //   {
  //     id: "4",
  //     name: "Escoge tu postre favorito",
  //   }
  // ];

  constructor(private http: HttpClient,
    private userService: UserService
  ) {
    
  }

  private GROUPS_LOCAL_STORAGE_KEY = 'groups';

  keyExists(key: string = 'groups'): boolean {
    return localStorage.getItem(key) !== null;
  }

  get groups(): any[] {
    return JSON.parse(localStorage.getItem(this.GROUPS_LOCAL_STORAGE_KEY) || '[]');
  }

  set groups(groups: any[]) {
    localStorage.setItem(this.GROUPS_LOCAL_STORAGE_KEY, JSON.stringify(groups));
  }

  getGroupsObservable(): Observable<any[]> {
    return this.http.get<any[]>(`${AppConfig.API_URL}/preguntas/${this.userService.clienteId}`);
  }

  addGroupToLocalStorage(group: any): void{
    this.groups = [...this.groups, group];
  }

  deleteGroupFromLocalStorage(id: string): void {
    this.groups = this.groups.filter(group => group.id !== id);
  }

}
