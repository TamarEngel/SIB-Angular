import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/User`)
  }

  getUserById(id:number):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/User/${id}`)
  }

  deleteUser(userId:number):Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/User/${userId}`)
  }
}
