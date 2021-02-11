import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringSidenavItemComponent } from './cocoring-sidenav-item.component';

describe('CocoringSidenavItemComponent', () => {
  let component: CocoringSidenavItemComponent;
  let fixture: ComponentFixture<CocoringSidenavItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringSidenavItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringSidenavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
