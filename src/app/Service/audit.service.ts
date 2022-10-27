import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  private url: string = 'https://localhost:44309/api/AuditChecklist';

  constructor(private http: HttpClient) {}

  getAuditTypeQuestions(auditType: string) {
    return this.http.get(`${this.url}/${auditType}`);
  }

  getAllAuditResponse(): Observable<any> {
    return this.http.get('https://localhost:44397/api/AuditSeverity/GetAll');
  }
}
