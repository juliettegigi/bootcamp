import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

/* export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (typeof localStorage !== 'undefined') {
    const roles =  JSON.parse(localStorage.getItem('userRoles') ?? '[]');
    if (roles.some((element:{rol:string}) => element.rol === 'ORGANIZADOR') && route.url[0].path === 'inicio') {
      return true;
      } else if (roles.some((rol: { rol: string; }) => rol.rol === 'USUARIO') && route.url[0].path === 'usuarios') {
      return true;
      }
       else {
        localStorage.clear();
      router.navigate(['']);
      return false;
    }
  } else {
    router.navigate(['']);
    return false;
  }
}; */



export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
console.log("EN ROLE ")
  // Verifica si estamos en un entorno de navegador
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    // Accede a localStorage solo si está disponible en el navegador
    const roles = JSON.parse(localStorage.getItem('userRoles') ?? '[]');
    console.log('Roles obtenidos:', roles);
    console.log('Ruta solicitada:', route.url[0]?.path);

    if (roles.some((element: { rol: string }) => element.rol === 'ORGANIZADOR') && route.url[0]?.path === 'inicio') {
      return true;
    } else if (roles.some((rol: { rol: string }) => rol.rol === 'USUARIO') && route.url[0]?.path === 'usuarios') {
      return true;
    } else {
      router.navigate(['']);
      return false;
    }
  } else {
    // Si no estamos en un entorno de navegador, redirige
    router.navigate(['']);
    return false;
  }
};