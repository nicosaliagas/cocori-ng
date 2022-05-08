import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SortService {

    sortObjectByKeys(objectData: any): string {
        return Object.keys(objectData).sort().reduce(
            (obj: any, key: string) => {
                obj[key] = objectData[key];
                return obj;
            }, {}
        );
    }
}
