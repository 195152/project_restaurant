import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form!: FormGroup;
  alertPlaceholder: HTMLElement | any;
  constructor(
    private AuthService: AuthService,
    private formBuilder: FormBuilder,
    private http: HttpClient, //to register a new user if i click on submit
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
    if (this.AuthService.userValue) {
      this.router.navigate(['']);
    }
  }
  submit(): void {
    this.AuthService.login(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: error => {
          console.log(error);
          this.alertPlaceholder = document.getElementById('alertparent');
          const appendAlert = (message: any, type: any) => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = [
              `<div id="alert01" class="alert alert-warning alert-dismissible" role="alert">`,
              `   <div>${message}</div>`,
              '   <button type="button" class="btn-close" onclick="remove()" data-bs-dismiss="alert" aria-label="Close"></button>',
              '</div>',
            ].join('');
            this.alertPlaceholder.append(wrapper);
          };
          appendAlert(error.error.message, 'success');
        },
      });
  }
}
