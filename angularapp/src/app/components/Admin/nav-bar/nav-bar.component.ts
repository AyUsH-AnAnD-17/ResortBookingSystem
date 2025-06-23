import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  // username:string;
  // userEmail:string;
  // userId:number;

  constructor(private userService:AuthService,private router: Router) { }
  showConfirmDialog:boolean= false;
  username:string
  ngOnInit(): void {
    this.username=this.userService.getUserName();
  }
  
 

  confirmlLogout(): void {
    this.showConfirmDialog = true;
  }

  cancelLogout(): void {
    this.showConfirmDialog = false;
  }

  logout() {
    // Clear session data (if any)
    localStorage.removeItem('user');
    
    this.showConfirmDialog = false;
    // Navigate back to login page
    this.router.navigate(['/login']);
  }
}