import { Component, OnInit } from '@angular/core';
import { PmsService } from '../pms.service';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  CartId:any;
  UserId:any;
  ProductId:any;
  p:any = new Cart();


  constructor(private productService : PmsService) { }

  ngOnInit(): void {
    this.GetCart();
  }
  GetCart(){
    this.productService.GetCart().subscribe(response => {
    debugger;
      this.p = response;
      this.CartId=this.p.CartId;
      this.UserId=this.p.UserId;
      this.ProductId=this.p.ProductId;
           
    },
    error=>{
      alert('An unexpected error occured');
      console.log(error);
    });

}

}

class Cart {
  CartId:any;
  UserId:any;
  ProductId:any;

}