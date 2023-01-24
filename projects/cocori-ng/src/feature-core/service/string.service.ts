import { Inject, Injectable } from '@angular/core';

@Injectable()
export class StringService {
    constructor(@Inject(String) private stringData: string) {
        this.stringData = stringData
    }

    public toString() {
        return this.stringData
    }

    public removeAllSpecialsCharacters() {
        this.stringData = this.stringData.replace(/[^a-zA-Z ]/g, "")

        return this
    }

    public removeAllSpaces() {
        this.stringData = this.stringData.replace(/\s/g, '')

        return this
    }

    public replaceAllAccentByNonAccentCharacters() {
        this.stringData = this.stringData.normalize("NFD").replace(/\p{Diacritic}/gu, "")

        return this
    }
}
