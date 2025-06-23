import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { IndexComponent } from './components/index/index.component';


import { NavBarComponent} from './components/Admin/nav-bar/nav-bar.component';
import { HomeComponent  as A_HomeComponent} from './components/Admin/home/home.component';
import { ViewResortComponent as A_ViewResortComponent} from './components/Admin/view-resort/view-resort.component';
import { AddResortComponent as A_AddResortComponent} from './components/Admin/add-resort/add-resort.component';
import { ViewBookingComponent as A_ViewBookingComponent } from './components/Admin/view-booking/view-booking.component';
import { ViewReviewsComponent as A_ViewReviewsComponent } from './components/Admin/view-reviews/view-reviews.component';

import { NavBar2Component } from './components/Customer/nav-bar2/nav-bar2.component';
import { HomeComponent as C_HomeComponent } from './components/Customer/home/home.component';
import { ViewResortComponent as C_ViewResortComponent} from './components/Customer/view-resort/view-resort.component';
import { AddBookingComponent as  C_AddBookingComponent} from './components/Customer/add-booking/add-booking.component';
import { ViewBookingComponent as C_ViewBookingComponent} from './components/Customer/view-booking/view-booking.component';
import { AddReviewComponent as C_AddReviewComponent} from './components/Customer/add-review/add-review.component';
import { ViewReviewComponent as C_ViewReviewComponent} from './components/Customer/view-review/view-review.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"register", component:RegistrationComponent},
  {path:"",component:IndexComponent},

  // Admin routing

  {path:"Ahome", component:A_HomeComponent,canActivate:[AuthGuard]},
  {path:"Aviewresort", component:A_ViewResortComponent,canActivate:[AuthGuard]},
  {path:"Aaddresort", component:A_AddResortComponent,canActivate:[AuthGuard]},
  {path:"Abookings", component:A_ViewBookingComponent,canActivate:[AuthGuard]},
  {path:"Areviews", component:A_ViewReviewsComponent,canActivate:[AuthGuard]},
  {path:"navbar", component:NavBarComponent,},
  
  //Customer routing
  {path:"Chome", component:C_HomeComponent,canActivate:[AuthGuard]},
  {path:"Cresorts", component:C_ViewResortComponent,canActivate:[AuthGuard]},
  {path:"Cbookings", component:C_ViewBookingComponent,canActivate:[AuthGuard]},
  {path:"Caddreview", component:C_AddReviewComponent,canActivate:[AuthGuard]},
  {path:"Cviewreview", component:C_ViewReviewComponent,canActivate:[AuthGuard]},
  {path:"navbar2", component:NavBar2Component,},
  {path:"Caddbooking/:resortId", component:C_AddBookingComponent,canActivate:[AuthGuard]}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
