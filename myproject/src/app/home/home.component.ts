import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    message = 'You are not logged in';
    constructor(
      private http:HttpClient,
    ){}
    ngOnInit(): void {
      this.http.get('http://localhost:3008/api/users').subscribe(
        res=>{
          console.log(res)
        },
        err=>{
          console.log(err)
          if (err.status === 401) {
            console.log('Unauthorized');
          }
        }
      )
    }
}
