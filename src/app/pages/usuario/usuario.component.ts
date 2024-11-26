import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioNavBarComponent } from '../../shared/usuario-nav-bar/usuario-nav-bar.component';
import { UsuarioTablaComponent } from '../../shared/usuario-tabla/usuario-tabla.component';
import { UsuarioTablaMisEventosComponent } from '../../shared/usuario-tabla-mis-eventos/usuario-tabla-mis-eventos.component';
import { UsuarioApiService } from '../../core/services/usuario-api.service';
@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [UsuarioNavBarComponent,UsuarioTablaComponent,UsuarioTablaMisEventosComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  seleccion="";

  
  constructor(private router: Router) {}
  private usuarioApi=inject(UsuarioApiService);


  recibirSeleccionado(item: string) {
     this.seleccion = item;
   
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
