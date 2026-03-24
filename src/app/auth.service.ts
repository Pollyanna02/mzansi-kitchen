import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthRole, AuthSession, AuthUser } from './app-data.models';

const AUTH_USERS_KEY = 'mzansi-kitchen-auth-users';
const AUTH_SESSION_KEY = 'mzansi-kitchen-auth-session';

const defaultUsers: AuthUser[] = [
  {
    id: 'user-thandeka',
    name: 'Thandeka Mokoena',
    email: 'thandeka@mzansikitchen.local',
    password: 'Pass1234!',
    avatar: 'TM',
    role: 'contributor',
  },
  {
    id: 'user-admin',
    name: 'Admin Nkosi',
    email: 'admin@mzansikitchen.local',
    password: 'Admin1234!',
    avatar: 'AN',
    role: 'admin',
  },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly users: AuthUser[] = this.loadUsers();
  private readonly sessionSubject = new BehaviorSubject<AuthSession | null>(this.loadSession());
  readonly session$ = this.sessionSubject.asObservable();

  getCurrentUser(): AuthUser | null {
    const session = this.sessionSubject.value;
    if (!session) {
      return null;
    }

    return this.users.find((user) => user.id === session.userId) ?? null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  hasRole(role: AuthRole): boolean {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return false;
    }

    const weight: Record<AuthRole, number> = {
      user: 1,
      contributor: 2,
      admin: 3,
    };

    return weight[currentUser.role] >= weight[role];
  }

  login(email: string, password: string): { ok: boolean; message?: string } {
    const user = this.users.find(
      (candidate) => candidate.email.toLowerCase() === email.trim().toLowerCase() && candidate.password === password
    );

    if (!user) {
      return { ok: false, message: 'Invalid email or password.' };
    }

    const session: AuthSession = { userId: user.id };
    this.sessionSubject.next(session);
    this.saveSession(session);
    return { ok: true };
  }

  register(payload: {
    name: string;
    email: string;
    password: string;
    role: AuthRole;
  }): { ok: boolean; message?: string } {
    const email = payload.email.trim().toLowerCase();
    if (this.users.some((user) => user.email.toLowerCase() === email)) {
      return { ok: false, message: 'That email is already registered.' };
    }

    const user: AuthUser = {
      id: `user-${Date.now()}`,
      name: payload.name.trim(),
      email,
      password: payload.password,
      avatar: payload.name.trim().slice(0, 2).toUpperCase() || 'MK',
      role: payload.role,
    };

    this.users.push(user);
    this.saveUsers();
    const session: AuthSession = { userId: user.id };
    this.sessionSubject.next(session);
    this.saveSession(session);
    return { ok: true };
  }

  logout(): void {
    this.sessionSubject.next(null);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(AUTH_SESSION_KEY);
    }
  }

  getUsers(): AuthUser[] {
    return structuredClone(this.users);
  }

  private loadUsers(): AuthUser[] {
    if (typeof window === 'undefined' || !window.localStorage) {
      return structuredClone(defaultUsers);
    }

    const stored = window.localStorage.getItem(AUTH_USERS_KEY);
    if (!stored) {
      window.localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(defaultUsers));
      return structuredClone(defaultUsers);
    }

    try {
      return JSON.parse(stored) as AuthUser[];
    } catch {
      return structuredClone(defaultUsers);
    }
  }

  private loadSession(): AuthSession | null {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }

    const stored = window.localStorage.getItem(AUTH_SESSION_KEY);
    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored) as AuthSession;
    } catch {
      return null;
    }
  }

  private saveUsers(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    window.localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(this.users));
  }

  private saveSession(session: AuthSession): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  }
}
