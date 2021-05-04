import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'https://localhost:44335/api/AddOrder';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  constructor(private httpClient: HttpClient) { }
  create(data): Observable<any> {
    return this.httpClient.post(baseURL, data);
  }
}
