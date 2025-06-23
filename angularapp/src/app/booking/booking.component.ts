import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(private bookingservice:BookingService) { }
  booking:any[]
  ngOnInit(): void {
    this.bookingservice.getAllBookings().subscribe(booking=>this.booking=booking)
  }

}
