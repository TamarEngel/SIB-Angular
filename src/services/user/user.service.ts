import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get<any>('https://localhost:7143/api/User')
  }

  getUserById(id:number):Observable<any>{
    return this.http.get<any>(`https://localhost:7143/api/User/${id}`)
  }

  deleteUser(userId:number):Observable<any>{
    return this.http.delete<any>(`https://localhost:7143/api/User/${userId}`)
  }
}
