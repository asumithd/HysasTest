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
          console.log('Login successful:', response);
          const role = this.authService.getUserRole();
          if (role === 'Admin') {
            this.router.navigate(['/admin']);
          } else if (role === 'User') {
            this.router.navigate(['/user']);
          } else {
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          console.error('Login error:', error); // Log the error for debugging
          alert('Login failed. Please check your username and password.'); // User-friendly error message
        }
      );
    } else {
      console.log('no data');
    }
  }
}
