import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLoginModel } from 'src/app/models/user-login-model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({ selector: 'app-login',
 templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;

  constructor(
    private fb: FormBuilder,
    private titleService:Title,////////////////////
    private authService: AuthService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Login');

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData: UserLoginModel = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      
      this.authService.login(loginData.email,loginData.password).subscribe(response => {
        if (response) {
          
          console.log('Login successful:',response);
        
          // Redirect users based on their roles
          if (response.userRole === 'Admin') {
            this.router.navigate(['/Ahome']);
            alert("You have successfully logged in.");
          } else if (response.userRole === 'Customer') {
            this.router.navigate(['/Chome']);
            alert("You have successfully logged in.");

          }
        } else {
          alert('Login failed! Invalid credential. Please try again.');
        }
      }, error => {
        console.error('Error during login:', error);
        this.error = 'Something is wrong. Please try again.';
      });
    }
  }

  get f() { return this.loginForm.controls; }
}
