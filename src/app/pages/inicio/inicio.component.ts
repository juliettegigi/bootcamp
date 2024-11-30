import {inject, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Evento } from '../../models/evento';
import { Usuario } from '../../models/usuario';
import { UsuarioApiService } from '../../core/services/usuario-api.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {


    
  tieneRolUsuario = false;

  constructor(private router: Router) {
    // Verifica si estamos en el entorno del navegador
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      // Accede a localStorage solo si está disponible en el navegador
      const userRoles = localStorage.getItem('userRoles');
      if (userRoles) {
        try {
          // Asegúrate de que 'userRoles' sea un string JSON válido
          const roles = JSON.parse(userRoles);
          this.tieneRolUsuario = roles.some((role: { rol: string; }) => role.rol === 'USUARIO');
        } catch (error) {
          console.error('Error al parsear los roles del usuario:', error);
        }
      }
    }
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