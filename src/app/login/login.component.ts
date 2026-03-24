import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRole } from '../app-data.models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode: 'login' | 'register' = 'login';
  loginForm = {
    email: '',
    password: '',
  };
  registerForm: {
    name: string;
    email: string;
    password: string;
    role: AuthRole;
  } = {
    name: '',
    email: '',
    password: '',
    role: 'contributor',
  };
  error = '';

  constructor(
    private readonly auth: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.resetForms();
  }

  switchMode(mode: 'login' | 'register'): void {
    this.mode = mode;
    this.error = '';
    this.resetForms();
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

  private resetForms(): void {
    this.loginForm = {
      email: '',
      password: '',
    };
    this.registerForm = {
      name: '',
      email: '',
      password: '',
      role: 'contributor',
    };
  }
}
