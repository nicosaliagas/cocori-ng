import { Injectable } from '@angular/core';

import { configdefault } from '../../config/config.components';

@Injectable({
    providedIn: 'root',
})
export class UtilsUpload {

    static estceTypeMimeAccepté(typeMime: string, configTypeMime: string[]): boolean {
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

    static estceImageTypeMimePNGLimiteOk(documentUploadé: Blob): boolean {
        const extension = documentUploadé.type.toLowerCase();
        const tailleMO = (documentUploadé.size / 1024 / 1024).toFixed(2);

        if (this.estceImageTypeImage(extension) && extension.indexOf("png") !== -1) {
            return parseFloat(tailleMO) < configdefault.upload.sizeUploadDocumentPng;
        }
        return true;
    }

    static estceTailleUploadAccepté(tailleFichier: number, configTailleUpload: number): boolean {
        const tailleMO = (tailleFichier / 1024 / 1024).toFixed(2);

        return parseFloat(tailleMO) <= configTailleUpload;
    }

    static estceTailleUploadTotalAccepté(tailleTotalFichiers: number, configTotalTailleUpload: number): boolean {
        const tailleTotalMO = (tailleTotalFichiers / 1024 / 1024).toFixed(2);

        return parseFloat(tailleTotalMO) <= configTotalTailleUpload;
    }
}
