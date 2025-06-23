import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
// import { BookingService } from 'src/app/services/booking.service';
// import { Subscription, timer } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BookingService } from 'src/app/services/booking.service';
 
@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit, OnDestroy {
  bookings: any[];
  private updateSubscription: Subscription;
 
  constructor(private bookingService: BookingService) { }
 
  ngOnInit(): void {
    this.getAllBookings();
    // Set up a timer to refresh data every 10 seconds
    this.updateSubscription = timer(0, 2000).pipe(
      switchMap(() => this.bookingService.getAllBookings())
    ).subscribe(data => {
      this.bookings = data.map(booking => ({ ...booking, isButtonsDisabled: this.isButtonsDisabled(booking) }));
    });
  }
 
  ngOnDestroy(): void {
    // Unsubscribe from the timer when the component is destroyed
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
 
  simplealert() {
  }
 
  confirm() {
 
  }
 
  getAllBookings(): void {
    this.bookingService.getAllBookings().subscribe(data => {
      this.bookings = data.map(booking => ({ ...booking, isButtonsDisabled: this.isButtonsDisabled(booking) }));
      console.log(data);
    });
  }
 
  formatPrice(price: number): string {
    return price.toLocaleString();
  }
 
  acceptd: string = "Accepted";
 
  acceptBooking(booking: any): void {
    if(confirm("Are you sure you want to accept this booking?")){

    this.updateBookingStatus(booking.bookingId, this.acceptd);
    booking.isButtonsDisabled = true;
    this.saveToLocalStorage();
    }
  }
 
  rejectd: string = "Rejected";
 
  rejectBooking(booking: any): void {
    if(confirm("Are you sure you want to reject this booking?")){

    this.updateBookingStatus(booking.bookingId, this.rejectd);
    booking.isButtonsDisabled = true;
    this.saveToLocalStorage();
    }
  }
 
  private updateBookingStatus(bookingId: number, newStatus: string): void {
    this.bookingService.updateBooking(bookingId, newStatus).subscribe(
      () => {
        console.log(`Booking ${newStatus}:`, bookingId, newStatus);
      },
      (error) => {
        console.error(`Error ${newStatus.toLowerCase()} booking:`, error);
      }
    );
  }
 
  private isButtonsDisabled(booking: any): boolean {
    return booking.status !== 'Pending';
  }
 
  private saveToLocalStorage(): void {
    // Save the bookings data to local storage
    localStorage.setItem('bookings', JSON.stringify(this.bookings));
  }
}