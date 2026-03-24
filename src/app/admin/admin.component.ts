import { Component } from '@angular/core';
import { AuthUser } from '../app-data.models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private readonly auth: AuthService) {}

  get currentUser(): AuthUser | null {
    return this.auth.getCurrentUser();
  }

  get users(): AuthUser[] {
    return this.auth.getUsers();
  }
}
