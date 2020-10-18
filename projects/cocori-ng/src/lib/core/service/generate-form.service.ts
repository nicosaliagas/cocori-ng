import { Injectable } from '@angular/core';

import { ListOfComponents } from '../../shared/component/form';

@Injectable()
export class GenerateFormService {
    constructor() { }

    returnComponentClassFromType(typeOfComponent: string): any {
        if (!ListOfComponents.hasOwnProperty(typeOfComponent)) {
            const error: string = `This type of component : '${typeOfComponent}' doesn't exist`;
            throw new Error(error);
        } else {
            return ListOfComponents[typeOfComponent];
        }
    }
}
