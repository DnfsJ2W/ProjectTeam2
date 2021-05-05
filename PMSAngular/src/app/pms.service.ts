import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PmsService {

  endpoint = 'https://localhost:44335/api/';

  constructor(private http : HttpClient) { }

  getProducts() {
    return this.http.get(this.endpoint+'GetProducts');
  }

  getProduct(PID: any) {

    return this.http.get(this.endpoint+'GetProduct/'+PID);
  }

  getProductsByName(PName: any) {
    return this.http.get(this.endpoint+'GetProductsByName/'+PName);
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
    return this.http.post(this.endpoint+'AddProduct', formData);
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

  postUsers(FirstName: string, LastName: string, UserName: string, Password: string, Email: string, Phone:string, CurrentAddress: string, PermanentAddress: string, State: string, Pincode: string, IsAdmin: any) {
    //const endpoint = 'https://localhost:44335/api/RegisterUser';

    const formData: FormData = new FormData();
    formData.append('FirstName', FirstName);
    formData.append('LastName', LastName);
    formData.append('UserName', UserName);
    formData.append('Password', Password);
    formData.append('Email', Email);
    formData.append('CurrentAddress', CurrentAddress);
    formData.append('PermanentAddress', PermanentAddress);
    formData.append('Pincode', Pincode);
    formData.append('State', State);
    if(IsAdmin)
    formData.append('IsAdmin', IsAdmin);
    console.log('service code')
    return this.http.post(this.endpoint+'RegisterUser',formData);
  }

  getUsers(user:any) {
    const formData: FormData = new FormData();
    formData.append('UserName', user.UserName);
    formData.append('Password', user.Password);

    return this.http.post(this.endpoint+'GetUsers',formData);
  }
}
