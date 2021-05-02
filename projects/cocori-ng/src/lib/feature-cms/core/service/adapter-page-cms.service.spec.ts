import { TestBed } from '@angular/core/testing';

import { AdapterPageCmsService } from './adapter-page-cms.service';

describe('AdapterCmsService', () => {
  let service: AdapterPageCmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdapterPageCmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
