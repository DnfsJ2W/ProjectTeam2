import { Component, OnInit } from '@angular/core';
import { PmsService } from '../pms.service';
import {CartItemsModel} from '../CartItemsModel';
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
  cartItems: CartItemsModel[] = [];

  y:any=true;
  signIn:any=true;
  check:any=true;
  checkNav:any=false;
  constructor(private productService : PmsService) {

  }

  display:any;
  onPress(x:number) {

    this.display = x;
    if(x==1)
    {
      this.check=true;
    }
    else
    {
    this.check=false;
    this.y=false;
    }
  }

  ngOnInit(): void {

    this.getProducts();
  }
  getProductByName(PName){
    this.productService.getProductsByName(PName).subscribe(response => {
      this.p = response;
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



  addToCart(PID) {

    let x = this.p.filter(x => x.PID == PID);


    if(this.cartItems.filter(x=> x.pid == PID).length>0){
      this.cartItems.filter(x=> x.pid == PID)[0].quantity = this.cartItems.filter(x=> x.pid == PID)[0].quantity + 1;
      this.cartItems.filter(x=> x.pid == PID)[0].totalPrice = this.cartItems.filter(x=> x.pid == PID)[0].price*this.cartItems.filter(x=> x.pid == PID)[0].quantity;
    }
    else  {
      let item = new CartItemsModel();
      item.pid = PID;
      item.price=x[0].Price;
      item.productName= x[0].PName;
      item.quantity=1;
      item.totalPrice = x[0].Price*item.quantity;

      this.cartItems.push(item);
    }
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
  onNav(x:any){
    this.display = x;
    if(x==7 || x==6)
    this.signIn=false;
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
