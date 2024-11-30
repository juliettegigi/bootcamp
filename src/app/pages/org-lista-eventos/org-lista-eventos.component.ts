import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventoTablaComponent } from '../../shared/evento-tabla/evento-tabla.component';
import { EventoSearchComponent } from '../../shared/evento-search/evento-search.component';
import { UsuarioApiService } from '../../core/services/usuario-api.service';

@Component({
  selector: 'app-org-lista-eventos',
  standalone: true,
  imports: [EventoSearchComponent,EventoTablaComponent],
  templateUrl: './org-lista-eventos.component.html',
  styleUrl: './org-lista-eventos.component.css'
})
export class OrgListaEventosComponent {

  idOrName=""
  
  constructor(private router: Router) {}
  private usuarioApi=inject(UsuarioApiService);


 


  /* recibo el input y se lo paso al otro componente, a la tabla */

recibirInput( idOrName:string ) {
  this.idOrName=idOrName;
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
