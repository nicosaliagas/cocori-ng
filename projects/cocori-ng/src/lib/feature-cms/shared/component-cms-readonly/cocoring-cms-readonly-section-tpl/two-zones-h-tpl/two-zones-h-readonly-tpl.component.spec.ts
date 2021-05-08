import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoZonesHTplComponent } from './two-zones-h-readonly-tpl.component';

describe('TwoZonesHTplComponent', () => {
  let component: TwoZonesHTplComponent;
  let fixture: ComponentFixture<TwoZonesHTplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoZonesHTplComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoZonesHTplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
