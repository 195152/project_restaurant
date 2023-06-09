import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  alertPlaceholder: HTMLElement | any;
  @ViewChild('alertParent') alertParentRef!: ElementRef;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
    if (this.authService.userValue) {
      this.router.navigate(['']);
    }
  }

  ngAfterViewInit(): void {
    this.alertPlaceholder = this.alertParentRef.nativeElement;
  }

  submit(): void {
    this.authService.login(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (error) => {
          console.log(error);
          const appendAlert = (message: any, type: any) => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = `
              <div id="alert01" class="alert alert-warning alert-dismissible" role="alert">
                <div>${message}</div>
                <button type="button" class="btn-close" onclick="remove()" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            `;
            this.alertPlaceholder.append(wrapper);
          };
          appendAlert(error.error.message, 'success');
        },
      });
  }
}
