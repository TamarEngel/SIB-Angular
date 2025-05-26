import { Component, OnInit } from '@angular/core';
import { Admin } from '../../models/admin';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  userLogin!: Admin;
  userLoginForm!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', [Validators.required, Validators.minLength(4)]],
      rememberMe: [false]
    });
  }

  get user(): { [key: string]: AbstractControl } {
    return this.userLoginForm.controls;
  }

  onSubmit() {
    if (this.userLoginForm.invalid) return;
    
    this.isLoading = true;
    this.userLogin = this.userLoginForm.value;
    
    this.authService.authLogin(this.userLogin).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        // Show success message
        this.showNotification('Login successful! Welcome back.', 'success');
        this.router.navigate(['/home2']);
      },
      error: (e) => {
        this.showNotification(e.error.message || 'Something went wrong. Please try again.', 'error');
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // Helper method for showing notifications (you can replace with your preferred notification system)
  private showNotification(message: string, type: 'success' | 'error') {
    if (type === 'success') {
      alert('✅ ' + message);
    } else {
      alert('❌ ' + message);
    }
  }
}

