import { Component, inject, Input ,Output,EventEmitter,ViewChild,SimpleChanges} from '@angular/core';
import { EventoApiService } from '../../core/services/evento-api.service';
import { Evento, FechaEvento } from '../../models/evento';
import { CommonModule,DatePipe } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { EventoFormularioComponent } from '../evento-formulario/evento-formulario.component';
import { BotonEditarComponent } from '../boton-editar/boton-editar.component';
import { AppConstants } from '../app-constants';
import { BotonDetalleComponent } from '../boton-detalle/boton-detalle.component';
import { EventoDetalleComponent } from '../evento-detalle/evento-detalle.component';
import { BotonAsistenciaComponent } from '../boton-asistencia/boton-asistencia.component';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { StringifyPipe } from '../pipes/stringify.pipe';

@Component({
  selector: 'app-evento-tabla',
  standalone: true,
  imports: [StringifyPipe,RouterLink,CommonModule,PaginationComponent,EventoFormularioComponent,BotonEditarComponent,BotonDetalleComponent,EventoDetalleComponent,BotonAsistenciaComponent,DatePipe],
  templateUrl: './evento-tabla.component.html',
  styleUrl: './evento-tabla.component.css'
})
export class EventoTablaComponent {
   @Input() idOrName="";
   eventos:Evento[]=[]; // los eventos que voy a mostrar en la tabla, el comp pagination me lo emite
   totalRegistros=0;// el total de eventos q hay en la DB, a este valor me lo proporciona el componente pagination
   
   //funciones q le paso al paginado para q me traiga los eventos paginados o segun el input del search
   funcionPagina=(limit: number, offset: number) => this.eventoApi.getEventosPag(limit, offset);
   funcionPagina2!: (limit: number, offset: number) => Observable<any>;
   
   eliminar=false;//  al eliminar, el paginado tiene q cambiar
   LIMIT=AppConstants.LIMIT_TABLA_EVENTOS;
   readonly PAGES_CANTIDADxGRUPO=3;
   
   rtaEdicion=""
   yaSeEdito=false;
   fechaActual= new Date(); 
   
   eventoSeleccionado?: Evento;
   indiceEditar=0;
   
   
   private eventoApi=inject(EventoApiService);

   ngOnChanges(changes: SimpleChanges) {
         if (changes['idOrName']) {
             this.funcionPagina = !this.idOrName
                                  ?(limit: number, offset: number) => this.eventoApi.getEventosPag(limit, offset)
                                  : (limit: number, offset: number) => this.eventoApi.getEventoByIdOrName(this.idOrName,limit, offset) ;
         }
   }
 
  // this.emitirArrPaginado.emit({arregloRegistrosPorPag:[],totalRegistros:0});
  // el componente pagination me va a emitir el arreglo de eventos, los se van a mostrar en la tabla
  // y me emite el total de registros , el total de eventos que hay en la DB
  recibirEventos({ arregloRegistrosPorPag, totalRegistros }: { arregloRegistrosPorPag: any[], totalRegistros: number }) {
   this.totalRegistros=totalRegistros;
   this.eventos = arregloRegistrosPorPag;
   while (this.eventos.length % this.LIMIT !== 0) {
         this.eventos.push(null as any);
   }
} 


   
   OnBorrarEventoLogico(index:number){
          this.eventoApi.borrarEventoLogico(this.eventos[index].id).subscribe({
            next:(rta)=>{
               this.eventos[index]=null as any;
               this.eliminar=!this.eliminar;
           
            },
            error:(error)=>{
               console.log("error",error)
               
            }
           })  
   }
 
    // el componente , el botón ...  emite cuando le hacen click
   // entonces tengo que mostrar el modal con la información del evento que se seleccionó
   
   settearEventoSeleccionado(index:number){  
      this.eventoSeleccionado ={...this.eventos[index]}
      this.indiceEditar=index;
   }

   
 



   btnAsistenciaClickeada(index:number){
      this.eventoSeleccionado =this.eventos[index]
   }


   isFechaActual(fechaEvento:string): boolean {
      fechaEvento=new FechaEvento(fechaEvento).fechaString;
      const fechaActual=new FechaEvento(this.fechaActual.toISOString()).fechaString;
      return fechaEvento === fechaActual;
      }


      escucharYaSeEdito(evento:Evento | string){
         this.yaSeEdito=true
         this.eventoSeleccionado=this.eventos[this.indiceEditar];
         if(typeof evento==="string")
          this.rtaEdicion=evento+"❌"
         else{
             this.eventos[this.indiceEditar] = evento;
             
             this.rtaEdicion="Evento editado ✔"
         }
     
      }
      cerrarModal() {
         this.yaSeEdito=false
         }
      
}
