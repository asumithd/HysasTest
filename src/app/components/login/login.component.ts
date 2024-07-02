import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  isSpinner : boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log(this.username, 'this.username');
    console.log(this.password, 'this.password');
    this.isSpinner= true;
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
          this.isSpinner= false;
        },
        (error) => {
          console.error('Login error:', error); // Log the error for debugging
          this.errorMessage =
            'Login failed. Please check your username and password.'; //alert

            this.isSpinner= false;
        }
      );
    } else {
      console.log('no data');
    }
  }
}
