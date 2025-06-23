 
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

 
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
 
  constructor(private fb: FormBuilder,
              private titleService: Title,
              private authService: AuthService,private router:Router) {}
 
  ngOnInit(): void {
    this.titleService.setTitle('Registration');

    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), this.noSpaceValidations]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')]],
      confirmPassword: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91- ?)|0)?[0-9]{10}$")]],
      userRole: ['', Validators.required]
    }, {
      validator: this.mustMatch('password', 'confirmPassword'),
      validators:this.passwordMatchValidator  
    });
  }
 
  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
 
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.mustMatch) {
        // return if another validator has already found an error on the confirmPassword
        return;
      }
 
      // set error on confirmPasswordControl if validation fails
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
 

  admin:string
  user:string
  role:any={admin:'Admin',user:'User'}
 
 
onRegister() {
  
  
  if (this.registrationForm.valid) {
    const user = this.registrationForm.value;
    console.log('User payload:', user); // Log the payload
    this.authService.register(user).subscribe(
      () => {
        alert('User registered successfully');
        this.router.navigate(['/login']);
      },
      error => {
        alert('Registration failed');
 
        // Log the detailed error message from the server
        // Handle the error appropriately
        if (error.error instanceof ErrorEvent) {
          console.error('Client-side error:', error.error.message);
        } else {
          console.error('Server-side error:', error.error);
        }
      }
    );
  }
}
 
  passwordMatchValidator(fg: FormGroup): { [key: string]: boolean } | null {
    const password = fg.get('password').value;
    const confirmPassword = fg.get('confirmPassword').value;
    if (password && confirmPassword && password !== confirmPassword) {
      fg.get('confirmPassword').setErrors({ passwordMismatch: true });
      return { 'passwordMismatch': true };
    }
    return null;
  }
  
  

  // Convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }


  noSpaceValidations(control: AbstractControl): ValidationErrors | null {
      const controlValue = control.value as string;
   
      if (controlValue.indexOf(' ')>= 0) {
        return {  NoSpaceValidator: true };
      } else {
        return null;
      }
    }
}
 
 
 
