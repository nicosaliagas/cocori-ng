import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StaticFormComponent } from './static-form.component';


describe('StaticFormComponent', () => {
  let component: StaticFormComponent;
  let fixture: ComponentFixture<StaticFormComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticFormComponent ],
      imports: [MatButtonToggleModule, HttpClientTestingModule, MatSelectModule, BrowserAnimationsModule ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
