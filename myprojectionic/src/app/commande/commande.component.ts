import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
})
export class CommandeComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient, //to register a new user if i click on submit
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nom: '',
      email: '',
      nomproduit: '',
      prix: '',
    });
  }
  // addcommande():void{
  //   console.log(this.form.getRawValue())
  //   this.http.post('http://localhost:3008/commande', this.form.getRawValue())
  // .subscribe(
  //   (response) => {
  //     console.log('Registration successful!', response);
  //     // Redirect to login page
  //     this.router.navigate(['/login']);
  //   },
  //   (error) => {
  //     console.error('An error occurred during registration:', error);
  //   }
  // );

  //}
  addcommande(): void {
    console.log(this.form.getRawValue());
    this.http
      .post('http://localhost:3008/commande', this.form.getRawValue())
      .subscribe(
        response => {
          console.log('Command added successfully!', response);
          // Redirect to some other page or show a success message
        },
        error => {
          console.error('An error occurred while adding command:', error);
          // Show an error message to the user
        }
      );
  }
}
