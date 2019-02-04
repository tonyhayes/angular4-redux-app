import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ReportInfoComponent } from './report-info';
import { ReportDetailComponent } from './report-detail';
import { ReportPreviewComponent } from './report-preview';
import { ReportPreviewListComponent } from './report-preview-list';
import { ReportSearchComponent } from './report-search';

import { PipesModule } from '../../shared/pipes';
import { MaterialModule } from '../../material';

export const COMPONENTS = [
  ReportInfoComponent,
  ReportDetailComponent,
  ReportPreviewComponent,
  ReportPreviewListComponent,
  ReportSearchComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
