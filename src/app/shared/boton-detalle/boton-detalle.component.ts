import { Component , Output,EventEmitter ,Input} from '@angular/core';

import { Evento } from '../../models/evento';

@Component({
  selector: 'app-boton-detalle',
  standalone: true,
  imports: [],
  templateUrl: './boton-detalle.component.html',
  styleUrl: './boton-detalle.component.css'
})
export class BotonDetalleComponent {
  @Input() modal_data_bs_target="";
  @Output() emitirDetalleClickeado= new EventEmitter<void>();

  onDetalle(){
    this.emitirDetalleClickeado.emit();
  }
}
