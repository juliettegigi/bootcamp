import { Component,Input,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Evento } from '../../models/evento';
import { PaginationComponent } from '../pagination/pagination.component';
import { Usuario, UsuarioMasPresenteYconfirmado } from '../../models/usuario';
import { UsuarioApiService } from '../../core/services/usuario-api.service';
import { AppConstants } from '../app-constants';
import { ParticipacionApiService } from '../../core/services/participacion-api.service';
import { EventoSearchComponent } from '../evento-search/evento-search.component';

@Component({
  selector: 'app-evento-asistencia',
  standalone: true,
  imports: [PaginationComponent,CommonModule,EventoSearchComponent],
  templateUrl: './evento-asistencia.component.html',
  styleUrl: './evento-asistencia.component.css'
})
export class EventoAsistenciaComponent {
  @Input() evento?:Evento;
  PAGES_CANTIDADxGRUPO=3;
  LIMIT=AppConstants.LIMIT_LISTA_USUARIOS;
  usuariosDelEvento?:UsuarioMasPresenteYconfirmado[];
  private usuarioApi=inject(UsuarioApiService);
  private participacionApi=inject(ParticipacionApiService);
  


  funcionPagina =(limit:number,offset:number)=> this.usuarioApi.getUsuariosPorEvento(this.evento!.id,limit,offset);
 
  recibirUsuarios({arregloRegistrosPorPag,totalRegistros,}: {arregloRegistrosPorPag: any[];totalRegistros: number;}){
    this.usuariosDelEvento=arregloRegistrosPorPag;
}

onSetPresente(usuarioId:number,index:number){

  this.participacionApi.setPresenteToggle(usuarioId,this.evento!.id).subscribe({
    next:(isOk:string)=>{
      if(this.usuariosDelEvento){
        this.usuariosDelEvento[index].isPresente.data[0]=this.usuariosDelEvento[index].isPresente.data[0]===0?1:0;
        }
    },
    error:(error)=>{
      console.log("error",error)
    }
})
}


reciboInputValue(inputValue:string){
  if(inputValue==""){
    this.funcionPagina =(limit:number,offset:number)=> this.usuarioApi.getUsuariosPorEvento(this.evento!.id,limit,offset);
  }
  else this.funcionPagina =(limit:number,offset:number)=> this.usuarioApi.getUsuariosPorEvento2(inputValue,this.evento!.id,limit,offset);
}
  
}
