import { TestBed } from '@angular/core/testing';

import { SepomexService } from './sepomex.service';

describe('SepomexService', () => {
  let service: SepomexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SepomexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
