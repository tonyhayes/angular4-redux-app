import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Report } from '../models/report';

@Component({
  selector: 'analytics-report-detail',
  template: `
    <mat-card *ngIf="report">
      <mat-card-title-group>
        <mat-card-title>{{ title }}</mat-card-title>
      </mat-card-title-group>
        <mat-card-content>
          <p>Report Path : {{ sourceFile | bcEllipsis:40 }}</p>
          <p>Output Path : {{ outputLocation | bcEllipsis }}</p>
        </mat-card-content>
        <mat-card-content *ngIf="inCollection">
          <h5 mat-subheader>Schedule Info:</h5>
          <p>Repeats : {{ repeats }}</p>
          <p>End By : {{ repeatsEndBy }}</p>
          <p>Start Time : {{ repeatTimeStart | date:'medium' }}</p>
          <p>End Time : {{ repeatTimeEnds | date:'medium' }}</p>
        </mat-card-content>
      <mat-card-footer class="footer">
        <analytics-report-info [report]="report" [scheduled]="inCollection"></analytics-report-info>
      </mat-card-footer>
      <mat-card-actions align="start">
        <button mat-raised-button color="warn" *ngIf="inCollection" (click)="remove.emit(report)">
        Remove Report from Scheduler
        </button>

        <button mat-raised-button color="primary" *ngIf="!inCollection" (click)="add.emit(report)">
        Add Report to Scheduler
        </button>
      </mat-card-actions>
    </mat-card>

  `,
  styles: [
    `
    :host {
      display: flex;
      justify-content: center;
      margin: 75px 0;
    }
    mat-card {
      width: 500px;
      margin: 15px;
      margin-top: -35px;
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
    h5 {
      margin-bottom: 5px;
      font-size: 13px;
    }
    mat-card-actions {
      margin: 25px 0 0 !important;
    }
    mat-card-footer {
      padding: 0 25px 25px;
      position: relative;
    }
  `,
  ],
})
export class ReportDetailComponent {
  /**
   * Presentational components receive data through @Input() and communicate events
   * through @Output() but generally maintain no internal state of their
   * own. All decisions are delegated to 'container', or 'smart'
   * components before data updates flow back down.
   *
   * More on 'smart' and 'presentational' components: https://gist.github.com/btroncone/a6e4347326749f938510#utilizing-container-components
   */
  @Input() report: Report;
  @Input() inCollection: boolean;
  @Output() add = new EventEmitter<Report>();
  @Output() remove = new EventEmitter<Report>();

  /**
   * Tip: Utilize getters to keep templates clean
   */
  get id() {
    return this.report.id;
  }

  get title() {
    if (this.report.scheduleInfo) {
      return this.report.scheduleInfo.name;
    }
    return 'Big Report I Run All The Time';
  }


  get description() {
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
  }}
