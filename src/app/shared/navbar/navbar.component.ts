import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  get username() {
    return this.auth.getUsername;
  }

  logout(): void {
    this.auth.logout();
  }
}
