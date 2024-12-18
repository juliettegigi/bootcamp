import { Component, inject,Input, SimpleChanges, Output ,EventEmitter} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { EventoApiService } from '../../core/services/evento-api.service';
import { EventoAgregadoComponent } from '../evento-agregado/evento-agregado.component';
import { Evento,FechaEvento } from '../../models/evento';
import { Iterador } from '../../utils/iterador';
import { isFechaPasada,fechaValida } from '../validators/custom-validators';


@Component({
  selector: 'app-evento-formulario',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,EventoAgregadoComponent,],
  templateUrl: './evento-formulario.component.html',
  styleUrl: './evento-formulario.component.css'
})


export class EventoFormularioComponent {
  @Input() isEditar=false; 
  @Input() evento?: Evento;
  @Output() emitirYaSeEdito= new EventEmitter<Evento | string>();
  
  private eventoApi=inject(EventoApiService);
  formulario=true;

  form=new FormGroup({nombre:new FormControl('',[ Validators.required, Validators.maxLength(50)]),
                      dia:new FormControl('',Validators.required),
                      mes:new FormControl('',Validators.required),
                      anio:new FormControl('',Validators.required),
                      ubicacion:new FormControl('',[ Validators.required,Validators.maxLength(50)]),
                      descripcion:new FormControl('',[ Validators.required, Validators.maxLength(6000)])
                     },
                     { validators: [isFechaPasada(), fechaValida()] }
                  )




                 
  ngOnChanges(changes: SimpleChanges) {
      if(changes['evento']) {
                      this.actualizarFormulario();
                      }
  }      
      
  get btnText() {
    return this.isEditar ? "Guardar Cambios" : "Agregar evento";
    
  }
   actualizarFormulario() {
    if (this.evento) {
    const fechaEvento = new FechaEvento(this.evento.fecha);
    this.form.patchValue({
    nombre: this.evento.nombre,
    dia: fechaEvento.dia.toString(),
    mes: fechaEvento.mes.toString(),
    anio: fechaEvento.anio.toString(),
    ubicacion: this.evento.ubicacion,
    descripcion: this.evento.descripcion
    });
    }
    } 

  get dia(){return this.form.get('dia')?.value}
  get mes(){return this.form.get('mes')?.value}
  get anio(){return this.form.get('anio')?.value}
  get nombre(){return this.form.get('nombre')?.value}
  get ubicacion(){return this.form.get('ubicacion')?.value}
  get descripcion(){return this.form.get('descripcion')?.value}
  get fecha(): string | null {
    const dia = this.form.get('dia')?.value;
    const mes = this.form.get('mes')?.value;
    const anio = this.form.get('anio')?.value;
    if (anio && mes && dia) {
      const diaFormateado = String(dia).padStart(2, '0'); 
      const mesFormateado = String(mes).padStart(2, '0'); 
      return `${anio}-${mesFormateado}-${diaFormateado}`;
    }
    return null;
  }
  // iterador que produce un rango de números
 dias=new Iterador(1,31)
 meses=new Iterador(1,12)
 fechaActual=new Date().getFullYear()
 anios=new Iterador(this.fechaActual,this.fechaActual+20)

  onSubmit(){
    if(!this.isEditar){
      this.eventoApi.postEvento( this.nombre || '',this.fecha || '',this.ubicacion || '', this.descripcion || '').subscribe({
               next:(idEvento)=>{
                    this.form.reset();
                    this.formulario=false;
               },
               error:(error)=>{
                  console.log("error",error)
                  
               }
              })  
      }
    else{

      this.eventoApi.editarEvento( this.evento!.id,this.nombre || '',this.fecha || '',this.ubicacion || '', this.descripcion || '').subscribe({
        next:(idEvento)=>{
             this.evento={id:this.evento!.id,nombre:this.nombre!,fecha:this.fecha!,ubicacion:this.ubicacion!,descripcion:this.descripcion!,isEliminado:this.evento!.isEliminado}
             this.emitirYaSeEdito.emit(this.evento);
        },
        error:(error)=>{
           console.log("error",error)
           this.emitirYaSeEdito.emit(error.error)
        }
       })  
    }

      
  }
}