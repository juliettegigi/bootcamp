import { Component ,inject} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule,DatePipe } from '@angular/common';
import { Evento } from '../../models/evento';
import { EventoApiService } from '../../core/services/evento-api.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { AppConstants } from '../app-constants';
import { ParticipacionApiService } from '../../core/services/participacion-api.service';
import { UsuarioEventoDetalleComponent } from '../usuario-evento-detalle/usuario-evento-detalle.component';

@Component({
  selector: 'app-usuario-tabla',
  standalone: true,
  imports: [DatePipe,PaginationComponent,CommonModule,UsuarioEventoDetalleComponent],
  templateUrl: './usuario-tabla.component.html',
  styleUrl: './usuario-tabla.component.css'
})


export class UsuarioTablaComponent {
  //trustedHtml: SafeHtml;
  isModalVisible = false; 
  eventos:Evento[]=[];
  private eventoApi=inject(EventoApiService);
  private participacionApi=inject(ParticipacionApiService);
  private userId = parseInt(localStorage.getItem('userId') || '0');
  registrado: { [key: number]: number } = {};
  confirmado: { [key: number]: number } = {};
  eventoSeleccionado?: Evento;
  /* para el paginado */
  LIMIT=AppConstants.LIMIT_TABLA_EVENTOS;
  readonly PAGES_CANTIDADxGRUPO=3;
  funcionPagina=(limit: number, offset: number) => this.eventoApi.getEventosProximos(limit, offset);
  recibirEventos(arr:Evento[]){
    this.eventos=arr;

    this.eventos.forEach(evento => {
      this.isRegistrado((evento.id));
      });

      while(this.eventos.length%this.LIMIT!==0){
      this.eventos.push(null as any)
    }  
  }


  onRegistrarme(eventoId:number,event:MouseEvent){
    event.stopPropagation();
    const participacionId=this.registrado[(eventoId)] ;
    if(participacionId !== 0){//eliminar
      
      this.participacionApi.eliminarParticipacion( participacionId ).subscribe({
        next:(rta)=>{
          this.registrado[(eventoId)]=0; 
        },
        error:(error)=>{
          console.log("error",error)
        }
    })
    }
    else{
             //if(this.registrado[eventoId] !== 0) return
             this.participacionApi.createParticipacion(this.userId,eventoId).subscribe({
               next:(participacionId:number)=>{
                 this.registrado[(eventoId)]=participacionId; 
               },
               error:(error)=>{
                 console.log("error",error)
               }
           })
    }
  }

 

  isRegistrado(eventoId: number) {
    this.participacionApi.isRegistrado(this.userId, eventoId).subscribe({
    next: (participacionId: number) => {
        this.registrado[eventoId] = participacionId;
       this.participacionApi.isConfirmado(participacionId).subscribe({
          next: (participacionId: number) => {
              this.confirmado[eventoId]=participacionId;
          },
          error: (error) => {
              this.confirmado[eventoId]=0;
          }
          });
        
    },
    error: (error) => {
        console.log("error", error);
        this.registrado[eventoId] = 0;
    }
    });
    }


  onConfirmarParticipacion(eventoId:number , event:MouseEvent){
    console.log("me ejecuto")
    event.stopPropagation()
     const participacionId=this.registrado[eventoId];
     this.participacionApi.setConfirmadoToggle(participacionId).subscribe({
      next: (rtaOk: string) => {
        this.confirmado[eventoId]=this.confirmado[eventoId]?0:1;
      },
      error: (error) => {
      console.log("error", error);
      this.confirmado[eventoId]=0;
      }
      });

  }


  setSeleccionado(evento:Evento){
    this.eventoSeleccionado=evento
  }

  abrirModal(): void {
  
    
  }
  mostrarModal() {
    console.log("me ejecuto")
    console.log( this.isModalVisible)
    
    this.isModalVisible = true; // Mostrar modal
  }

  cerrarModal() {
    this.isModalVisible = false; // Ocultar modal
  }

}
