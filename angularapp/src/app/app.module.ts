import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



import { NavBarComponent} from './components/Admin/nav-bar/nav-bar.component';
import { ViewResortComponent } from './components/Admin/view-resort/view-resort.component';
import { ViewBookingComponent } from './components/Admin/view-booking/view-booking.component';
import { ViewReviewsComponent } from './components/Admin/view-reviews/view-reviews.component';
import { HomeComponent } from './components/Admin/home/home.component';
import { AddResortComponent } from './components/Admin/add-resort/add-resort.component';
 
 
import { AddBookingComponent } from './components/Customer/add-booking/add-booking.component';
import { AddReviewComponent } from './components/Customer/add-review/add-review.component';
import { ViewReviewComponent } from './components/Customer/view-review/view-review.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { NavBar2Component } from './components/Customer/nav-bar2/nav-bar2.component';
import { HomeComponent  as C_HomeComponent } from './components/Customer/home/home.component';
import { ViewBookingComponent as C_ViewBookingComponent} from './components/Customer/view-booking/view-booking.component';
import { ViewResortComponent as C_ViewResortComponent } from './components/Customer/view-resort/view-resort.component';
import { UnauthorizedUserMessageComponent } from './unauthorized-user-message/unauthorized-user-message.component';
 import { AuthGuard } from './services/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RegistrationComponent,
    LoginComponent,
    ViewResortComponent,
    ViewBookingComponent,
    ViewReviewsComponent,
    AddBookingComponent,
    AddReviewComponent,
    ViewReviewComponent,
    ErrorPageComponent,
    HomeComponent,
    AddResortComponent,
    NavBarComponent,
    NavBar2Component,
    C_HomeComponent,
    C_ViewBookingComponent,
    C_ViewResortComponent,
    UnauthorizedUserMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }