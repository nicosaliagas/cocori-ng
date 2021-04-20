import { Injectable } from '@angular/core';

export interface IConfigEnvironment {
    production: boolean;
    APP_SERVER_PATH: string;
    TINYMCE_API_KEY: string;
}

@Injectable({
    providedIn: 'root',
})
export class EnvironmentService {
    appServerPath: string;
    tinymceApiKey: string;

    constructor() {
        this.appServerPath = ''
        this.tinymceApiKey = ''
    }

    set conf(data: IConfigEnvironment) {
        this.appServerPath = data.APP_SERVER_PATH
        this.tinymceApiKey = data.TINYMCE_API_KEY
    }
}
