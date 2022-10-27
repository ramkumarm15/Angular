export interface AuditRequest {
  projectName: string;
  projectOwnerName: string;
  applicationOwnerName: string;
  auditDetail: AuditDetail;
}

export interface Question {
  Question1: boolean;
  Question2: boolean;
  Question3: boolean;
  Question4: boolean;
  Question5: boolean;
}

export interface AuditDetail {
  type: string;
  date: string;
  questions: Question;
}

export class Audit {
  _Question5: boolean = false;
  _Question4: boolean = false;
  _Question3: boolean = false;
  _Question2: boolean = false;
  _Question1: boolean = false;
  _date: string = '';
  _type: string = '';
  _projectOwnerName: string = '';
  _projectName: string = '';
  _applicationOwnerName: string = '';

  
  public get Question5(): boolean {
    return this._Question5;
  }
  public set Question5(value: boolean) {
    this._Question5 = value;
  }
  public get Question4(): boolean {
    return this._Question4;
  }
  public set Question4(value: boolean) {
    this._Question4 = value;
  }
  public get Question3(): boolean {
    return this._Question3;
  }
  public set Question3(value: boolean) {
    this._Question3 = value;
  }
  public get Question2(): boolean {
    return this._Question2;
  }
  public set Question2(value: boolean) {
    this._Question2 = value;
  }
  public get Question1(): boolean {
    return this._Question1;
  }
  public set Question1(value: boolean) {
    this._Question1 = value;
  }
  public get date(): string {
    return this._date;
  }
  public set date(value: string) {
    this._date = value;
  }
  public get type(): string {
    return this._type;
  }
  public set type(value: string) {
    this._type = value;
  }
  public get projectOwnerName(): string {
    return this._projectOwnerName;
  }
  public set projectOwnerName(value: string) {
    this._projectOwnerName = value;
  }
  public get projectName(): string {
    return this._projectName;
  }
  public set projectName(value: string) {
    this._projectName = value;
  }
  public get applicationOwnerName(): string {
    return this._applicationOwnerName;
  }
  public set applicationOwnerName(value: string) {
    this._applicationOwnerName = value;
  }

  public get value(): AuditRequest {
    let data: AuditRequest = {
      projectName: this.projectName,
      projectOwnerName: this.projectOwnerName,
      applicationOwnerName: this.applicationOwnerName,
      auditDetail: {
        type: this.type,
        date: this.date,
        questions: {
          Question1: this.Question1,
          Question2: this.Question2,
          Question3: this.Question3,
          Question4: this.Question4,
          Question5: this.Question5,
        },
      },
    };
    return data;
  }
}
