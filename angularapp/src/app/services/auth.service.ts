// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserLoginModel } from '../models/user-login-model';
import { UserLoginResponse } from '../models/user-login-response';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  public apiUrl="https://8080-dbdafbbfccbabefdcaeaaeedbdbcbafdfaef.premiumproject.examly.io"
  isLoggedIn(): boolean {
    return!!localStorage.getItem('user')
  }
  // userLoginModel: UserLoginModel

  login(email:string,password:string): Observable<any> {
    const loginData={email,password};
    return this.http.post<any>('https://8080-dbdafbbfccbabefdcaeaaeedbdbcbafdfaef.premiumproject.examly.io/api/login', loginData)
      .pipe(
        map(response => {
          if (response && response.token) {
            const user: UserLoginResponse={
              userId:response.userId,
              userName:response.userName,
              userRole:response.userRole,
              token:response.token
            };
            localStorage.setItem('user',JSON.stringify(user));
            return user;
          }return null;
          
        }),
        catchError(error => {
          console.error('Error during login:', error);
          return of(null);
        })
      );
  }
  register(user: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/api/register`, user,{responseType:'text' as 'json'});
  }
  getUserName():string{
    const user= JSON.parse(localStorage.getItem('user'));
    return user ? user.userName : null;
  }
  getUserId():string{
    const user= JSON.parse(localStorage.getItem('user'));
    return user ? user.userId : null;
  }
}
