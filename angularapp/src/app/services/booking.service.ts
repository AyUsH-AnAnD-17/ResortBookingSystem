import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = "https://8080-dbdafbbfccbabefdcaeaaeedbdbcbafdfaef.premiumproject.examly.io";
  token: string="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE0OCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImNydEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiY2hhbmRhbiIsIm1vYmlsZW51bWJlciI6Ijk3ODE1MjQzMzMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImp0aSI6IjY3NDc2OWYyLTE3ZGQtNDNmZS1iN2FjLWY4ZGNjMmUxZGQ2MyIsImV4cCI6MTcwOTYxNTk0NSwiaXNzIjoiWW91cklzc3VlckhlcmUiLCJhdWQiOiJZb3VySXNzdWVySGVyZSJ9.3ppzxhtMyA6Ov3xDM7jgtELAusW9nOx410AP0kVz4IQ"

  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<any> {
    const headers={'Authorization':this.token}
    return this.http.get(`${this.apiUrl}/api/booking`,{headers});
  }

  addBooking(booking: any): Observable<any> {
    const headers={'Authorization':this.token}
    return this.http.post(`${this.apiUrl}/api/booking`, booking,{headers});
  }

  deleteBooking(bookingId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/booking/${bookingId}`);
  }

  updateBooking(bookingId: number, newStatus: any): Observable<any> {
    console.log("newStatus=" + newStatus)
    return this.http.put(`${this.apiUrl}/api/booking/${bookingId}/${newStatus}`,bookingId );
  }


  getBookingById(bookingId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/booking/${bookingId}`);
  }

  getBookingsByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/booking/user/${userId}`);
  }

  getTotalSumOfBookingByResortId(resortId:number):Observable<any>
  {
    return this.http.get(`${this.apiUrl}/api/booking/totalpersons/${resortId}`)
  }
}