import { Injectable } from '@angular/core';

import { ButtonSchema, FormSchema, Schema } from '../model/schema-datas.model';


@Injectable()
export class PageBuilderService {
    private json: Schema;
    private forms: FormSchema[];
    private buttons: ButtonSchema[];

    constructor() { }

    consumeJson(json: Schema) {
        this.json = json;
        return this;
    }

    start() {
        if (!('page' in this.json)) throw new Error(`Property page doesn't exist`)

        const page = this.json.page;

        if (!('forms' in page)) throw new Error(`Property forms doesn't exist`)
    }
}

// const Builder: new <T>() => FormBuilder0<T> = FormBuilderService;
