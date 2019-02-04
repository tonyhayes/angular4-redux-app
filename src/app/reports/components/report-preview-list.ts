import { Component, Input } from '@angular/core';
import { Report } from '../models/report';

@Component({
  selector: 'analytics-report-preview-list',
  template: `
    <analytics-report-preview *ngFor="let report of reports" [report]="report" [scheduled]="scheduled"></analytics-report-preview>
  `,
  styles: [
    `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `,
  ],
})
export class ReportPreviewListComponent {
  @Input() reports: Report[];
  @Input() scheduled: boolean = false;
}
