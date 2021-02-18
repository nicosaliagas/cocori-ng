import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringDatagridRowComponent } from './cocoring-datagrid-row.component';

describe('CocoringDatagridRowComponent', () => {
  let component: CocoringDatagridRowComponent;
  let fixture: ComponentFixture<CocoringDatagridRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringDatagridRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringDatagridRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
