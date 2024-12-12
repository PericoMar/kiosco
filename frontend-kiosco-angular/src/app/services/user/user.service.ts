import { Injectable } from '@angular/core';
import { UserWithoutPassword } from '../../interfaces/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USER_KEY = 'currentUser'; // Clave de almacenamiento en localStorage

  private CLIENTE_ID_KEY = 'clienteId'; // Clave de almacenamiento en localStorage

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<UserWithoutPassword> {
    return this.http.post<UserWithoutPassword>(`${AppConfig.API_URL}/login`, { username, password });
  }

  // Método para guardar los datos del usuario en localStorage
  saveUser(user: UserWithoutPassword): void {
    const userString = JSON.stringify(user);
    localStorage.setItem(this.USER_KEY, userString);
  }

  // Método para obtener los datos del usuario de localStorage
  getUser(): UserWithoutPassword | null {
    const userString = localStorage.getItem(this.USER_KEY);
    if (userString) {
      return JSON.parse(userString); // Si el usuario existe, lo devuelve parseado
    }
    return null; // Si no hay usuario guardado
  }

  // Método para eliminar al usuario de localStorage
  removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  // Método para verificar si hay un usuario registrado
  isUserLoggedIn(): boolean {
    return localStorage.getItem(this.USER_KEY) !== null;
  }

  get clienteId(): any {
    const user = this.getUser();
    if (user) {
      return user.cliente_id;
    }
    return localStorage.getItem(this.CLIENTE_ID_KEY);
  }

  set clienteId(clienteId: any) {
    localStorage.setItem(this.CLIENTE_ID_KEY, clienteId);
  }
}
