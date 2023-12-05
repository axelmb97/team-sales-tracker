import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/login/Credentials';
import { LoginResult } from 'src/app/models/results/login/LoginResult';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tst-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials: Credentials = {
    email: '',
    password: '',
  };
  constructor(private userService: UserService, private router: Router) {}
  login(form: NgForm) {
    if (form.invalid) {
      alert('El email o contraseña no tienen el formato correcto');
    }
    this.userService.login(this.credentials).subscribe({
      next: (response: LoginResult) => {
        if (response.ok) {
          alert(response.message);
          localStorage.setItem('user_token', response.token);
          this.router.navigate(['home']);
        }
        alert(response.error);
      },
      error: (error: Error) => {
        alert(error.message);
      },
    });
  }
}
