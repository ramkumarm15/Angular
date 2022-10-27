import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import { AuditRequestComponent } from '../Component/audit-request/audit-request.component';
import HomeComponent from '../Component/home/home.component';
import { LoginComponent } from '../Component/login/login.component';
import { PopupComponent } from '../Component/popup/popup.component';
import { RegisterComponent } from '../Component/register/register.component';
import { NotificationComponent } from '../SharedComponent/notification/notification.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AuditRequestComponent,
    PopupComponent,
    NotificationComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AuditRequestComponent,
    PopupComponent,
    NotificationComponent,
  ],
})
export class SharedModule {}
