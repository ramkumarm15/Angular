import * as core from '@angular/core';
import * as authService from 'src/app/Service/auth.service';

@core.Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements core.OnInit {
  constructor(private auth: authService.AuthService) {}

  ngOnInit(): void {}

  logout(): void {
    this.auth.logout();
  }
}
