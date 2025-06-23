

import { Component, OnInit, createPlatform, createPlatformFactory } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validator } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { ResortService } from 'src/app/services/resort.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {
  bookingForm: FormGroup;
  resort: any;
  userid: number;
  minFromDate: string; // Minimum from date for the calendar
  minToDate: string; // Minimum to date for the calendar
  updated_Resort: any
  resortName: string
  temp_price: number
  newTotalPrice:number;

  count_booking: number; //store the sum of booking by resort id

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private resortService: ResortService,
    private bookingService: BookingService,
    private router: Router,
    private userService: AuthService,
    private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Customer Add Booking');

    //const id=localStorage.getItem("UserId");
    const id = this.userService.getUserId();
    if (id != null)
      this.userid = Number(id);

    this.route.paramMap.subscribe((params: ParamMap) => {
      const resortId = +params.get('resortId');
      console.log(resortId)
      this.resortService.getResortById(resortId).subscribe(data => {
        this.resort = data;
        console.log(data);
        this.createForm();
      },
        (error) => {
          console.log('Error fetching the Resort details:', error);
        });
    });
    this.minFromDate = this.getCurrentDate();
    this.minToDate = this.minFromDate;
  }

  createForm() {
    this.bookingService.getTotalSumOfBookingByResortId(this.resort.resortId).subscribe(data => {
      this.count_booking = data;
      const temp1 = this.resort.capacity - this.count_booking;    //update resort count based on number of bookings

      console.log(this.count_booking);
      this.bookingForm = this.fb.group({

        resortName: [{ value: this.resort.resortName, disabled: true }],
        totalPrice: [{ value: this.resort.price, disabled: true }],
        resortLocation: [{ value: this.resort.resortLocation, disabled: true }],
        resortCapacity: [{ value: this.resort.capacity, disabled: true }],

        availableCapacity: [{ value: temp1, disabled: true }],

        yourAddress: ['', Validators.required],
        numberOfPersons: ['', [Validators.required, Validators.min(1), Validators.max(temp1)]],
        fromDate: ['', [Validators.required, this.validateDate]],
        toDate: ['', [Validators.required, this.validateToDate]],
        status: ['Pending'],
        userId: [''],
        resortId: ['']

      }, { validator: dateRangeValidator() });

      //get the input by the user in the form and apply functionality.
      this.bookingForm.get('numberOfPersons').valueChanges.subscribe(() => this.updateTotalPrice());
      this.bookingForm.get('fromDate').valueChanges.subscribe(() => this.updateTotalPrice());
      this.bookingForm.get('toDate').valueChanges.subscribe(() => this.updateTotalPrice());
      
      //set the total calculated price in the totalPrice field.
      this.bookingForm.get('totalPrice').setValue(this.newTotalPrice);
      this.bookingForm.patchValue({
        userId: this.userid,
        resortId: this.resort.resortId
      });
    });
  }
  updateTotalPrice() {
    const numberOfPersons = this.bookingForm.get('numberOfPersons').value;
    const fromDate = this.bookingForm.get('fromDate').value;
    const toDate = this.bookingForm.get('toDate').value;
    const fixedPrice = this.resort.price;

    if (numberOfPersons && fromDate && toDate) {
      const noOfDays = this.calculateDaysBetween(fromDate, toDate);
      this.newTotalPrice = numberOfPersons * fixedPrice * noOfDays;
      this.bookingForm.patchValue({ totalPrice: this.newTotalPrice });
    }
  }

  calculateDaysBetween(fromDateStr: string, toDateStr: string): number {
    const fromDate = new Date(fromDateStr);
    const toDate = new Date(toDateStr);
    const timeDiff = toDate.getTime() - fromDate.getTime();
    if(timeDiff>0)
      return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Round up to the next whole number
    else
      return 0;
    }

  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0]; // Get current date in 'yyyy-mm-dd' format
  }

  validateDate(control: any) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    return selectedDate >= currentDate ? null : { pastDate: true };
  }

  validateToDate(control: any) {
    const fromDate = new Date(control.parent?.get('fromDate').value);
    const toDate = new Date(control.value);
    return toDate >= fromDate ? null : { invalidToDate: true };
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const fromDataToSend = {
        noOfPersons: this.bookingForm.get('numberOfPersons').value,
        fromDate: this.bookingForm.get('fromDate').value,
        toDate: this.bookingForm.get('toDate').value,
        totalPrice: this.bookingForm.get('totalPrice').value,
        address: this.bookingForm.get('yourAddress').value,
        status: this.bookingForm.get('status').value,
        userId: this.bookingForm.get('userId').value,
        resortId: this.bookingForm.get('resortId').value

      };

      if (this.count_booking > fromDataToSend.noOfPersons) {
        alert("Enter number of persons is more than available capacity!")
      }
      else {
        this.bookingService.addBooking(fromDataToSend).subscribe(data => {
          console.log('Booking Added: ', data),
            this.router.navigate(['/Cbookings']), alert("Your Booking is successful.");
        },
        (error) => {

          console.log("Error adding booking: ", error);
          alert("Booking can not be made! Booking is already made on same dates.")
        });
      }
    }
  }
}

export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const fromDate = control.get('fromDate').value;
    const toDate = control.get('toDate').value;

    // Convert fromDate and toDate to Date objects
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);

    // Check if fromDate is less than toDate
    if (fromDateObj >= toDateObj) {
      return { 'dateRangeInvalid': true };
    }
    // Check if there is at least 1 day difference
    const oneDay = 24 * 60 * 60 * 1000;  // One day in ms
    if ((toDateObj.getTime() - fromDateObj.getTime()) < oneDay) {
      return { 'dateDifferenceInvalid': true };
    }

    return null; // Validation passed
  };
}

