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
  activeSection =""
  onSeleccionado(strr:string) {
    console.log(strr)
    this.activeSection =strr
    this.emitirSeleccionado.emit(strr);
  }
}
