import { DebugElement } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UntypedFormBuilder, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CocoringDatagridSearchbarComponent } from './cocoring-datagrid-searchbar.component';

describe('CocoringDatagridSearchbarComponent', () => {
  let component: CocoringDatagridSearchbarComponent;
  let fixture: ComponentFixture<CocoringDatagridSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringDatagridSearchbarComponent],
      providers: [
        UntypedFormBuilder
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringDatagridSearchbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should emit the filter value', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(component.searchValue, 'emit');

    component.searchForm.get('inputSearch').setValue("filter a value")

    tick(400);

    expect(component.searchValue.emit).toHaveBeenCalledOnceWith('filter a value')

    discardPeriodicTasks()
  }));

  it('should reset the filter input', () => {
    fixture.detectChanges();

    component.searchForm.get('inputSearch').setValue("filter a value")

    fixture.detectChanges();

    let buttonResetElem: DebugElement = fixture.debugElement.query(By.css('.button-reset'));

    expect(component.searchForm.get('inputSearch').value).toEqual("filter a value")

    expect(buttonResetElem).toBeTruthy()

    buttonResetElem.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.searchForm.get('inputSearch').value).toBeNull()

    buttonResetElem = fixture.debugElement.query(By.css('.button-reset'));

    expect(buttonResetElem).toBeFalsy()
  });
});
