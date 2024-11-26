import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Verificar si localStorage está disponible
  if (typeof localStorage !== 'undefined') {
    const roles = localStorage.getItem('userRoles');
    if (roles?.includes('ORGANIZADOR') && route.url[0].path === 'usuarios') {
      return true;
    } else if (roles?.includes('USUARIO') && route.url[0].path === 'inicio') {
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