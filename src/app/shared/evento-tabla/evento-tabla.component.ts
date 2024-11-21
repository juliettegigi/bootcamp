import { Component, inject, Input ,Output,EventEmitter,ViewChild,SimpleChanges} from '@angular/core';
import { EventoApiService } from '../../core/services/evento-api.service';
import { Evento } from '../../models/evento';
import { CommonModule,DatePipe } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { EventoFormularioComponent } from '../evento-formulario/evento-formulario.component';
import { BotonEditarComponent } from '../boton-editar/boton-editar.component';
import { AppConstants } from '../app-constants';
import { BotonDetalleComponent } from '../boton-detalle/boton-detalle.component';
import { EventoDetalleComponent } from '../evento-detalle/evento-detalle.component';
import { BotonAsistenciaComponent } from '../boton-asistencia/boton-asistencia.component';
import { UsuarioApiService } from '../../core/services/usuario-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-evento-tabla',
  standalone: true,
  imports: [CommonModule,PaginationComponent,EventoFormularioComponent,BotonEditarComponent,BotonDetalleComponent,EventoDetalleComponent,BotonAsistenciaComponent,DatePipe],
  templateUrl: './evento-tabla.component.html',
  styleUrl: './evento-tabla.component.css'
})
export class EventoTablaComponent {
   @Input() totalEventos=0;
   @Input() idOrName="";
   @Output() emitirAsistenciaPorEvento = new EventEmitter<Evento>();
   eventos:Evento[]=[];
   fechaActual= new Date(); 
   yaSeEdito=false;

   private usuarioApi=inject(UsuarioApiService);

   
      



   LIMIT=AppConstants.LIMIT_TABLA_EVENTOS;
  readonly PAGES_CANTIDADxGRUPO=3;
  eventoSeleccionado?: Evento;
  indiceEditar=0;
  private eventoApi=inject(EventoApiService);
  funcionPagina=(limit: number, offset: number) => this.eventoApi.getEventosPag(limit, offset);
  funcionPagina2!: (limit: number, offset: number) => Observable<any>;

                           ngOnChanges(changes: SimpleChanges) {
                              if (changes['idOrName']) {
                              this.funcionPagina = !this.idOrName?(limit: number, offset: number) => this.eventoApi.getEventosPag(limit, offset)
                              : (limit: number, offset: number) => this.eventoApi.getEventoByIdOrName(this.idOrName,limit, offset) ;
                              }
                              }
                              

 


   
   OnBorrarEventoLogico(index:number){
          this.eventoApi.borrarEventoLogico(this.eventos[index].id).subscribe({
            next:(rta)=>{
               console.log(rta)
               this.eventos.splice(index, 1)
               this.totalEventos--;
            },
            error:(error)=>{
               console.log("error",error)
               
            }
           })  
   }
 
   settearEventoSeleccionado(index:number){  
      this.eventoSeleccionado =this.eventos[index]
      //acá tengo q hacer la funcion del paginado
   }

   escucharDetalleClickeado(index:number){  
      this.eventoSeleccionado =this.eventos[index]
      //acá tengo q hacer la funcion del paginado   
      this.funcionPagina2=(limit: number, offset: number) =>this.usuarioApi.getUsuariosConfirmados(this.eventoSeleccionado!.id,limit,offset);
      
   }

   recibirEventos(arr:Evento[]){
          this.eventos=arr;
            while(this.eventos.length%this.LIMIT!==0){
            this.eventos.push(null as any)
            console.log("a verrr... ",this.eventos[this.eventos.length-1])
          }  
   }

   btnAsistenciaClickeada(index:number){
      this.eventoSeleccionado =this.eventos[index]
      this.emitirAsistenciaPorEvento.emit(this.eventoSeleccionado)
   }


   isFechaActual(fechaEvento:string): boolean {
      const fechaEventoFormateada = new Date(fechaEvento).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
      console.log(fechaEventoFormateada);
      return fechaEventoFormateada === this.fechaActual.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
      }


      escucharYaSeEdito(){
            this.yaSeEdito=true
      }
      cerrarModal() {
         this.yaSeEdito=false
         console.log("me ejecuto?")
         }
      
}
