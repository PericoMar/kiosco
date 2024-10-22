import { Injectable } from '@angular/core';
import { UserWithoutPassword } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userKey = 'currentUser'; // Clave de almacenamiento en SessionStorage

  constructor() { }

  // Método para guardar los datos del usuario en SessionStorage
  saveUser(user: UserWithoutPassword): void {
    const userString = JSON.stringify(user);
    sessionStorage.setItem(this.userKey, userString);
  }

  // Método para obtener los datos del usuario de SessionStorage
  getUser(): UserWithoutPassword | null {
    const userString = sessionStorage.getItem(this.userKey);
    if (userString) {
      return JSON.parse(userString); // Si el usuario existe, lo devuelve parseado
    }
    return null; // Si no hay usuario guardado
  }

  // Método para eliminar al usuario de SessionStorage
  removeUser(): void {
    sessionStorage.removeItem(this.userKey);
  }

  // Método para verificar si hay un usuario registrado
  isUserLoggedIn(): boolean {
    return sessionStorage.getItem(this.userKey) !== null;
  }
}
