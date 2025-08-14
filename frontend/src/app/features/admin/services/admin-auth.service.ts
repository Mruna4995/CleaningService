import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
  email: string;
  name: string;
  role: string;
  joinedDate: string;
  assigned: boolean;
}

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private authUrl = 'http://localhost:8082/api/auth/login';

  constructor(private http: HttpClient) {}

  // Login function
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.authUrl, { email, password }).pipe(
      tap((response) => {
        // Set login details in local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('email', response.email);
        localStorage.setItem('name', response.name);
        localStorage.setItem('isAuthenticated', 'true'); // Set isAuthenticated to true on login
      })
    );
  }

  // Get the stored token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get the stored user role
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  // Check if the user has an admin role
  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  // Logout function
  logout(): void {
    // Clear all login-related data
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('isAuthenticated');
  }
}
