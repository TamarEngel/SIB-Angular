import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge } from '../../models/challenge';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private http: HttpClient) { }

  getChallenges():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/Challenge`)
  }

  getChallengeById(id:number):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/Challenge/${id}`)
  }

  getSortChallenges():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/Challenge/sort`)
  }

  getCreationsByChalleng(id:number):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/Challenge/creationByChallenge/${id}`)
  }

  getWinCreationForChalleng(id:number):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/Challenge/winner/${id}`)
  }

  addChallenge(challenge:Challenge):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/Challenge`,challenge)
  }

  updateChallenge(id:number,challenge:Challenge):Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/Challenge/${id}`,challenge)
  }

  incrementCreationsForChallenge(id:number):Observable<any>{
    return this.http.patch<any>(`${environment.apiUrl}/Challenge/update-count/${id}`,{})
  }
 
  deleteChallenge(id:number):Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/Challenge/${id}`)
  }
}
