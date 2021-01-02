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
        return JSON.parse(sessionStorage.getItem(key));
    }

    public deleteSessionStorageItem(key: string) {
        sessionStorage.removeItem(key);
    }

    public setLocalStorageItem(key: string, item: any) {
        localStorage.setItem(key, JSON.stringify(item));
    }

    public getLocalStorageItem(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }

    public deleteLocalStorageItem(key: string) {
        localStorage.removeItem(key);
    }
}
