import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,//to register a new user if i click on submit
    private router:Router
    ){
    
  }
  ngOnInit(): void{
    this.form = this.formBuilder.group({
      nom:'',
      email:'',
      password:''
      
    })
  }
  submit():void{
    
    this.http.post('http://localhost:3008/api/register', this.form.getRawValue())
  .subscribe(
    (response) => {
      console.log('Registration successful!', response);
      // Redirect to login page
      this.router.navigate(['/login']);
    },
    (error) => {
      console.error('An error occurred during registration:', error);
    }
  );
 
}
        
}


