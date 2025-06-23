import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-nav-bar2',
  templateUrl: './nav-bar2.component.html',
  styleUrls: ['./nav-bar2.component.css']
})
export class NavBar2Component implements OnInit {

  showConfirmDialog: boolean = false;
  username:string;

  constructor(private router:Router, private userService:AuthService) { }
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