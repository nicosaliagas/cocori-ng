import { Injectable } from '@angular/core';

export const typeImageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;

@Injectable({
    providedIn: 'root',
})
export class HelperUploaderService {

    static checkTypeImage(fileType: string): boolean {
        return typeImageReg.test(fileType)
    }

    static estceTypeMimeAccept√©(typeMime: string, configTypeMime: string[]): boolean {
        const ext = typeMime.split('/').pop().toLowerCase();

        return configTypeMime.indexOf(ext) !== -1;
    }

    static estceImageTypeImage(typeMime: string): boolean {
        const extension = typeMime.toLowerCase();

        return extension.indexOf("image") !== -1;
    }

    static estceImageTypeMimeGif(typeMime: string): boolean {
        const extension = typeMime.toLowerCase();

        return this.estceImageTypeImage(typeMime) && extension.indexOf("gif") !== -1;
    }

    static estceTailleUploadAccept√©(tailleFichier: number, configTailleUpload: number): boolean {
        const tailleMO = (tailleFichier / 1024 / 1024).toFixed(2);

        return parseFloat(tailleMO) <= configTailleUpload;
    }

    static estceTailleUploadTotalAccept√©(tailleTotalFichiers: number, configTotalTailleUpload: number): boolean {
        const tailleTotalMO = (tailleTotalFichiers / 1024 / 1024).toFixed(2);

        return parseFloat(tailleTotalMO) <= configTotalTailleUpload;
    }
}
