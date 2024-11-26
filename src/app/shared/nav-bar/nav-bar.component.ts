import { Component , EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @Output() emitirSeleccionado = new EventEmitter<string>();
  activeSection =""
  tieneRolUsuario=localStorage.getItem('userRoles')?.includes('USUARIO');
  onSeleccionado(strr:string) {
    this.activeSection =strr
    this.emitirSeleccionado.emit(strr);
  }

}
