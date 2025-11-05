import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { AuthTokens, LoginRequest, User } from '../models/models';
import { Endpoints } from '../api/endpoints';
import { tap } from 'rxjs';

const ACCESS_TOKEN_KEY = 'pm_access_token';
const REFRESH_TOKEN_KEY = 'pm_refresh_token';

/**
 * AuthService manages user authentication, token storage, and profile.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);

  private userSig = signal<User | null>(null);
  private tokenSig = signal<string | null>(this.getToken());

  // PUBLIC_INTERFACE
  readonly user = computed(() => this.userSig());
  // PUBLIC_INTERFACE
  readonly isAuthenticated = computed(() => !!this.tokenSig());
  // PUBLIC_INTERFACE
  readonly role = computed(() => this.userSig()?.role);

  // PUBLIC_INTERFACE
  login(payload: LoginRequest) {
    return this.api.post<AuthTokens>(Endpoints.auth.login, payload).pipe(
      tap(tokens => {
        this.setTokens(tokens);
      }),
      tap(() => {
        this.me().subscribe();
      })
    );
  }

  // PUBLIC_INTERFACE
  me() {
    return this.api.get<User>(Endpoints.auth.me).pipe(
      tap(user => this.userSig.set(user))
    );
  }

  // PUBLIC_INTERFACE
  logout(navigate = true) {
    try {
      const g: any = typeof globalThis !== 'undefined' ? (globalThis as any) : undefined;
      const ls = g && g.window && g.window.localStorage ? g.window.localStorage : undefined;
      if (ls) {
        ls.removeItem(ACCESS_TOKEN_KEY);
        ls.removeItem(REFRESH_TOKEN_KEY);
      }
    } catch {}
    this.userSig.set(null);
    this.tokenSig.set(null);
    if (navigate) {
      this.router.navigate(['/auth/login']);
    }
  }

  // PUBLIC_INTERFACE
  getAccessToken(): string | null {
    return this.tokenSig();
  }

  private setTokens(tokens: AuthTokens) {
    try {
      const g: any = typeof globalThis !== 'undefined' ? (globalThis as any) : undefined;
      const ls = g && g.window && g.window.localStorage ? g.window.localStorage : undefined;
      if (ls) {
        ls.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
        if (tokens.refreshToken) {
          ls.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
        }
      }
    } catch {}
    this.tokenSig.set(tokens.accessToken);
  }

  private getToken(): string | null {
    try {
      const g: any = typeof globalThis !== 'undefined' ? (globalThis as any) : undefined;
      const ls = g && g.window && g.window.localStorage ? g.window.localStorage : undefined;
      if (ls) {
        return ls.getItem(ACCESS_TOKEN_KEY);
      }
      return null;
    } catch {
      return null;
    }
  }
}
