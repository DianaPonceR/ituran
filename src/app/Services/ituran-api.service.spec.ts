import { TestBed } from '@angular/core/testing';

import { IturanApiService } from './ituran-api.service';

describe('IturanApiService', () => {
  let service: IturanApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IturanApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
