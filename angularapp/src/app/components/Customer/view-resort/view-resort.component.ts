import { Component, OnInit } from '@angular/core';
import { ResortService } from 'src/app/services/resort.service';
import { NgClass } from '@angular/common';
import { Title } from '@angular/platform-browser';

 
@Component({
  selector: 'app-view-resort',
  templateUrl: './view-resort.component.html',
  styleUrls: ['./view-resort.component.css']
})
export class ViewResortComponent implements OnInit {
 
 
  constructor(private resortservice : ResortService, private titleService: Title) { }
  resorts:any[]
 
  ngOnInit(): void {
    this.titleService.setTitle('Customer Resorts');

    this.getAllResorts();
 
  }
  getAllResorts():void{
    this.resortservice.getAllResorts().subscribe(data =>{this.resorts = data;  console.log(data)})
  }

  formatPrice(price:number):string{
    return price.toLocaleString();
  }
 
}
 