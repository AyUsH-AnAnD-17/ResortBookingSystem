import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResortService {

  private apiUrl= "https://8080-dbdafbbfccbabefdcaeaaeedbdbcbafdfaef.premiumproject.examly.io";

  token: string="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE0OCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImNydEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiY2hhbmRhbiIsIm1vYmlsZW51bWJlciI6Ijk3ODE1MjQzMzMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImp0aSI6IjY3NDc2OWYyLTE3ZGQtNDNmZS1iN2FjLWY4ZGNjMmUxZGQ2MyIsImV4cCI6MTcwOTYxNTk0NSwiaXNzIjoiWW91cklzc3VlckhlcmUiLCJhdWQiOiJZb3VySXNzdWVySGVyZSJ9.3ppzxhtMyA6Ov3xDM7jgtELAusW9nOx410AP0kVz4IQ"

  constructor(private http: HttpClient) { }
  getAllResorts(): Observable<any> {
    const headers={'Authorization':this.token}
    return this.http.get(`${this.apiUrl}/api/resort`,{headers});
  }

  addResort(resort: any): Observable<any> {
    const headers={'Authorization':this.token}
    return this.http.post(`https://8080-dbdafbbfccbabefdcaeaaeedbdbcbafdfaef.premiumproject.examly.io/api/resort`, resort,{headers});
  }

  // resortId: number, resort: any
  updateResort(resortDetails:any): Observable<any> {
    const headers={'Authorization':this.token}
    return this.http.put(`https://8080-dbdafbbfccbabefdcaeaaeedbdbcbafdfaef.premiumproject.examly.io/api/resort/${resortDetails.resortId}`, resortDetails,{headers});
  }

  deleteResort(resortId: number): Observable<any> {
    const headers={'Authorization':this.token}
    return this.http.delete(`${this.apiUrl
    }/api/resort/${resortId}`,{headers});
  }

  getResortById(resortId: number): Observable<any> {
    return this.http.get(`${this.apiUrl
    }/api/resort/${resortId}`);
  }

   getAllReviews(): Observable<any> {
    const headers={'Authorization':this.token}
    return this.http.get(`${this.apiUrl
    }/api/review`,{headers});
  }

  addReview(review: any): Observable<any> {
    const headers={'Authorization':this.token}
    return this.http.post(`${this.apiUrl
    }/api/review`, review,{headers});
  }

  getReviewsByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl
    }/api/review/${userId}`);
  }
}