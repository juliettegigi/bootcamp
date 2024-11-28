import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { roleGuard } from './core/guards/role.guard';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path:'inicio',component:InicioComponent, pathMatch:'full',canActivate: [authGuard,roleGuard]},
    {path:'usuarios',component:UsuarioComponent, pathMatch:'full',canActivate: [authGuard,roleGuard]},
    {path:'',component:LoginComponent, pathMatch:'full'},

];
