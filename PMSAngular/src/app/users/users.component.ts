import { Component, OnInit } from '@angular/core';
import { PmsService } from '../pms.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private productService : PmsService) { }

  IsAdmin:any;
  FirstName:any;
  LastName:any;
  UserName:any;
  Password:any;
  Email:any;
  Phone:any;
  CurrentAddress:any;
  PermanentAddress:any;
  State:any;
  Pincode:any;

  ngOnInit(): void {
  }

  OnSubmit(FirstName, LastName, UserName, Password, Email, Phone, CurrentAddress, PermanentAddress, State, Pincode, IsAdmin?){
      this.productService.postUsers(FirstName, LastName, UserName, Password, Email, Phone, CurrentAddress, PermanentAddress, State, Pincode, IsAdmin).subscribe(
      data =>{
        console.log('done');
      },
      error=>{
        if(error)
        debugger;
        alert('An unexpected error occured');
        console.log(error);
      }
    );
  }
}

