import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log(this.username, 'this.username');
    console.log(this.password, 'this.password');
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          // Handle successful login based on your authentication flow
          console.log('Login successful:', response); // Optional logging for debugging
          this.router.navigate(['/']); // Assuming this is the home route
        },
        (error) => {
          console.error('Login error:', error); // Log the error for debugging
          alert('Login failed. Please check your username and password.'); // User-friendly error message
        }
      );
    } else {
      console.log('no data')
    }

  }
}
