import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-addproduit',
  templateUrl: './addproduit.component.html',
  styleUrls: ['./addproduit.component.css'],
})
export class AddproduitComponent {
  form!: FormGroup;
  alertPlaceholder: HTMLElement | any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient, //to register a new user if i click on submit
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      nom: new FormControl(''),
      prix: new FormControl(''),
      description: new FormControl(''),
    });
  }
  AddProduit(): void {
    this.alertPlaceholder = document.getElementById('alertparent');
    const appendAlert = (message: any, type: any) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = [
        `<div id="alert01" class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" onclick="remove()" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>',
      ].join('');
      this.alertPlaceholder.append(wrapper);
    };

    this.http
      .post('http://localhost:3008/produit', this.form.value)
      .pipe(
        map((data: any) => {
          this.form.reset();
          appendAlert('saved !', 'success');
          return;
        }),
        catchError((err, caught) => {
          appendAlert(err.error.message, 'warning');
          return err;
        })
      )
      .subscribe();
  }
}
