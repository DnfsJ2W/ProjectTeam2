import { Component, OnInit } from '@angular/core';
import { PaymentService }from 'src/app/payment.service';
@Component({
  selector: 'app-payments',
  templateUrl:'./payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  payment = {
    OrderId:'4',
    CardNo: '',
    BankName: '',
    NameOnCard:'',
    ExpiryDate:'',
    UserId:'1'
  };
   
  submitted = false;
  constructor(private PaymentService: PaymentService) {
    
   }

  ngOnInit(): void {
  }
  createPayment(): void {
   debugger;
    const data = {
      CardNo: this.payment.CardNo,
      BankName: this.payment.BankName,
      NameOnCard: this.payment.NameOnCard,
      ExpiryDate: this.payment.ExpiryDate,
      UserId: this.payment.UserId,
    
    };

    this.PaymentService.create(data)   
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
      }
     
    }



