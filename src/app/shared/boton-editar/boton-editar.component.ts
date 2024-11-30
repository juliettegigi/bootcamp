import { Component,Input ,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-boton-editar',
  standalone: true,
  imports: [],
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
