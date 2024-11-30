import { Component,inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { EventoSearchComponent } from '../../shared/evento-search/evento-search.component';
import { Evento } from '../../models/evento';
import { UsuarioApiService } from '../../core/services/usuario-api.service';
import { ParticipacionApiService } from '../../core/services/participacion-api.service';
import { AppConstants } from '../../shared/app-constants';
import { UsuarioMasPresenteYconfirmado } from '../../models/usuario';

@Component({
  selector: 'app-org-evento-asistencia',
  standalone: true,
  imports: [PaginationComponent,CommonModule,EventoSearchComponent],
  templateUrl: './org-evento-asistencia.component.html',
  styleUrl: './org-evento-asistencia.component.css'
})
export class OrgEventoAsistenciaComponent {
  evento?:Evento;
  PAGES_CANTIDADxGRUPO=3;
  LIMIT=AppConstants.LIMIT_LISTA_USUARIOS;
  usuariosDelEvento?:UsuarioMasPresenteYconfirmado[];
  private usuarioApi=inject(UsuarioApiService);
  private participacionApi=inject(ParticipacionApiService);
  funcionPagina!: (limit: number, offset: number) => Observable<any>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['data']) {
        this.evento = JSON.parse(params['data']);
        this.funcionPagina =(limit:number,offset:number)=> this.usuarioApi.getUsuariosPorEvento(this.evento!.id,limit,offset);
      }
    });
  }
  


 
 
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
