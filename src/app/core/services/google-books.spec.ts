import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { cold } from 'jasmine-marbles';
import { GoogleBooksService } from './google-books';

describe('Service: GoogleBooks', () => {
  let service: GoogleBooksService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: { get: jest.fn() } },
        GoogleBooksService,
      ],
    });

    service = TestBed.get(GoogleBooksService);
    http = TestBed.get(HttpClient);
  });

  const data = {
    title: 'Report Title',
    author: 'John Smith',
    volumeId: '12345',
  };

  const reports = {
    items: [
      { id: '12345', scheduleInfo: { title: 'Title' } },
      { id: '67890', scheduleInfo: { title: 'Another Title' } },
    ],
  };

  const queryTitle = 'Report Title';

  it('should call the search api and return the search results', () => {
    const response = cold('-a|', { a: reports });
    const expected = cold('-b|', { b: reports.items });
    http.get = jest.fn(() => response);

    expect(service.searchBooks(queryTitle)).toBeObservable(expected);
    expect(http.get).toHaveBeenCalledWith(
      `https://www.googleapis.com/books/v1/volumes?q=${queryTitle}`
    );
  });

  it('should retrieve the report from the volumeId', () => {
    const response = cold('-a|', { a: data });
    const expected = cold('-b|', { b: data });
    http.get = jest.fn(() => response);

    expect(service.retrieveBook(data.volumeId)).toBeObservable(expected);
    expect(http.get).toHaveBeenCalledWith(
      `https://www.googleapis.com/books/v1/volumes/${data.volumeId}`
    );
  });
});
