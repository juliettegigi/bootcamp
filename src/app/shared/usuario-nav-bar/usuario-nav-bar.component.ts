import { Component , EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-usuario-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './usuario-nav-bar.component.html',
  styleUrl: './usuario-nav-bar.component.css'
})
export class UsuarioNavBarComponent {
  @Output() emitirSeleccionado = new EventEmitter<string>();

  onSeleccionado(strr:string) {
    this.emitirSeleccionado.emit(strr);
  }
}
