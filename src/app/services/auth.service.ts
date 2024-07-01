import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'https://angularapi-dlal.onrender.com/api/auth/login';
  private apiUrl = '/api/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap((response) => {
        const role = this.getRoleFromUsername(username);
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', role);
      }),
      catchError((error) => {
        alert('Login failed');
        return throwError(error);
      })
    );
  }
  private getRoleFromUsername(username: string): string {
    if (username === 'admin') {
      return 'Admin';
    } else {
      return 'User';
    }
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
}
