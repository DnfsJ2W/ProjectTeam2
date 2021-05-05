import { Component, OnInit } from '@angular/core';
import { PmsService } from '../pms.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private productService : PmsService) { }

  ngOnInit(): void {
  }
  UserName:any;
  Password:any;
  user:any;
  u:any =new User();

  OnSubmit(UserName, Password)
  {
    this.u.UserName=UserName;
    this.u.Password=Password;

    this.productService.getUsers(this.u).subscribe(
      data => {

        this.UserName = '';
      }
    )
  }
}
class User
{
  UserName:any;
  Password:any;
}
