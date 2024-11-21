import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioNavBarComponent } from '../../shared/usuario-nav-bar/usuario-nav-bar.component';
import { UsuarioTablaComponent } from '../../shared/usuario-tabla/usuario-tabla.component';
import { UsuarioTablaMisEventosComponent } from '../../shared/usuario-tabla-mis-eventos/usuario-tabla-mis-eventos.component';
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
  


  recibirSeleccionado(item: string) {
     this.seleccion = item;
   
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  

}
