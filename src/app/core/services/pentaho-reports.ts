import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Report } from '../../reports/models/report';
import { Book } from '../../reports/models/book';

@Injectable()
export class PentahoReportsService {
  private API_PATH = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  searchReports(queryTitle: string): Observable<Report[]> {
    return this.http
      .get<{ items: Book[] }>(`${this.API_PATH}?q=${queryTitle}`)
      .map(reports => {
        let x = 1;
        return reports.items.map( (item: Book) => {
          x++;
          return {
            id: x.toString(),
            blackoutTimesList: [
              {
                repeatTimeStart: Date.now().toString(),
                repeatTimeEnds: Date.now().toString(),
                repeats: 'Daily',
                repeatsEndBy: 'Never'
              }
            ],
            reportInfo: {
              name: item.volumeInfo.title,
              sourceFile: '/path/to/report',
              outputLocation: '/output/path/to/report',
              lastRun: Date.now().toString(),
              status: 'Normal',
            },
            scheduleInfo: {
              name: item.volumeInfo.title,
              repeats: {
                repeatTimeStart: Date.now().toString(),
                repeatTimeEnds: Date.now().toString(),
                repeats: 'Daily',
                repeatsEndBy: 'Never'
              },
              sourceFile: '/path/to/report',
              outputLocation: '/output/path/to/report',
              lastRun: Date.now().toString(),
              nextRun: Date.now().toString(),
              status: 'Normal'
            }
          };
        }) || [];
      });
  }

  retrieveReport(volumeId: string): Observable<Report> {
    return this.http.get<Report>(`${this.API_PATH}/${volumeId}`);
  }
}
