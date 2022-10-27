import * as core from '@angular/core';
import * as router from '@angular/router';
import * as auditRequestComponent from './Component/audit-request/audit-request.component';
import * as homeComponent from './Component/home/home.component';
import * as loginComponent from './Component/login/login.component';
import * as registerComponent from './Component/register/register.component';
import * as authGuard from './Guard/auth.guard';

const routes: router.Routes = [
  { path: 'login', component: loginComponent.LoginComponent },
  { path: 'register', component: registerComponent.RegisterComponent },
  {
    path: '',
    component: homeComponent.default,
    canActivate: [authGuard.AuthGuard],
  },
  {
    path: 'createRequest',
    component: auditRequestComponent.AuditRequestComponent,
    canActivate: [authGuard.AuthGuard],
  },
];

@core.NgModule({
  imports: [router.RouterModule.forRoot(routes)],
  exports: [router.RouterModule],
})
export class AppRoutingModule {}
