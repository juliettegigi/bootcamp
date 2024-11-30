import { Component ,inject} from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';

import { Evento } from '../../models/evento';
import { EventoApiService } from '../../core/services/evento-api.service';


import { ParticipacionApiService } from '../../core/services/participacion-api.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { UsuarioEventoDetalleComponent } from '../../shared/usuario-evento-detalle/usuario-evento-detalle.component';
import { AppConstants } from '../../shared/app-constants';

@Component({
  selector: 'app-u-mis-eventos',
  standalone: true,
  imports: [UsuarioEventoDetalleComponent,DatePipe,PaginationComponent,CommonModule],
  templateUrl: './u-mis-eventos.component.html',
  styleUrl: './u-mis-eventos.component.css'
})
export class UMisEventosComponent {

  eventos:Evento[]=[];
  private eventoApi=inject(EventoApiService);
  private participacionApi=inject(ParticipacionApiService);
  private userId = parseInt(localStorage.getItem('userId') ?? '', 10);
  eventoSeleccionado?: Evento;


  /* para el paginado */
  
  LIMIT=AppConstants.LIMIT_TABLA_EVENTOS;
  readonly PAGES_CANTIDADxGRUPO=3;
  funcionPagina=(limit: number, offset: number) => this.eventoApi.getEventosByUsuarioIsPresente(this.userId,limit,offset);
 
  recibirEventos({ arregloRegistrosPorPag, totalRegistros }: { arregloRegistrosPorPag: any[], totalRegistros: number }){
    this.eventos=arregloRegistrosPorPag;  
      while(this.eventos.length%this.LIMIT!==0){
      this.eventos.push(null as any)
    }  
  }

  setSeleccionado(evento:Evento){
    this.eventoSeleccionado=evento
  }


  onDescargarPDF(evento: Evento,event: any): void {
    event.stopPropagation();
   this.participacionApi.generarPDF(evento.id).subscribe({
    next: (blob:Blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Certificado.pdf';
      link.click();
    },
    error: (error) => {
    console.log("error", error);
    }
    });
  }
}
