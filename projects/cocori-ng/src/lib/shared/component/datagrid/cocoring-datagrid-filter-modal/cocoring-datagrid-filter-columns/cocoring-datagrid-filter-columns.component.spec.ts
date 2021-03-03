import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringDatagridFilterColumnsComponent } from './cocoring-datagrid-filter-columns.component';

describe('CocoringDatagridFilterColumnsComponent', () => {
  let component: CocoringDatagridFilterColumnsComponent;
  let fixture: ComponentFixture<CocoringDatagridFilterColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringDatagridFilterColumnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringDatagridFilterColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
