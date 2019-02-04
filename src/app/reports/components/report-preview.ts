import { Component, Input } from '@angular/core';
import { Report } from '../models/report';

@Component({
  selector: 'analytics-report-preview',
  template: `
    <a [routerLink]="['/reports', id]">
      <mat-card>
        <mat-card-title-group>
          <mat-card-title>{{ name | bcEllipsis:35 }}</mat-card-title>
        </mat-card-title-group>
        <mat-card-content>
          <p>Report Path : {{ sourceFile | bcEllipsis:40 }}</p>
          <p>Output Path : {{ outputLocation | bcEllipsis }}</p>
        </mat-card-content>
        <mat-card-content *ngIf="scheduled">
          <h5 mat-subheader>Schedule Info:</h5>
          <p>Repeats : {{ repeats }}</p>
          <p>End By : {{ repeatsEndBy }}</p>
          <p>Start Time : {{ repeatTimeStart | date:'medium' }}</p>
          <p>End Time : {{ repeatTimeEnds | date:'medium' }}</p>
        </mat-card-content>
        <mat-card-footer>
          <analytics-report-info [report]="report" [scheduled]="scheduled"></analytics-report-info>
        </mat-card-footer>
      </mat-card>
    </a>
  `,
  styles: [
    `
    :host {
      display: flex;
    }

    :host a {
      display: flex;
    }

    mat-card {
      width: 400px;
      margin: 15px;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
    }

    @media only screen and (max-width: 768px) {
      mat-card {
        margin: 15px 0 !important;
      }
    }
    mat-card:hover {
      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
    mat-card-title {
      margin-right: 10px;
    }
    mat-card-title-group {
      margin: 0;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    mat-card-content {
      margin-top: 15px;
      margin: 15px 0 0;
    }
    span {
      display: inline-block;
      font-size: 13px;
    }
    mat-card-footer {
      padding: 0 25px 25px;
    }
    h5 {
      margin-bottom: 5px;
      font-size: 13px;
    }
  `,
  ],
})
export class ReportPreviewComponent {
  @Input() report: Report;
  @Input() scheduled: boolean = false;

  get id() {
    return this.report.id;
  }

  get name() {
    if (this.report.scheduleInfo) {
      return this.report.scheduleInfo.name;
    }
    return 'Big Report I Run All The Time';
  }

  get repeats() {
    if (this.report.scheduleInfo) {
      return this.report.scheduleInfo.repeats.repeats;
    }
    return 'Daily';
  }
  get repeatsEndBy() {
    if (this.report.scheduleInfo) {
      return this.report.scheduleInfo.repeats.repeatsEndBy;
    }
    return 'Never';
  }
  get repeatTimeStart() {
    if (this.report.scheduleInfo) {
      return this.report.scheduleInfo.repeats.repeatTimeStart;
    }
    return Date.now().toString();
  }
  get repeatTimeEnds() {
    if (this.report.scheduleInfo) {
      return this.report.scheduleInfo.repeats.repeatTimeEnds;
    }
    return Date.now().toString();
  }

  get sourceFile() {
    if (this.report.scheduleInfo) {
      return this.report.scheduleInfo.name;
    }
    return '/path/to/report';
  }
  get outputLocation() {
    if (this.report.scheduleInfo) {
      return this.report.scheduleInfo.name;
    }
    return '/output/path/to/report';
  }


}
