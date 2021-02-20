import { Injectable } from '@angular/core';
import { DatasourceOdata } from 'cocori-ng';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatagridDemoService {

  constructor() { }

  /** faker.js */
  mockDatagridDatas(): Observable<DatasourceOdata> {
    const valeurParDéfaut: DatasourceOdata = {
      __count: 1,
      results: [
        {
          id: "1dffbed0-da3d-46f4-981b-53a5ee3943fc",
          name: "Aliagas",
          surname: "Nicos",
          age: 38,
          civility: "Monsieur",
          test: "bla bla bla bla bla bla bla bla bla bla bla bla",
          test1: "Test",
          test2: "Test",
          test3: "Test",
          test4: "Test",
          test5: "Test"
        },
        {
          id: "AA3813CE-314E-48B4-86C1-0159EF82E1A1",
          name: "Moissant",
          surname: "Antho",
          age: 32,
          civility: "Monsieur",
          test: "Test",
          test1: "Test",
          test2: "Test",
          test3: "Test",
          test4: "Test",
          test5: "Test"
        },
        {
          id: "037664FE-2339-417B-8FD0-69C30894CDAD",
          name: "Test",
          surname: "Ikule",
          age: 55,
          civility: "Mademoiselle",
          test: "Test",
          test1: "Test",
          test2: "Test",
          test3: "Test",
          test4: "Test",
          test5: "Test"
        }
      ]
    };

    return of(valeurParDéfaut).pipe(delay(500));
  }
}
