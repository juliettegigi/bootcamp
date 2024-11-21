import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isFechaPasada(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dia = control.get('dia')?.value;
      const mes = control.get('mes')?.value;
      const anio = control.get('anio')?.value;
  
      if (dia && mes && anio) {
        const fechaIngresada = new Date(anio, mes - 1, dia); // Mes empieza desde 0
        const fechaActual = new Date();
  
        // Compara las fechas
        if (fechaIngresada <= fechaActual) {
          return { isFechaPasada: true }; // La fecha no es válida
        }
      }
  
      return null; // La fecha es válida
    };
  }