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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,MatDialogModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  hidePassword = true;
  userLogin!:Admin;
  userLoginForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService,private router:Router) { }
  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', [Validators.required, Validators.minLength(4)]],
    })
  }
  get user(): { [key: string]: AbstractControl } {
    return this.userLoginForm.controls;
  }
  onSubmit() {
    this.userLogin = this.userLoginForm.value
    console.log(this.userLogin);
    
    this.authService.authLogin(this.userLogin).subscribe({
      next: (response) => { 
        this.authService.saveToken(response.token)
        //localStorage.setItem('userId',response.userId)
        alert('✅' + "Login Successfully") 
        this.router.navigate(['/home'])
      },
      error: (e) => { alert('❌ ERROR: ' + (e.error.message || 'משהו השתבש')) }
    })
  }
  
  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;

  }
}

