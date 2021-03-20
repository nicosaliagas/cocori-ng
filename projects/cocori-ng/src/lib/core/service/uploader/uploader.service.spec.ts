import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { UploaderService } from './uploader.service';

describe('DatagridService', () => {
  let uploadService: UploaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      schemas: []
    });

    uploadService = TestBed.inject(UploaderService);
  });

  it('should be created', () => {
    expect(uploadService).toBeTruthy();
  });
});
