import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private authService: AuthService) {}

  canActivate(): boolean {
    const token = this.authService.getToken();

    if (token) {
      return true;
    } else {
      alert('Please log in to access this page.');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
