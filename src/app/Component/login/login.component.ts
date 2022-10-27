import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

// Services
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

// Material Component
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  passwordHide: boolean = true;
  returnUrl!: string;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  snackBar(message: string): void {
    this._snackBar.open(message, 'close', {
      duration: 3 * 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  // login form for get user info
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // send an request to auth service to make HTTP POST request
  // if form is valid
  formSubmit() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (data: any) => {
          console.log(data.status);
          localStorage.setItem('access_token', data.token);
          this.auth.isLoggedIn = true;
          if (data.status == 200) this.router.navigate([this.returnUrl]);
        },
        error: (error: any) => {
          console.log(error);
          if (error.status == 400) {
            this.snackBar(error.error.message);
          }
          this.snackBar(error.statusText);
        },
      });
    }
  }
}
