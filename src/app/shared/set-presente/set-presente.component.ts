import { Component,inject,Input } from '@angular/core';
import { UsuarioApiService } from '../../core/services/usuario-api.service';
import { Evento } from '../../models/evento';
import { Usuario } from '../../models/usuario';
import { AppConstants } from '../app-constants';
import { ParticipacionApiService } from '../../core/services/participacion-api.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-set-presente',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './set-presente.component.html',
  styleUrl: './set-presente.component.css'
})
export class SetPresenteComponent {
  @Input() evento: Evento | null = null;
  @Input() usuarios:Usuario[]=[];
  total:number=0;
  PAGES_CANTIDADxGRUPO=3;
  LIMIT=AppConstants.LIMIT_LISTA_USUARIOS; 
  
  private usuarioApi=inject(UsuarioApiService);
  private participacionApi=inject(ParticipacionApiService);
  
  funcionPagina = (limit: number, offset: number) => { 
    return this.usuarioApi.getUsuariosPorEvento(this.evento!.id,limit,offset);
  }

  setPresente(usuarioId:number, event: any) {
         if(this.evento)
               this.participacionApi.setPresenteToggle(usuarioId,this.evento.id);
    }

}
