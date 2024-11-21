import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-boton-asistencia',
  standalone: true,
  imports: [],
  templateUrl: './boton-asistencia.component.html',
  styleUrl: './boton-asistencia.component.css'
})
export class BotonAsistenciaComponent {
  @Input() disabled=true;
  @Output() emitirAsistenciaClickeada= new EventEmitter<void>();

  emitirAsistencia() {
    this.emitirAsistenciaClickeada.emit();
  }
}
