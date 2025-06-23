import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { ResortService } from 'src/app/services/resort.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  reviewForm: FormGroup;

  userid: number;
  username: string;
  //if(userid !=  null)
  //var id = Number(userid)

  resortNames: any[]

  constructor(private formBuilder: FormBuilder, 
    private service: ResortService, 
    private bookingservice: BookingService, 
    private titleService: Title,
    private router :Router,
    private authService:AuthService) { }


  ngOnInit(): void {
    this.titleService.setTitle('Customer Add Review');


    //const id=localStorage.getItem("UserId");
    const id = this.authService.getUserId();
    if (id != null)
      this.userid = Number(id);

    //const userNAme = localStorage.getItem("UserName");
    const userName=this.authService.getUserName();
    if (userName != null)
      this.username = String(userName);

    this.getBookingsByUserId();


    this.reviewForm = this.formBuilder.group({
      userId: [''],
      userName: [{ value: this.username, disabled: true }], // Assuming the user name is pre-filled and not editable
      subject: ['', Validators.required],   // Dropdown selection required
      body: ['', [Validators.required, Validators.minLength(10)]], // Required and minimum length of 10
      rating: [null, Validators.required],     // Rating is required
      dateCreated: ['']

    });

    this.reviewForm.patchValue({
      userId: this.userid,
      dateCreated: new Date()
    })
  }
  getBookingsByUserId(): void {
    this.bookingservice.getBookingsByUserId(this.userid).subscribe(data => {
      //  this.resortNames = data, console.log(data) 
    const uniqueResortNames = Array.from(new Set(data.map(booking => booking.resort.resortName)));
    this.resortNames = uniqueResortNames.map(resortName => ({ resortName }));
    console.log(this.resortNames);

      })
  }

  addReview(): void {
    this.service.addReview(this.reviewForm.value).subscribe(data => { 
      console.log('Review Added Successfully:', data); 
      this.router.navigateByUrl('/Cviewreview');
      // window.location.href = '/Cviewreview' 
    });
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      // Process the form data
      console.log(this.reviewForm.value);
      alert("Review Added Successfully.")
      this.addReview();
      
    } else {
      // If the form is not valid, touch all controls to trigger the display of error messages
      for (const control in this.reviewForm.controls) {
        this.reviewForm.controls[control].markAsTouched();
        // alert("Error occured! ")

      }
    }
  }
}