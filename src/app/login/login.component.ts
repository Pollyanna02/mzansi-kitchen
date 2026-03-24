import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRole } from '../app-data.models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mode: 'login' | 'register' = 'login';
  loginForm = {
    email: 'thandeka@mzansikitchen.local',
    password: 'Pass1234!',
  };
  registerForm: {
    name: string;
    email: string;
    password: string;
    avatar: string;
    role: AuthRole;
  } = {
    name: '',
    email: '',
    password: '',
    avatar: '',
    role: 'contributor',
  };
  error = '';

  constructor(
    private readonly auth: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  switchMode(mode: 'login' | 'register'): void {
    this.mode = mode;
    this.error = '';
  }

  submit(): void {
    const result =
      this.mode === 'login'
        ? this.auth.login(this.loginForm.email, this.loginForm.password)
        : this.auth.register(this.registerForm);

    if (!result.ok) {
      this.error = result.message ?? 'Authentication failed.';
      return;
    }

    const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') ?? '/profile';
    void this.router.navigateByUrl(redirectTo);
  }
}
