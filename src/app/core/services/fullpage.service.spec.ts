import { TestBed } from '@angular/core/testing';

import { FullpageService } from './fullpage.service';

describe('FullpageService', () => {
  let service: FullpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
