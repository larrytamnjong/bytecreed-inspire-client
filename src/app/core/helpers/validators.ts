
import { FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => { 
      if (!(control instanceof FormGroup)) { 
          return null; 
      }
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (password && confirmPassword && password !== confirmPassword) {
          return { passwordMismatch: true };
      }
      return null;
  };
}