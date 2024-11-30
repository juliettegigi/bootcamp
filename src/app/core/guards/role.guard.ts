import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TieneRol } from '../services/tiene-rol.service';





export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tieneRol = inject(TieneRol);

  const roles = tieneRol.getUserRoles();

  if (roles.some((element) => element.rol === 'ORGANIZADOR') && route.url[0]?.path === 'inicio') {
    return true;
  } else if (roles.some((element) => element.rol === 'USUARIO') && route.url[0]?.path === 'usuarios') {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};