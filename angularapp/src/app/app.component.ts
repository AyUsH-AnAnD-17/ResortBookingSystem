import { Component } from '@angular/core';
import { AuthGuard } from './services/auth.guard';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authGuard:AuthGuard){}
  title = 'angularapp';
}
