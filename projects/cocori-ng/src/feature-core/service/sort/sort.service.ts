import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SortService {
    sortObjectByKeys(objectData: any): any {
        return Object.keys(objectData).sort().reduce(
            (obj: any, key: string) => {
                obj[key] = objectData[key];
                return obj;
            }, {}
        );
    }
}
