import { Component ,Input, Output,EventEmitter} from '@angular/core';
import { Evento } from '../../models/evento';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-evento-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-evento-detalle.component.html',
  styleUrl: './usuario-evento-detalle.component.css'
})
export class UsuarioEventoDetalleComponent {
  @Input() idModal="";
  @Input() isModalVisible=false;
  @Input() evento?: Evento;
  @Output() emitirCerrar=new EventEmitter<void>();


  cerrarModal(){
    this.emitirCerrar.emit();
  }
}
