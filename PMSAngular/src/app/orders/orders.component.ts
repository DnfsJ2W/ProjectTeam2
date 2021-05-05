import { Component, OnInit } from '@angular/core';
import { PmsService } from '../pms.service';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html', 
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  OrderId:any;
  ProductId:any;
  ProductQuantity:any;
  UserId:any;
  BookingOn:any;
  DeliveredOn:any;
  p:any = new emp();

  

  constructor(private productService : PmsService) { }

  ngOnInit(): void {
    this.GetPlacedOrders();
  }
  GetPlacedOrders(){
    this.productService.GetPlacedOrders().subscribe(response => {
    debugger;
      this.p = response;
      this.OrderId=this.p.OrderId;
      this.ProductId=this.p.ProductId;
      this.ProductQuantity=this.p.ProductQuantity;
      this.UserId=this.p.UserId;
      this.BookingOn=this.p.BookingOn;
      this.DeliveredOn=this.p.DeliveredOn;
     

    },
    error=>{
      alert('An unexpected error occured');
      console.log(error);
    });

}



}



class emp {
  OrderId:any;
  ProductId:any;
  ProductQuantity:any;
  UserId:any;
  BookingOn:any;
  DeliveredOn:any;

}


