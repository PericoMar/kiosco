import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isUserLoggedIn()) {
    return true; // Permitir acceso si está autenticado
  } else {
    router.navigate(['/login']); // Redirigir al login si no está autenticado
    return false; // Bloquear acceso
  }
};
