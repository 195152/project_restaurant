import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private AuthService: AuthService,
    private formBuilder: FormBuilder,
    private http: HttpClient, //to register a new user if i click on submit
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nom: '',
      email: '',
      password: '',
    });
    if (this.AuthService.userValue) {
      this.router.navigate(['']);
    }
  }
  submit(): void {
    this.AuthService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: error => {},
      });
  }
}
