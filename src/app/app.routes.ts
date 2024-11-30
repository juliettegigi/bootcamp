import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { roleGuard } from './core/guards/role.guard';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { authGuard } from './core/guards/auth.guard';
import { OrgListaEventosComponent } from './pages/org-lista-eventos/org-lista-eventos.component';
import { OrgAddEventoComponent } from './pages/org-add-evento/org-add-evento.component';
import { OrgEventoAsistenciaComponent } from './pages/org-evento-asistencia/org-evento-asistencia.component';
import { UProxEventosComponent } from './pages/u-prox-eventos/u-prox-eventos.component';
import { UMisEventosComponent } from './pages/u-mis-eventos/u-mis-eventos.component';

export const routes: Routes = [
    {   path:'inicio',component:InicioComponent, 
        canActivate: [authGuard,roleGuard], 
        children: [  { path: 'listaEventos', component: OrgListaEventosComponent },
                     { path: 'agregarEvento', component:OrgAddEventoComponent },
                     { path: 'asistencia', component:OrgEventoAsistenciaComponent },
        ],
    },
    {   path:'usuarios',component:UsuarioComponent, 
        canActivate: [authGuard,roleGuard],
        children: [  { path: 'proxEventos', component: UProxEventosComponent },
                     { path: 'misEventos', component:UMisEventosComponent},
         ],
    },
    {path:'',component:LoginComponent, pathMatch:'full'},

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}