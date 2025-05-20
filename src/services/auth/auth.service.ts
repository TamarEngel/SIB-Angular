import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../../models/admin';
import {jwtDecode} from 'jwt-decode';
import { environment } from '../../environments/environment';

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
  // saveToken(token: string) {
  //   console.log(token)
  //   localStorage.setItem('token', token)
  // }

  // getToken() {
  //   return localStorage.getItem('token')
  // }

  // Logout() {
  //   localStorage.removeItem('token')
  // }

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


  // getUsernameFromToken(): string {
  //   const token = this.getToken()
  //   if (!token) return ''
  //   try {
  //     const decodedToken: any = jwtDecode(token)
  //     console.log(decodedToken)
  //     return decodedToken.userName
  //   }
  //   catch (error) {
  //     console.error('שגיאה בפענוח ה-Token:', error)
  //     return ''
  //   }
  // }
}


