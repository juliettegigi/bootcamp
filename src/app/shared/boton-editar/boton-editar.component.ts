import { Component,Input ,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { EventoFormularioComponent } from '../evento-formulario/evento-formulario.component';

@Component({
  selector: 'app-boton-editar',
  standalone: true,
  imports: [EventoFormularioComponent],
  templateUrl: './boton-editar.component.html',
  styleUrl: './boton-editar.component.css'
})
export class BotonEditarComponent {
  @Input() modal_data_bs_target="";
  @Output() onEditarEvento= new EventEmitter<void>();

  onEditar(){
    this.onEditarEvento.emit();
  }
}
