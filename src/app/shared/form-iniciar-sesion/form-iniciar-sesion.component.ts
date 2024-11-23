import { Component,inject,Output,EventEmitter} from '@angular/core';// importo inject
import { FormControl, FormGroup, ReactiveFormsModule,  Validators} from '@angular/forms';
import { Router } from '@angular/router'; 
import { UsuarioApiService } from '../../core/services/usuario-api.service';

@Component({
  selector: 'app-form-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-iniciar-sesion.component.html',
  styleUrl: './form-iniciar-sesion.component.css'
})
export class FormIniciarSesionComponent {
  @Output() emitirRegistro = new EventEmitter<boolean>();

  private router = inject(Router); // Inyecta Router para dedirigir
  private usuarioApi=inject(UsuarioApiService);
  isRegistrameClickeado=false
  errorMsg: boolean = false;


  form = new FormGroup({ email: new FormControl('', [ Validators.required, Validators.email]),
                         password:new FormControl('',[Validators.required]),
                         password2:new FormControl(''),
                         nombre:new FormControl('')
  });
   
  get email(){ return this.form.get('email'); }
  get password(){ return this.form.get('password'); }
  get password2(){ return this.form.get('password2'); }
  get nombre(){ return this.form.get('nombre'); }


 /*  ngOnInit(){
    localStorage.clear();
  } */

    onSubmit(){
      this.form.markAllAsTouched();
      const email = this.email?.value || ''; 
      const password = this.password?.value || '';
     this.usuarioApi.auth(email,password).subscribe({
      next:(response)=>{
        //si tiene varios roles hacerle elegir
           const rol = response.roles[0].rol;
           localStorage.setItem('userRole',rol);
           localStorage.setItem('userId',response.usuario.id.toString());
           
          // const cookie = document.cookie;
          // localStorage.setItem('sessionCookie', cookie); 
           if(rol=='USUARIO')
              this.router.navigate(['usuarios']);
           else if(rol=='ORGANIZADOR')
                     this.router.navigate(['inicio']);
                else this.router.navigate(['']);
      },
      error:(error)=>{
         console.log("error",error)
         this.errorMsg=true
      }
     }) 
  
      
    }
  
 


 



  onRegistrarme(){
   this.emitirRegistro.emit(false)
   
  
  }

}
