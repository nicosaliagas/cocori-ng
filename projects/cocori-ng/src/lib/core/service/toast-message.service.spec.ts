import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ToastMessageService } from './toast-message.service';

describe('ToastMessageService', () => {
  let service: ToastMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [MatSnackBarModule],
      schemas: []
    });
    service = TestBed.inject(ToastMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
