import { Injectable } from '@angular/core';
import { DatasourceOdata } from 'cocori-ng';
import * as faker from 'faker/locale/fr';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatagridDemoService {

  constructor() { }

  mockRow = () => {
    return {
      id: faker.random.uuid(),
      name: faker.name.lastName(),
      surname: faker.name.firstName(),
      age: faker.random.number({
        'min': 18,
        'max': 99
    }),
      civility: faker.random.arrayElement(['Monsieur', 'Madame', 'Mademoiselle']),
      test: faker.name.jobTitle(),
      test1: faker.random.word(),
      test2: faker.lorem.sentence(),
      test3: faker.lorem.word(),
      test4: faker.lorem.sentence(),
      test5: faker.lorem.word()
    }
  }

  manyRows = (count = faker.random.number(100)): DatasourceOdata => {
    const res = [];
    for (let i = 0; i < count; i++) {
      res.push(this.mockRow());
    }
    return { __count: count, results: res };
  }

  mockDatagridDatas(): Observable<DatasourceOdata> {
    return of(this.manyRows(10)).pipe(delay(500));
  }
}
