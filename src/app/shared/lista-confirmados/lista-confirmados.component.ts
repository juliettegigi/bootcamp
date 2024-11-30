import { Observable } from 'rxjs';
import { Component,Input,} from '@angular/core';

import { PaginationComponent } from '../pagination/pagination.component';
import { Evento } from '../../models/evento';
import { Usuario } from '../../models/usuario';
import { AppConstants } from '../app-constants';

@Component({
  selector: 'app-lista-confirmados',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './lista-confirmados.component.html',
  styleUrl: './lista-confirmados.component.css'
})
export class ListaConfirmadosComponent {
  @Input() titulo=""
  @Input() evento?:Evento ;
  @Input() funcionPagina!: (limit: number, offset: number) => Observable<any>;
  totalRegistros=0;

  usuariosConfirmados:Usuario[] =[]
  PAGES_CANTIDADxGRUPO=3;
  LIMIT=AppConstants.LIMIT_LISTA_USUARIOS; 
  
  
 
  recibirUsuariosConfirmados({ arregloRegistrosPorPag, totalRegistros }: { arregloRegistrosPorPag: any[], totalRegistros: number }){
    this.usuariosConfirmados=arregloRegistrosPorPag;
    this.totalRegistros=totalRegistros
     while(this.usuariosConfirmados.length%this.LIMIT!=0){
      this.usuariosConfirmados.push(null as any)
    } 
}


}
