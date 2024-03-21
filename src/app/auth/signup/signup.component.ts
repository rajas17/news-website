import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmpass } from './confirmpass';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  rxform!:FormGroup
  constructor(
    private _fb:FormBuilder,
    private _adminService:AdminService,
    private _router:Router,
    private _snackbar:SnackBarService
  ){}

  StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  ngOnInit(): void {
    this.rxform=this._fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]),
      cpassword: new FormControl('', Validators.required ),
    }, { validators:confirmpass})
  }

  onSubmit(form:any){
    if(form.valid){
      this._adminService.addAdmin(form.value).subscribe(val=>{
        this._snackbar.success('Admin added successfully')
        form.reset(),
        this._router.navigateByUrl('/admin')
      })
      
    }else{
      this._snackbar.error('Fill all the fields')
    }
  }

  showPassword: boolean = false;
  showCPassword: boolean = false;
  markAsTouched(fieldName: string): void {
    this.rxform.get(fieldName)?.markAsTouched();
  }

  togglePassword(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
      console.log('Password');
    }
    if (field === 'cpassword') {
      this.showCPassword = !this.showCPassword;
      console.log('CPassword');
    }
  }
}
