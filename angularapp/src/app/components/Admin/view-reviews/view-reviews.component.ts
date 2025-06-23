import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { ResortService } from 'src/app/services/resort.service';
import { Title } from '@angular/platform-browser';

interface Review {
  serialNumber: number;
  userName:string,
  resortName: string;
  review: string;
  rating: number;
  dateCreated: string;
}
@Component({
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.component.html',
  styleUrls: ['./view-reviews.component.css']
})
export class ViewReviewsComponent implements OnInit {
 
  constructor(private rs: ResortService, private titleService: Title) { }
 
  ngOnInit(): void {
    this.titleService.setTitle('Reviews');
    this.getReviews()
  }
  reviews: any[]
  username:string
  getReviews(){
    this.rs.getAllReviews().subscribe(reviews => {this.reviews = reviews; console.log(reviews)})
  }
 
 
 
}