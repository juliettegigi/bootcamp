import {inject, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Evento } from '../../models/evento';
import { Usuario } from '../../models/usuario';
import { UsuarioApiService } from '../../core/services/usuario-api.service';
import { TieneRol } from '../../core/services/tiene-rol.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {


    
  tieneRolUsuario = false;

  constructor(private router: Router, private tieneRol:TieneRol) {
    this.tieneRolUsuario= this.tieneRol.hasRole('USUARIO')
 }

  seleccion="";
  usuariosPorEvento?:Usuario[];
  idOrName=""
  evento?:Evento;
  
  
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