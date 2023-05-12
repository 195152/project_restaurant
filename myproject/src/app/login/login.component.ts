import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  
  constructor(
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private http:HttpClient,//to register a new user if i click on submit
    private router:Router
    ){
    
  }
  ngOnInit(): void{
    this.form = this.formBuilder.group({
      
      email:'',
      password:''
      
    })
  }
  submit(): void {
    this.http.post('http://localhost:3008/api/login', this.form.getRawValue(), { withCredentials: true })
      .subscribe(
        (response: any) => {
          console.log('Login successful!');
          // set the token as a cookie
          const expires = new Date();
          expires.setDate(expires.getDate() + 1);
          
          
          this.cookieService.set('token', response.token, expires, 'localhost:4200', undefined, true, 'Strict');
          console.log(this.cookieService.get('token'));
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('An error occurred during login:', error);
          // Display error message to user
        }
      );
  
  }
}
//(()=>this.router.navigate(['/login']))