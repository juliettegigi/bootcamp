import {inject, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { EventoSearchComponent } from '../../shared/evento-search/evento-search.component';
import { EventoTablaComponent } from '../../shared/evento-tabla/evento-tabla.component';
import { EventoAsistenciaComponent } from '../../shared/evento-asistencia/evento-asistencia.component';
import { Evento } from '../../models/evento';
import { Usuario } from '../../models/usuario';
import { EventoFormularioComponent } from '../../shared/evento-formulario/evento-formulario.component';
import { UsuarioApiService } from '../../core/services/usuario-api.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NavBarComponent,EventoSearchComponent,EventoTablaComponent,EventoAsistenciaComponent,EventoFormularioComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  seleccion="";
  usuariosPorEvento?:Usuario[];
  idOrName=""
  evento?:Evento;
  
  constructor(private router: Router) {}
  private usuarioApi=inject(UsuarioApiService);


  recibirSeleccionado(item: string) {
     this.seleccion = item;
   
  }


  /* recibo el input y se lo paso al otro componente, a la tabla */

recibirInput( idOrName:string ) {
  this.idOrName=idOrName;
}

recibirEventoAsistencia(evento:Evento){
      this.seleccion="asistencia"
      this.evento=evento;
      
}
logOut(): void {
  
  this.usuarioApi.logOut().subscribe({
    next:(rta)=>{
      localStorage.clear();
      this.router.navigate(['/']);
    },
    error:(error)=>{
       console.log("error",error)
       
    }
   })  
  
}

​}