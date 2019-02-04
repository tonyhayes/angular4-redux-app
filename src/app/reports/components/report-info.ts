import { Component, Input } from '@angular/core';

import { Report } from '../models/report';

@Component({
  selector: 'analytics-report-info',
  template: `
    <h5 mat-subheader>Report Info:</h5>
    <div *ngIf="scheduled">
      Next Run: {{ nextRun | date:'medium' }}
    </div>
    <div>
      Last Run: {{ lastRun | date:'medium' }}
    </div>
    <div>
      Status: {{ status }}
    </div>
  `,
  styles: [
    `
    h5 {
      margin-bottom: 5px;
    }
  `,
  ],
})
export class ReportInfoComponent {
  @Input() report: Report;
  @Input() scheduled: boolean = false;

  get nextRun() {
    if (this.report.scheduleInfo) {
      return this.report.scheduleInfo.nextRun;
    }
    return Date.now();
  }
  get lastRun() {
    if (this.report.scheduleInfo) {
      return this.report.scheduleInfo.lastRun;
    }
    return Date.now();
  }
  get status() {
    if (this.report.scheduleInfo) {
      return this.report.scheduleInfo.status;
    }
    return 'Normal';
  }
}
