import { Component, OnInit } from '@angular/core';
import { ResortService } from 'src/app/services/resort.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-resort',
  templateUrl: './view-resort.component.html',
  styleUrls: ['./view-resort.component.css']
})
export class ViewResortComponent implements OnInit {
  resorts: any[];
  originalResorts: any[];
  flag1: number = 0;
  tempid: number;
  temp: any;

  constructor(private resortService: ResortService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('View Resorts');
    this.getAllResorts();
  }

  getAllResorts(): void {
    this.resortService.getAllResorts().subscribe(data => {
      this.resorts = data.map(resort => ({ ...resort, isEditing: false }));
      console.log(data);
    });
  }

  editResort(resort: any): void {
    if (this.flag1 == 0) {
      this.originalResorts = JSON.parse(JSON.stringify(this.resorts));

      resort.isEditing = true;
      this.flag1 = 1; //disable edit button if once clicked
    }
  }

  saveResort(resort: any, resortId: number): void {
    resort.isEditing = false;
    this.flag1 = 0; // enable condition of edit button

    // Convert the image to base64 string if it exists
    let updatedResortData = { ...resort };
    if (resort.base64String) {
      updatedResortData = {
        ...updatedResortData,
        resortImageUrl: resort.base64String // Assuming you store base64 string directly as image URL
      };
    }

    // Prepare the resort data to be sent to the backend
    const resortDataToSend = {
      resortId:updatedResortData.resortId,
      resortName: updatedResortData.resortName,
      description: updatedResortData.description,
      resortImageUrl: updatedResortData.resortImageUrl,
      resortAvailableStatus: updatedResortData.resortAvailableStatus,
      resortLocation: updatedResortData.resortLocation,
      capacity: updatedResortData.capacity,
      price: updatedResortData.price
    };

    this.resortService.updateResort(resortDataToSend).subscribe(
      success => {
        // console.log('Update successful');
        alert('Update successful');
        // Update the resorts array with the updated data
        const index = this.resorts.findIndex(r => r.id === resortId);
        if (index !== -1) {
          this.resorts[index] = { ...this.resorts[index], ...resortDataToSend };
        }
      },
      error => alert('Update failed')
    );
  }

  cancelEdit(resort: any): void {
    resort.isEditing = false;
    this.flag1 = 0;
    this.resorts = [...this.originalResorts];
  }

  confirmDelete(resortId: number): void {
    if (confirm('Are you sure you want to delete this resort?')) {
      this.resortService.deleteResort(resortId).subscribe(
        success => {
          alert('Resort deletion successful');
          this.getAllResorts(); // Reload the list after deletion
        },
        error => alert('Deletion failed! Booking is already made by customer.')
      );
    }
  }

  onFileChanged(event: any, resort: any): void {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      resort.base64String = reader.result as string;
      resort.resortImageUrl=reader.result as string;
    };
  }

  formatPrice(price: number): string {
    return price.toLocaleString();
  }
}
