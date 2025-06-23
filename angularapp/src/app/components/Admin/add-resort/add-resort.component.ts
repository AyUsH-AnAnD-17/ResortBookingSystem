import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ResortService } from 'src/app/services/resort.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-resort',
  templateUrl: './add-resort.component.html',
  styleUrls: ['./add-resort.component.css']
})
export class AddResortComponent implements OnInit {
  resortForm: FormGroup;
  selectedFile: File;
  base64String: string;

  constructor(private fb: FormBuilder, 
    private titleService: Title,
    private resortService: ResortService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('Admin Add Resorts');
    this.resortForm = this.fb.group({
      resortName: ['', [Validators.required]],
      resortImageUrl: ['', [Validators.required]], // Handle file input separately
      resortLocation: ['', [Validators.required]],
      resortAvailableStatus: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.base64String = reader.result as string;
    };
  }


  onSubmit(): void {
    if (this.resortForm.invalid || !this.selectedFile || !this.base64String) {
      return;
    }
    const resort = this.resortForm.value;
    resort.resortImageUrl = this.base64String; // Set the Base64 string to the form value
    console.log('User payload:', resort);

    this.resortService.addResort(resort).subscribe(
      () => {
        alert('Resort add successfully.');
        this.router.navigate(['/Aviewresort']);
      },
      error => {
        alert('Adding resort failed!');

        if (error.error instanceof ErrorEvent) {
          console.error('Client-side error:', error.error.message);
        } else {
          console.error('Server-side error:', error.error);
        }
      }
    );
  }
}

