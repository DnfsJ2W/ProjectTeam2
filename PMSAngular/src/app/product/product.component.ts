import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, Input, OnInit } from '@angular/core';
import { PmsService } from '../pms.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
@Input() item:any;

  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  PID: any;
  PName:any;
  ImageName:any;
  ImageCode: any;
  Image:any;
  Price:any;
  Discount:any;
  Quantity:any;
  IsStock:any;
  retrievedImage:any;
  base64Data: any;
  retrieveResonse: any;
  p:any = new Product();
  check:any;


  constructor(private productService : PmsService) {

  }

  ngOnInit(): void {
    if(this.item==2)
    this.check=false;
    else
    this.check=true;
  }

  getProductByName(PName){
    this.productService.getProduct(PName).subscribe(response => {

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

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    console.log(this.fileToUpload)
    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  AddProduct(PName,ImageName,Image,Price,Discount,Quantity,IsStock){
    this.productService.postProduct(PName,ImageName,this.fileToUpload,Price,Discount,Quantity,IsStock).subscribe(
      data =>{
        console.log('done');
        this.PID=null;
        this.PName = null;
        this.ImageName=null;
        this.Price=null;
        this.Discount=null;
        this.Quantity=null;
        this.IsStock=null;
        Image = null;
        this.imageUrl = "/assets/img/default-image.png";
      }
    );
  }

  UpdateProduct(PID, PName,ImageName,Image,Price,Discount,Quantity,IsStock){
    this.productService.putProduct(PID,PName,ImageName,this.fileToUpload,Price,Discount,Quantity,IsStock).subscribe(
      data =>{
        console.log('done');
        this.PID=null;
        this.PName = null;
        this.ImageName=null;
        this.Price=null;
        this.Discount=null;
        this.Quantity=null;
        this.IsStock=null;
        Image = null;
        this.imageUrl = "/assets/img/default-image.png";
      }
    );
  }

   OnSubmit(PID, PName,ImageName,Image,Price,Discount,Quantity,IsStock){
    if(this.item==2)
    {
      debugger;
      this.getProductByName(this.PName);
    }
    else if(this.item==3)
    this.AddProduct(PName,ImageName,Image,Price,Discount,Quantity,IsStock);
    else if(this.item==4)
    this.UpdateProduct(PID, PName,ImageName,Image,Price,Discount,Quantity,IsStock);
   }
}

class Product {
  PID:any;
  PName:any;
  ImageName:any;
  ImageCode:any;
  Price:any;
  Discount:any;
  Quantity:any;
  IsStock:any;
}


