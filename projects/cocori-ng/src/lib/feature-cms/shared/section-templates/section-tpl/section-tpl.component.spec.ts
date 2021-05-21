import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTplComponent } from './section-tpl.component';

describe('SectionTplComponent', () => {
  let component: SectionTplComponent;
  let fixture: ComponentFixture<SectionTplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTplComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
