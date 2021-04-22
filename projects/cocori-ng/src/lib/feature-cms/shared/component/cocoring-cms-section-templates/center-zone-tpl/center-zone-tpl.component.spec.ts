import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterZoneTplComponent } from './center-zone-tpl.component';

describe('CenterZoneTplComponent', () => {
  let component: CenterZoneTplComponent;
  let fixture: ComponentFixture<CenterZoneTplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterZoneTplComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterZoneTplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
