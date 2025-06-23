import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {
  showConfirmDialog: boolean = false;
  bookings:any[]
  constructor(private service: BookingService,
    private titleService: Title,
    private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Customer Bookings');

    this.displayBookings()
  }
 
  confirmDelete(booking:any):void{
    if(booking.status !=='Accepted'){
      if(confirm("Are you sure you want to delete this booking?")){
        this.deleteItem(booking.bookingId)   
      }
    }
    else{
      this.cancelDelete(booking);
    }
  }

  cancelDelete(booking:any): void {
    alert('Your Booking is already accepted, booking can not be deleted !');

  }
 
  deleteItem(bookingId: number): void {
    this.service.deleteBooking(bookingId).subscribe(()=>{
      this.displayBookings();
    });
    console.log('Item deleted');
    this.showConfirmDialog = false;
  }
 
  displayBookings():void{
    const userid=this.authService.getUserId()
    if(userid !=  null)
    var id = Number(userid)
    this.service.getBookingsByUserId(id).subscribe(data=>{this.bookings=data; console.log(data)});
  }
  
  formatPrice(price:number):string{
    return price.toLocaleString();
  }
 
 
}