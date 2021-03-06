import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringDatagridFilterColumnComponent } from './cocoring-datagrid-filter-column.component';

describe('CocoringDatagridFilterColumnComponent', () => {
  let component: CocoringDatagridFilterColumnComponent;
  let fixture: ComponentFixture<CocoringDatagridFilterColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringDatagridFilterColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringDatagridFilterColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
