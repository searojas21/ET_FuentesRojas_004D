import { TestBed } from '@angular/core/testing';

import { ApicrudService } from './apicrud.service';

describe('ApicrudService', () => {
  let service: ApicrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
