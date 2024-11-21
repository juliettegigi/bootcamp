import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { ListaConfirmadosComponent } from "../lista-confirmados/lista-confirmados.component";
import { Evento } from '../../models/evento';

@Component({
  selector: 'app-evento-detalle',
  standalone: true,
  imports: [CommonModule, ListaConfirmadosComponent],
  templateUrl: './evento-detalle.component.html',
  styleUrl: './evento-detalle.component.css'
})
export class EventoDetalleComponent {
@Input() idModal="";
@Input() evento?: Evento;
@Input() funcionPagina!: (limit: number, offset: number) => Observable<any>;

total=0;
LIMIT=AppConstants.LIMIT_LISTA_USUARIOS;







}
