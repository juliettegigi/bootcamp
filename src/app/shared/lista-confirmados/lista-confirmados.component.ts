import { Observable } from 'rxjs';
import { Component,Input,inject,SimpleChanges} from '@angular/core';

import { PaginationComponent } from '../pagination/pagination.component';
import { Evento } from '../../models/evento';
import { Usuario } from '../../models/usuario';
import { AppConstants } from '../app-constants';
import { UsuarioApiService } from '../../core/services/usuario-api.service';

@Component({
  selector: 'app-lista-confirmados',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './lista-confirmados.component.html',
  styleUrl: './lista-confirmados.component.css'
})
export class ListaConfirmadosComponent {
  @Input() evento?:Evento ;
  @Input() funcionPagina!: (limit: number, offset: number) => Observable<any>;

  usuariosConfirmados:Usuario[] =[]
  total:number=0;
  PAGES_CANTIDADxGRUPO=3;
  LIMIT=AppConstants.LIMIT_LISTA_USUARIOS; 
  
  
 
  recibirUsuariosConfirmados({ arregloRegistrosPorPag, totalRegistros }: { arregloRegistrosPorPag: any[], totalRegistros: number }){
    this.usuariosConfirmados=arregloRegistrosPorPag;
    while(this.usuariosConfirmados.length%this.LIMIT!=0){
      this.usuariosConfirmados.push(null as any)
    }
}


}
