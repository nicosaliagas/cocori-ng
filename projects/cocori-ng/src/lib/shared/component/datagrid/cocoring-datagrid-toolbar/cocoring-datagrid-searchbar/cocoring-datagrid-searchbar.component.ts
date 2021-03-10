import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'cocoring-datagrid-searchbar',
  templateUrl: './cocoring-datagrid-searchbar.component.html',
  styleUrls: ['./cocoring-datagrid-searchbar.component.scss']
})
export class CocoringDatagridSearchbarComponent implements OnInit {
  @Output() searchValue = new EventEmitter<string>();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.buildSearchForm()
  }

  private buildSearchForm() {
    this.searchForm = <FormGroup>this.fb.group({
      'inputSearch': null
    });

    this.searchForm.get('inputSearch').valueChanges.pipe(
      debounceTime(400),
      tap((data: string) => this.searchValue.emit(data))
    ).subscribe()
  }

  clearValue() {
    this.searchForm.reset()
  }
}
