import { TestBed } from '@angular/core/testing';

import { WysiwygService } from './wysiwyg.service';

describe('WysiwygService', () => {
  let service: WysiwygService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WysiwygService]
    });
    service = TestBed.inject(WysiwygService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
