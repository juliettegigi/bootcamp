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
  activeSection = "";
  tieneRolUsuario = false;

  constructor() {
    // Verifica si estamos en el entorno del navegador
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      // Accede a localStorage solo si está disponible en el navegador
      const userRoles = localStorage.getItem('userRoles');
      if (userRoles) {
        try {
          // Asegúrate de que 'userRoles' sea un string JSON válido
          const roles = JSON.parse(userRoles);
          this.tieneRolUsuario = roles.some((role: { rol: string; }) => role.rol === 'USUARIO');
        } catch (error) {
          console.error('Error al parsear los roles del usuario:', error);
        }
      }
    }
  }

  onSeleccionado(strr: string) {
    this.activeSection = strr;
    this.emitirSeleccionado.emit(strr);
  }
}