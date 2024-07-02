import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',

})
export class AuthService {
  private apiUrl = '/api/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap((response) => {
        const role = this.getRoleFromUsername(username);
        if (this.isBrowser()) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', role);
        }
      }),
      catchError((error) => {
        console.error('Login error', error);
        return throwError(error);
      })
    );
  }

  private getRoleFromUsername(username: string): string {
    return username === 'admin' ? 'Admin' : 'User';
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const isAuthenticated = this.isBrowser() && !!localStorage.getItem('token');
    return isAuthenticated;
  }

  getUserRole(): string | null {
    const role = this.isBrowser() ? localStorage.getItem('role') : null;
    return role;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
