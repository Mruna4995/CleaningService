import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.scss'] //

})
export class AdminLoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      console.log('❌ Form is invalid');
      return;
    }

    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    console.log('Login request payload:', loginData);  // Check what is being sent

    this.http.post('http://localhost:8082/admin/login', loginData, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('✅ Login success:', response);
          localStorage.setItem('isAuthenticated', 'true');
          this.router.navigate(['/admin-dashboard']);
        },
        error: (err) => {
          console.error('❌ Login failed:', err);
          console.log('Error status:', err.status);  // Log the error status code
          console.log('Error message:', err.message);  // Log any additional message
          if (err.status === 403) {
            alert('Forbidden: You do not have permission to access this resource.');
          } else {
            alert('Login failed! Please check your credentials.');
          }
        }
      });
  }
}
