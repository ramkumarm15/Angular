import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

interface SnackData {
  message: string;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  message: string = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackData) {}

  ngOnInit(): void {}
}
