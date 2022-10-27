import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Service/auth.service';
import { AuditService } from 'src/app/Service/audit.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Question } from 'src/app/Model/audit-request';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export default class HomeComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private audit: AuditService,
    private fb: FormBuilder
  ) {}

  private _username: string = '';
  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }
  helper = new JwtHelperService();
  questions: Question[] = [];
  questionForm: FormGroup = this.fb.group([]);

  auidtResponse: any = [];
  displayedColumns: string[] = [
    'auditId',
    'projectName',
    'projectExecutionStatus',
    'remedialActionDuration',
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  data: any;
  ngOnInit(): void {
    if (localStorage.getItem('access_token') != null) {
      this.data = this.helper.decodeToken(this.auth.getUserToken());
      console.log(
        this.data[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ]
      );
    }
    this.auth.getMe().subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('user', response);
        this.username = response.username
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.audit.getAllAuditResponse().subscribe({
      next: (response) => {
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  getUsers(): void {
    this.auth.getAllUsers().subscribe((res) => console.log(res));
  }

  auditTypeInput: any = [
    {
      name: 'Internal',
      value: 'Internal',
    },
    {
      name: 'SOX',
      value: 'SOX',
    },
  ];

  auditTypeForm = this.fb.group({
    auditType: ['', [Validators.required]],
  });
  questionInput: any = [
    { name: 'question1', no: 1 },
    { name: 'question2', no: 2 },
    { name: 'question3', no: 3 },
    { name: 'question4', no: 4 },
    { name: 'question5', no: 5 },
  ];

  projectDetailsForm = this.fb.group({
    projectName: ['', Validators.required],
    projectOwnerName: ['', Validators.required],
    applicationOwnerName: ['', Validators.required],
    date: ['', Validators.required],
    questionform: this.fb.group([]),
  });

  get questionFormArray() {
    return this.projectDetailsForm.get('questionform') as FormGroup;
  }

  getAuditQuestions(type: string) {
    this.audit.getAuditTypeQuestions(type).subscribe({
      next: (res: any) => {
        console.log(res);
        this.questions = res;
        this.questions.forEach((x, i) =>
          this.questionFormArray.addControl(
            this.questionInput[i].name,
            this.fb.control(false)
          )
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  formSubmit() {
    // this.getAuditQuestions(this.auditTypeForm.controls['auditType'].value);
    console.log(this.auditTypeForm.value);
  }
}

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
//   { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
//   { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
//   { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
//   { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
//   { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
//   { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
//   { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
//   { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
//   { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
//   { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
// ];
