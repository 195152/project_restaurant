import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  user: User;

  constructor(private accountService: AuthService, private router: Router) {
    this.user = this.accountService.userValue;
    this.accountService.userSubject.subscribe(() => this.ngOnInit());
  }
  ngOnInit(): void {
    this.user = this.accountService.userValue;
  }
  disconnect(): void {
    this.accountService.disconnect();
    this.router.navigate(['']);
  }
}
