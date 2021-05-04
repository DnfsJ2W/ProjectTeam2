import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PmsService {

  endpoint = 'https://localhost:44335/api/';

  constructor(private http : HttpClient) { }

  getProducts() {
    return this.http.get(this.endpoint+'/GetProducts');
  }

  getProduct(PName: any) {
    return this.http.get(this.endpoint+'/GetProduct/'+PName);
  }

  postProduct(PName: string, ImageName: string, fileToUpload: File,Price: string, Discount: string,Quantity: string, IsStock: string) {
    //const endpoint = 'https://localhost:44335/api/AddProduct';

    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('PName', PName);
    formData.append('ImageName', ImageName);
    formData.append('Discount', Discount);
    formData.append('Price', Price);
    formData.append('Quantity', Quantity);
    formData.append('IsStock', IsStock);
    console.log('service code')
    return this.http.post(this.endpoint+'/AddProduct', formData);
  }

  putProduct(PID: number, PName: string, ImageName: string, fileToUpload: File,Price: string, Discount: string,Quantity: string, IsStock: string) {
    //const endpoint = 'https://localhost:44335/api/UpdateProduct/1';

    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('PName', PName);
    formData.append('ImageName', ImageName);
    formData.append('Discount', Discount);
    formData.append('Price', Price);
    formData.append('Quantity', Quantity);
    formData.append('IsStock', IsStock);
    console.log(PID+PName)
    console.log('service code')
    return this.http.put(this.endpoint+'UpdateProduct/'+PID, formData);
  }
  
    DeleteProduct(PID){
     return this.http.delete(this.endpoint+'DeleteProduct/'+PID)
  }
}
