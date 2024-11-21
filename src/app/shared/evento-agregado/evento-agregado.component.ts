import { Component,Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-evento-agregado',
  standalone: true,
  imports: [],
  templateUrl: './evento-agregado.component.html',
  styleUrl: './evento-agregado.component.css'
})
export class EventoAgregadoComponent {
 
  @Output() agregarOtroEvento = new EventEmitter<void>();

  onAgregarOtro() {
    this.agregarOtroEvento.emit();  // Emitir evento para volver a mostrar el formulario
  }

}
