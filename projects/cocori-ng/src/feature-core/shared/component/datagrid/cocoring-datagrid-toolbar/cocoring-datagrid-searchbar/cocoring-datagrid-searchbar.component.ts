import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'cocoring-datagrid-searchbar',
  templateUrl: './cocoring-datagrid-searchbar.component.html',
  styleUrls: ['./cocoring-datagrid-searchbar.component.scss']
})
export class CocoringDatagridSearchbarComponent implements OnInit, OnDestroy {
  @Output() searchValue = new EventEmitter<string>();

  searchForm: UntypedFormGroup;

  private readonly destroy$ = new Subject();

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.buildSearchForm()
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  private buildSearchForm() {
    this.searchForm = <UntypedFormGroup>this.fb.group({
      'inputSearch': null
    });

    this.searchForm.get('inputSearch').valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(400),
      tap((data: string) => this.searchValue.emit(data))
    ).subscribe()
  }

  clearValue() {
    this.searchForm.reset()
  }
}
