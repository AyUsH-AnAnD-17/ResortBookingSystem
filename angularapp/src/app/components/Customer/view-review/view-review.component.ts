import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ResortService } from 'src/app/services/resort.service';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.css']
})
export class ViewReviewComponent implements OnInit {

  constructor(private resortservice : ResortService , 
    private titleService: Title,
    private authService:AuthService) { }
  reviews: any[]
  


  ngOnInit(): void {
    this.titleService.setTitle(' Customer Reviews');

    this.getReviewsByUserId();
  }
  getReviewsByUserId():void{
    //const userid=localStorage.getItem("UserId");
    const userid = this.authService.getUserId();
    if(userid !=  null)
    var id = Number(userid)
    this.resortservice.getReviewsByUserId(id).subscribe(data =>{this.reviews =  data; console.log(data)});
  }

}