import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  rxform!: FormGroup;
  constructor(private fb: FormBuilder,
    private _adminService: AdminService,
    private _router: Router,
    private _snackbar: SnackBarService

  ) {
    // this._adminService.getAdmin().subscribe(admins => { this.admin = admins })
  }
  admin!: any[]

  StrongPasswordRegx: RegExp =
    /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  ngOnInit() {
    this.rxform = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]),

    })
    // if(this._authService.isLoggedIn()){
    //   this._router.navigateByUrl('/landing')
    // }
  }
  // onsubmit(form: FormGroup) {
  //   const val = form.value;

  //   if(form.valid){
  //     if (val.email && val.password) {
  //       this._authService.login(val.email, val.password)
  //         .subscribe(
  //           (res) => {
  //             console.log("User is logged in");
  //             console.log(res);
  //             this._router.navigate(['/admin',{name: res.name}], );
  //           }
  //         );
  //     }
  //   }else{
  //     alert('Fill all the fields')
  //   }

  // }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const email = form.get('email')!.value;
      const password = form.get('password')!.value;
      const user = this.admin.find(u => u.email === email && u.password === password);
      console.log(user);

      if (user) {
        this._snackbar.success('Login Successful!')
        console.log('LOGIN!');
        this._router.navigate(['/admin', { name: user.name }],)
        const token = user.token
        this._adminService.setToken(user)
        this._adminService.loggedInTrue()
      }
      else {
        this._snackbar.error('User not found!')
        console.log('NOT FOUND');
      }
    } else {
      this._snackbar.error('Fill all the fields!')
      console.log('NOT FOUND');
    }
  }

  onSubmit1(form: FormGroup) {
    if (form.valid) {
      const email = form.get('email')!.value;
      const password = form.get('password')!.value;
      const user = this._adminService.login(email, password).subscribe({
        next: (res) => {
          console.log(res);
          const token = JSON.stringify(res)
          this._snackbar.success('Login Successful!')
          localStorage.setItem('user', token)
          this._adminService.loggedInTrue()
          this._router.navigate(['/admin',
             { name: res.name }
          ])
          
        },
        error: (err) => {
          console.log(err);
          this._snackbar.error("Incorrect credentials!")
        }
      })




    } else {
      this._snackbar.error('Fill all the fields!')
      console.log('NOT FOUND');
    }
  }

  showPassword: boolean = false;

  markAsTouched(fieldName: string): void {
    this.rxform.get(fieldName)?.markAsTouched();
  }

  togglePassword(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
      console.log('Password');
    }

  }
}



