import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { DatagridService } from './datagrid.service';

describe('DatagridService', () => {
  let datagridService: DatagridService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      schemas: []
    });

    datagridService = TestBed.inject(DatagridService);
  });

  it('should be created', () => {
    expect(datagridService).toBeTruthy();
  });

  // it('should create sort part of the query of the dataSource', () => {
  //   datagridService.config = {
  //     title: '',
  //     columns: [
  //       { caption: "Nom", dataField: "name", sort: "ASC" },
  //       { caption: "Prénom", dataField: "surname", sort: "DESC" },
  //     ]
  //   }

  //   const myPrivateSpy = spyOn<any>(datagridService, "generateSortQuery").and.callThrough();

  //   expect(myPrivateSpy.call(this)).toEqual('name asc,surname desc')

  //   // datagridService.config = {
  //   //   title: '',
  //   //   columns: [
  //   //     { caption: "Nom", dataField: "name" },
  //   //     { caption: "Prénom", dataField: "surname", sort: "ASC" },
  //   //   ]
  //   // }
  //   // expect(myPrivateSpy).toEqual('surname asc')

  //   // datagridService.config = {
  //   //   title: '',
  //   //   columns: [
  //   //     { caption: "Nom", dataField: "name" },
  //   //     { caption: "Prénom", dataField: "surname", sort: "NONE" },
  //   //   ]
  //   // }
  //   // expect(myPrivateSpy).toEqual('')
  // });
});
