import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<LoginComponent>,) { }

  ngOnInit(): void {
  }

  close():void{
    this.dialogRef.close();
  }
}
