import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../../models/admin';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  addAdmin(admin: Admin): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/User/registerAdmin`, admin);
  }
  authLogin(admin: Admin): Observable<any> {
    console.log(admin.email)
    console.log(admin.passwordHash)
    return this.http.post<any>(`${environment.apiUrl}/User/login`, {
      Email: admin.email,
      Password: admin.passwordHash
    },)
  }
  
  saveToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }
  
  getToken() {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }
  
  Logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
  
  getUser(userId: string) {
    return this.http.get<Admin>(`${environment.apiUrl}/User/${userId}`)
  }

}


