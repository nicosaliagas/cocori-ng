import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringDatagridToolbarComponent } from './cocoring-datagrid-toolbar.component';

describe('CocoringDatagridToolbarComponent', () => {
  let component: CocoringDatagridToolbarComponent;
  let fixture: ComponentFixture<CocoringDatagridToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringDatagridToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringDatagridToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
