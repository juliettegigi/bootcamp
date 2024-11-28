import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioApiService } from '../services/usuario-api.service';
import { map } from 'rxjs/operators';


export const authGuard: CanActivateFn = (route, state) => {
    console.log("EN AUTH ")
    const router = inject(Router);
    const usuarioApi = inject(UsuarioApiService);
    
    return usuarioApi.isAuth().pipe(
             map((rta) => {
                console.log("RESPUESTAA  ----> ",rta)
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
    
