import { Component ,inject} from '@angular/core';
import { Router } from '@angular/router';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { EventoSearchComponent } from '../../shared/evento-search/evento-search.component';
import { EventoTablaComponent } from '../../shared/evento-tabla/evento-tabla.component';
import { EventoApiService } from '../../core/services/evento-api.service';
import { SetPresenteComponent } from '../../shared/set-presente/set-presente.component';
import { EventoAsistenciaComponent } from '../../shared/evento-asistencia/evento-asistencia.component';
import { Evento } from '../../models/evento';
import { Usuario } from '../../models/usuario';
import { EventoFormularioComponent } from '../../shared/evento-formulario/evento-formulario.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [SetPresenteComponent,NavBarComponent,EventoSearchComponent,EventoTablaComponent,EventoAsistenciaComponent,EventoFormularioComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  seleccion="";
  usuariosPorEvento?:Usuario[];
  idOrName=""
  evento?:Evento;
  private eventoApi=inject(EventoApiService);
  
  constructor(private router: Router) {}
  


  recibirSeleccionado(item: string) {
     this.seleccion = item;
   
  }


recibirInput( idOrName:string ) {
  this.idOrName=idOrName;
}

recibirEventoAsistencia(evento:Evento){
      this.seleccion="asistencia"
      this.evento=evento;
      // llamada a la api
}
logOut(): void {
  localStorage.clear();
  this.router.navigate(['/']);
}

​}