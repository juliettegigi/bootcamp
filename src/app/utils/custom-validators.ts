import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
//valido que e
export const evenNumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
 const value = control.value;
 return value % 2 === 0 ? null : { notEven: true };
};
