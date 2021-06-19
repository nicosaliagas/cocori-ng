import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class UrlHelperService {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    updateParamsUrlWithoutRefresh(queryParams: any) {
        this.router.navigate(
            [],
            {
                relativeTo: this.activatedRoute,
                queryParams: queryParams,
                queryParamsHandling: 'merge', // remove to replace all query params by provided
            });
    }
}
