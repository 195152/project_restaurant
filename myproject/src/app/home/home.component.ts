import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message = 'You are not logged in';
  user: User;

  constructor(private accountService: AuthService, private router: Router) {
    this.user = this.accountService.userValue;
  }
  ngOnInit(): void {
    if (this.user && this.accountService.validateToken()) {
      this.router.navigate(['/produits']);
    }
    if (!this.user || !this.accountService.validateToken()) {
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 500);
    }
  }
}
