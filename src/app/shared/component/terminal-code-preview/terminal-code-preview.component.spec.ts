import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCodePreviewComponent } from './terminal-code-preview.component';

describe('TerminalCodePreviewComponent', () => {
  let component: TerminalCodePreviewComponent;
  let fixture: ComponentFixture<TerminalCodePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminalCodePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalCodePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
