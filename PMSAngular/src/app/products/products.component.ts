import { Component, OnInit } from '@angular/core';
import { PmsService } from '../pms.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  PID: any;
  PName:any;
  ImageName:any;
  ImageCode: any;
  Price:any;
  Discount:any;
  Quantity:any;
  IsStock:any;
  retrievedImage:any;
  base64Data: any;
  retrieveResonse: any;
  p:any = new Product();

  check:any=true;

  constructor(private productService : PmsService) {

  }

  display:any;
  onPress(x:number) {
    this.display = x;
    if(x==1)
    this.check=true;
    else
    this.check=false;

  }

  ngOnInit(): void {

    this.getProducts();
  }
  fruits:any;
  getProducts(){

    this.productService.getProducts().subscribe(response => {


      this.p = response;
      /* for(let ps of this.p)
      {
        this.base64Data = ps.ImageCode;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        this.fruits.ImageCode.push(this.retrievedImage)
      } */

      this.PID=this.p.PID;
      this.PName=this.p.PName;
      this.ImageName=this.p.ImageName;
      this.ImageCode=this.p.ImageCode;
      this.Price=this.p.Price;
      this.Discount=this.p.Discount;
      this.Quantity=this.p.Quantity;
      this.IsStock=this.p.IsStock;
      this.retrieveResonse = response;

      this.base64Data = this.ImageCode;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    },
    error=>{
      alert('An unexpected error occured');
      console.log(error);
    });

}

}class Product {
  PID:any;
  PName:any;
  ImageName:any;
  ImageCode:any;
  Price:any;
  Discount:any;
  Quantity:any;
  IsStock:any;
}
