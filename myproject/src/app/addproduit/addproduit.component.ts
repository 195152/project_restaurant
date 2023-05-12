import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduit',
  templateUrl: './addproduit.component.html',
  styleUrls: ['./addproduit.component.css']
})
export class AddproduitComponent {


  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,//to register a new user if i click on submit
    private router:Router
    ){
    
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      nom: new FormControl(''),
      prix: new FormControl('')
      
    });
  }
  AddProduit():void{
    console.log("souh")
    
    this.http.post('http://localhost:3008/produit', this.form.value)
  .subscribe(
    (response) => {
      console.log('ading produit successful!', response);
      // Redirect to login page
      this.router.navigate(['/produit']);
    },
    (error) => {
      console.error('An error occurred during registration:', error);
    }
  );
 
}
        
}



