import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioApiService } from '../services/usuario-api.service';
import { map } from 'rxjs/operators';


export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const usuarioApi = inject(UsuarioApiService);
    
    return usuarioApi.isAuth().pipe(
             map((rta) => {
                  if (rta) {
                  return true;
                  } else {
                    localStorage.clear();
                  router.navigate(['']);
                  return false;
                  }
                  })
    );
};
    
