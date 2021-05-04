import { Component } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PMSAngular';
  ngOnInit(){

     $(document).ready(function () {

         $('#dismiss, .overlay').on('click', function () {
             $('#sidebar').removeClass('active');
             $('.overlay').removeClass('active');
         });
         $('#sidebarCollapse').on('click', function () {
             $('#sidebar').addClass('active');
             $('.overlay').addClass('active');
             $('.collapse.in').toggleClass('in');
             $('a[aria-expanded=true]').attr('aria-expanded', 'false');
         });
     });
 }
}
