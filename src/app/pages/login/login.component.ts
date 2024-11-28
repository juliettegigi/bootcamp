import { Component} from '@angular/core';// importo inject
import { FormIniciarSesionComponent } from '../../shared/form-iniciar-sesion/form-iniciar-sesion.component';
import { RegistroComponent } from '../../shared/registro/registro.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormIniciarSesionComponent,RegistroComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 iniciarSesion=true;
 alert=false

 ngOnInit(){

   console.log("LOGUIN GUARD")
 }
}
