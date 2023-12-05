import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Credentials } from 'src/app/models/login/Credentials';
import { LoginResult } from 'src/app/models/results/login/LoginResult';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tst-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  credentials: Credentials = {
    email: '',
    password: '',
  };
  subscriptions: Subscription = new Subscription();
  constructor(private userService: UserService, private router: Router) {}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  login(form: NgForm) {
    if (form.invalid) {
      alert('El email o contraseña no tienen el formato correcto');
    }
    this.subscriptions.add(
      this.userService.login(this.credentials).subscribe({
        next: (response: LoginResult) => {
          if (!response.ok) {
            alert(response.error);
            return;
          }
          alert(response.message);
          localStorage.setItem('user_token', response.token);
          this.router.navigate(['home']);
        },
        error: (error: Error) => {
          alert(error.message);
        },
      })
    );
  }
}
