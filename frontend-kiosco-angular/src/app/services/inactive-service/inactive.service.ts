import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenService } from '../screen/screen.service';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private timeout: any;
  private readonly inactivityTime: number = 30000; // Tiempo de inactividad
  private isActive: boolean = true; // Flag para habilitar/deshabilitar

  constructor(private router: Router,
    private screenService: ScreenService
  ) {
    this.setupEventListeners();
  }

  // Habilitar la detección de inactividad
  enableInactivity() {
    this.isActive = true;
    this.resetInactivityTimer();
  }

  // Deshabilitar la detección de inactividad
  disableInactivity() {
    this.isActive = false;
    clearTimeout(this.timeout);
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
    if (!this.isActive) return; // Si no está habilitado, no hacer nada
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.logoutUser(), this.inactivityTime);
  }

  // Redirigir o finalizar el pedido por inactividad
  private logoutUser() {
    if (!this.isActive) return;
    this.router.navigate(['/inactive']);
  }
}

