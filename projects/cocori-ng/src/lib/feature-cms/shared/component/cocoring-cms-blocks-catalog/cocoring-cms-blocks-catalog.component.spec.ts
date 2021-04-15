import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringCmsBlocksCatalogComponent } from './cocoring-cms-blocks-catalog.component';

describe('CocoringCmsBlocksCatalogComponent', () => {
  let component: CocoringCmsBlocksCatalogComponent;
  let fixture: ComponentFixture<CocoringCmsBlocksCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringCmsBlocksCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringCmsBlocksCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
