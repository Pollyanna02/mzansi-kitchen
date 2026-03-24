import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  get avatar(): string {
    return this.auth.getCurrentUser()?.avatar ?? 'MK';
  }

  get isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  get isAdmin(): boolean {
    return this.auth.hasRole('admin');
  }

  get canUpload(): boolean {
    return this.auth.isAuthenticated();
  }

  get displayName(): string {
    return this.auth.getCurrentUser()?.name ?? 'Guest';
  }

  logout(): void {
    this.auth.logout();
    void this.router.navigate(['/login']);
  }
}
