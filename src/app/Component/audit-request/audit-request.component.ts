import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Audit, AuditDetail, AuditRequest } from 'src/app/Model/audit-request';
import { Question } from 'src/app/Model/Question';
import { AuditService } from 'src/app/Service/audit.service';

@Component({
  selector: 'app-audit-request',
  templateUrl: './audit-request.component.html',
  styleUrls: ['./audit-request.component.css'],
})
export class AuditRequestComponent implements OnInit {
  questions: Question[] = [];
  questionForm: FormGroup = this.fb.group([]);

  constructor(private audit: AuditService, private fb: FormBuilder) {}

  ngOnInit(): void {}

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

  auditTypeFormData(): any {
    return this.auditTypeForm.value;
  }

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

  projectDetailsFormData(): any {
    return this.projectDetailsForm.value;
  }

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
    this.getAuditQuestions(this.auditTypeForm.controls['auditType'].value);
  }

  formValid() {
    let auditRequestResult = new Audit();
    let formData = this.projectDetailsFormData();
    let auditTypeData = this.auditTypeFormData();

    auditRequestResult.applicationOwnerName = formData.applicationOwnerName;
    auditRequestResult.projectName = formData.projectName;
    auditRequestResult.projectOwnerName = formData.projectOwnerName;
    auditRequestResult.type = auditTypeData.auditType;
    auditRequestResult.date = formData.date;
    auditRequestResult.Question1 = formData.questionform.question1;
    auditRequestResult.Question2 = formData.questionform.question2;
    auditRequestResult.Question3 = formData.questionform.question3;
    auditRequestResult.Question4 = formData.questionform.question4;
    auditRequestResult.Question5 = formData.questionform.question5;

    console.log(auditRequestResult.value);
  }
}
