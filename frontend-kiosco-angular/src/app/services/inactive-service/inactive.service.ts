import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private timeout: any;
  private readonly inactivityTime: number = 30000; // Tiempo de inactividad en milisegundos (1 minuto en este caso)

  constructor(private router: Router) {
    this.resetInactivityTimer();
    this.setupEventListeners();
  }

  // Configurar los eventos que reinician el temporizador
  private setupEventListeners() {
    const events = ['mousemove', 'keydown', 'click', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, () => this.resetInactivityTimer());
    });
  }

  // Resetear el temporizador de inactividad
  private resetInactivityTimer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.logoutUser(), this.inactivityTime);
  }

  // Redirigir al usuario o finalizar el pedido por inactividad
  private logoutUser() {
    alert('Inactividad detectada. Finalizando el pedido.');
    this.router.navigate(['/inactive']); // Redirige a la página principal o acción deseada
  }
}
