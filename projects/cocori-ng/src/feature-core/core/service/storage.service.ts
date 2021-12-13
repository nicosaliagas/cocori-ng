import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor() { }

    public setSessionStorageItem(key: string, item: any) {
        sessionStorage.setItem(key, JSON.stringify(item));
    }

    public getSessionStorageItem(key: string): any {
        let a = null

        try {
            a = JSON.parse(sessionStorage.getItem(key));
        } catch (e) {
            console.error(`Session storage, erreur in parsing JSON : `, e)
        } finally {
            return a
        }
    }

    public deleteSessionStorageItem(key: string) {
        sessionStorage.removeItem(key);
    }

    public setLocalStorageItem(key: string, item: any) {
        localStorage.setItem(key, JSON.stringify(item));
    }

    public getLocalStorageItem(key: string): any {
        let a = null

        try {
            a = JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error(`Local storage, erreur in parsing JSON : `, e)
        } finally {
            return a
        }
    }

    public deleteLocalStorageItem(key: string) {
        localStorage.removeItem(key);
    }
}
