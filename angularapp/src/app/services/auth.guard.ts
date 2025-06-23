import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UnauthorizedUserMessageComponent } from '../unauthorized-user-message/unauthorized-user-message.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private router: Router){}
  
  unauthorized:boolean=false;
  canActivate():boolean{
    if(this.authService.isLoggedIn()){
      this.unauthorized=false;
      return true;
    }else{
      this.unauthorized=true;
      this.router.navigate(['/login']);
      return false;
    }
  }
}
  

