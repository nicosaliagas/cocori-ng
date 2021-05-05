import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CurrentUrlRoutingService {
    public currentUrl = new BehaviorSubject<string>(undefined);

    // constructor(private router: Router) {
    //     this.router.events.subscribe((event: Event) => {
    //         if (event instanceof NavigationEnd) {
    //             this.currentUrl.next(event.urlAfterRedirects);
    //         }
    //     });
    // }
}
