import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

    constructor(private storageService: StorageService) { }

    get accessToken(): string {
        const token: string = this.storageService.getLocalStorageItem('accessToken');
        return token || null;
    }

    set accessToken(token: string) {
        this.storageService.setLocalStorageItem('accessToken', token);
    }

    get refreshToken(): string {
        const token: string = this.storageService.getLocalStorageItem('refreshToken');

        return token || null;
    }

    set refreshToken(token: string) {
        this.storageService.setLocalStorageItem('refreshToken', token);
    }

    deleteTokens() {
        this.storageService.deleteLocalStorageItem('refreshToken');
        this.storageService.deleteLocalStorageItem('accessToken');
    }

    decryptAccessToken() {
        if (this.accessToken) {
            const base64Array: string[] = this.accessToken.split('.');
            const decodedToken = JSON.parse(window.atob(base64Array[1]));
            return decodedToken;
        }
        return '';
    }
}
