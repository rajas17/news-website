import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  rxform!: FormGroup
  
  constructor(private fb: FormBuilder,) { }

  ngOnInit() {
    this.rxform = this.fb.group({
      name1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email1: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required, Validators.minLength(15)])

    },)
  }
  
  onsubmit1(form: FormGroup) {
    console.log(form.controls)
    if (this.rxform.invalid) {
      // this._userService.openSnackBar('Fill all the details correctly!')
    } else {
      // this._userService.openSnackBar('Thanks for your response!')
      form.reset()
    }

  }




  showPassword: boolean = false;
  showCPassword: boolean = false;

  markAsTouched(fieldName: string) {
    this.rxform.get('fieldName')?.markAsTouched
  }

  togglePassword(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
      console.log('Password');


    } else if (field === 'cpassword') {
      this.showCPassword = !this.showCPassword;
      console.log('Cpassword');

    }
  }
}
