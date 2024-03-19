

  import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
   
  export function confirmpass(control: AbstractControl)  {
    const p1 = control.get('password');
    const p2 = control.get('cpassword');

    if (p1 && p2) {
        if (p1.value !== p2.value) {
            p2.setErrors({ passwordMatch: true });
        } else {
            p2.setErrors( null );
        }
    }
}
   

  