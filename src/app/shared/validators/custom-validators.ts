import { AbstractControl, ValidationErrors, ValidatorFn,FormGroup  } from '@angular/forms';
import {  isValid, parseISO ,startOfDay,isBefore} from 'date-fns';

export function isFechaPasada(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dia = control.get('dia')?.value;
      const mes = control.get('mes')?.value;
      const anio = control.get('anio')?.value;
  
      if (dia && mes && anio) {

        const diaFormateado = String(dia).padStart(2, '0'); 
          const mesFormateado = String(mes).padStart(2, '0');
          const fechaIngresada = parseISO(`${anio}-${mesFormateado}-${diaFormateado}`);

          const fechaActual = startOfDay(new Date());//la fecha con hr 0:0:0
          if (isBefore(fechaIngresada, fechaActual)) {
            return { isFechaPasada: true };
        
        }
      }
  
      return null; // La fecha es válida
    };
  }




  export function fechaValida(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      
        const dia = control.get('dia')?.value;
        const mes = control.get('mes')?.value;
        const anio = control.get('anio')?.value;
  
        if (dia && mes  && anio ) {
          const diaFormateado = String(dia).padStart(2, '0'); 
          const mesFormateado = String(mes).padStart(2, '0');
          const fechaIngresada = parseISO(`${anio}-${mesFormateado}-${diaFormateado}`);
          if (!isValid(fechaIngresada)) {
            return { isFechaInvalida:true };
            }
        }
      return null;
    };
  }