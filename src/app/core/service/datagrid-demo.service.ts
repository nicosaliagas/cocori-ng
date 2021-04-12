import { Injectable } from '@angular/core';
import { DatasourceOdata } from '@cocori-ng/lib';
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
      testBool: faker.random.boolean(),
      testNum: faker.random.number({
        'min': 1,
        'max': 999
      }),
      testDate: faker.date.recent(),
      test1: faker.lorem.word(),
      test2: faker.random.number({
        'min': 1,
        'max': 999
      }),
      test3: faker.lorem.sentence(),
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
    return of(this.manyRows(30)).pipe(delay(500));
  }
}
