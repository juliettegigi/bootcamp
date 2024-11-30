import { Component,inject } from '@angular/core';

import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UsuarioApiService } from '../../core/services/usuario-api.service';
@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  tieneRolOrganizador=false
  private usuarioApi=inject(UsuarioApiService);
  
  constructor(private router: Router) {
    // Verifica si estamos en el entorno del navegador
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      // Accede a localStorage solo si está disponible en el navegador
      const userRoles = localStorage.getItem('userRoles');
      if (userRoles) {
        try {
          // Asegúrate de que 'userRoles' sea un string JSON válido
          const roles = JSON.parse(userRoles);
          this.tieneRolOrganizador = roles.some((role: { rol: string; }) => role.rol === 'ORGANIZADOR');
        } catch (error) {
          console.error('Error al parsear los roles del usuario:', error);
        }
      }
    }
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


 
  
  



}
