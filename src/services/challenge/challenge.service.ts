import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge } from '../../models/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private http: HttpClient) { }

  getChallenges():Observable<any>{
    return this.http.get<any>('https://localhost:7143/api/Challenge')
  }

  getChallengeById(id:number):Observable<any>{
    return this.http.get<any>(`https://localhost:7143/api/Challenge/${id}`)
  }

  getSortChallenges():Observable<any>{
    return this.http.get<any>('https://localhost:7143/api/Challenge/sort')
  }

  getCreationsByChalleng(id:number):Observable<any>{
    return this.http.get<any>(`https://localhost:7143/api/Challenge/creationByChallenge/${id}`)
  }

  getWinCreationForChalleng(id:number):Observable<any>{
    return this.http.get<any>(`https://localhost:7143/api/Challenge/winner/${id}`)
  }

  addChallenge(challenge:Challenge):Observable<any>{
    return this.http.post<any>('https://localhost:7143/api/Challenge',challenge)
  }

  updateChallenge(id:number,challenge:Challenge):Observable<any>{
    return this.http.put<any>(`https://localhost:7143/api/Challenge/${id}`,challenge)
  }

  incrementCreationsForChallenge(id:number):Observable<any>{
    return this.http.patch<any>(`https://localhost:7143/api/Challenge/update-count/${id}`,{})
  }
 
  deleteChallenge(id:number):Observable<any>{
    return this.http.delete<any>(`https://localhost:7143/api/Challenge/${id}`)
  }
}
