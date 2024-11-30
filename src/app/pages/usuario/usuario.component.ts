import { Component,inject } from '@angular/core';

import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UsuarioApiService } from '../../core/services/usuario-api.service';
import { TieneRol } from '../../core/services/tiene-rol.service';
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
  
  constructor(private router: Router, private tieneRol:TieneRol) {
     this.tieneRolOrganizador= this.tieneRol.hasRole('ORGANIZADOR')
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
