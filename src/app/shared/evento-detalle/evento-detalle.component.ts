import { Component, Input,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConstants } from '../app-constants';
import { ListaConfirmadosComponent } from "../lista-confirmados/lista-confirmados.component";
import { Evento } from '../../models/evento';
import { UsuarioApiService } from '../../core/services/usuario-api.service';

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
@Input() funcionPagina=(limit: number, offset: number) =>this.usuarioApi.getUsuariosConfirmados(this.evento!.id,limit,offset);
private usuarioApi=inject(UsuarioApiService);
total=0;
LIMIT=AppConstants.LIMIT_LISTA_USUARIOS;







}
