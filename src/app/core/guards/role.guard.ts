import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';





export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const roles = JSON.parse(localStorage.getItem('userRoles') ?? '[]');

    if (roles.some((element: { rol: string }) => element.rol === 'ORGANIZADOR') && route.url[0]?.path === 'inicio') {
      return true;
    } else if (roles.some((rol: { rol: string }) => rol.rol === 'USUARIO') && route.url[0]?.path === 'usuarios') {
      return true;
    } else {
      router.navigate(['']);
      return false;
    }
  } else {
    router.navigate(['']);
    return false;
  }
};