import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Verificar si localStorage está disponible
  if (typeof localStorage !== 'undefined') {
    const role = localStorage.getItem('userRole');
    if (role === 'USUARIO' && route.url[0].path === 'usuarios') {
      return true;
    } else if (role === 'ORGANIZADOR' && route.url[0].path === 'inicio') {
      return true;
    } else {
      router.navigate(['']);
      return false;
    }
  } else {
    // Manejar el caso en que localStorage no esté disponible
    router.navigate(['']);
    return false;
  }
};