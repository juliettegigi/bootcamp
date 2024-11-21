import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { roleGuard } from './core/guards/role.guard';
import { UsuarioComponent } from './pages/usuario/usuario.component';

export const routes: Routes = [
    {path:'',component:LoginComponent, pathMatch:'full'},
    {path:'inicio',component:InicioComponent, pathMatch:'full',canActivate: [roleGuard]},
    {path:'usuarios',component:UsuarioComponent, pathMatch:'full',canActivate: [roleGuard]},

];
