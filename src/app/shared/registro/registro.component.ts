import { Component,inject,Output,EventEmitter } from '@angular/core';// importo inject
import { FormControl, FormGroup, ReactiveFormsModule,  Validators, AbstractControl, ValidationErrors,ValidatorFn} from '@angular/forms';
import { Router } from '@angular/router'; 
import { UsuarioApiService } from '../../core/services/usuario-api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  @Output() emitirIniciarSesion = new EventEmitter<boolean>();
  @Output() emitirAlert = new EventEmitter<void>();

  private router = inject(Router); // Inyecta Router para dedirigir
  private usuarioApi=inject(UsuarioApiService);
  isRegistrameClickeado=false
  errorMsg: string = "";
  





  form:FormGroup = new FormGroup({ 
                        email: new FormControl('', [ Validators.required, Validators.email]),
                         password:new FormControl('',[Validators.required,Validators.minLength(6)]),
                         password2:new FormControl(''),
                         nombre:new FormControl('',[Validators.required])
  });
   
  get email(){ return this.form.get('email'); }
  get password(){ return this.form.get('password'); }
  get password2(){ return this.form.get('password2'); }
  get nombre(){ return this.form.get('nombre'); }

  ngOnInit(){
     if(this.password2 && this.password)
        this.password2.setValidators([Validators.required, this.passIguales(this.password)]);
     
     this.form.get('password')!.valueChanges.subscribe((value) => {
      this.form.get("password2")?.updateValueAndValidity();
    });
  }

  onSubmit(){
    this.form.markAllAsTouched();
    const email = this.email?.value || ''; 
    const password = this.password?.value || '';
    const nombre = this.nombre?.value || '';
    
   this.usuarioApi.crearUsuario(nombre,email,password).subscribe({
    next:(response)=>{
      this.emitirIniciarSesion.emit(true)
      this.emitirAlert.emit()
    },
    error:(error)=>{
     
      if(Array.isArray(error))
        this.errorMsg="Error en los datos ingresados"
      else
       this.errorMsg=error

    }
   })  

    
  }


  passIguales(elOtroCampo:AbstractControl ){
      
     return  (control: AbstractControl): ValidationErrors | null => {
      const laOtraPass=elOtroCampo.value;
      const password = control.value;
      // Retorna un error si las contraseñas no coinciden
      // acá quiero validar el otro campo del formulario
      this.form.get(elOtroCampo.value)?.updateValueAndValidity();
      return laOtraPass && password && password === laOtraPass ?null:{isIguales:false}
    }
  }

onIniciarSesion(){
  this.emitirIniciarSesion.emit(true)
}

}











