import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    public scrollingNativeElement: HTMLElement
    public onScroll: Subject<boolean> = new Subject<boolean>();

    constructor() { }

    private currentScrollPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop) {
            return document.documentElement.scrollTop;
        }
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
    }

    private getElementDomPosition(elm) {
        let y = elm.offsetTop - 100;
        let node: any = elm;

        while (node.offsetParent && node.offsetParent !== document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }

    scrollToTop() {
        const that = this;
        let timeOut;
        if (document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0) {
            window.scrollBy(0, -50);

            timeOut = setTimeout(function () {
                that.scrollToTop();
            }, 10);

        } else {
            clearTimeout(timeOut);
        }
    }

    scrollToIdSmooth(eID) {
        const startY = this.currentScrollPosition();
        const elm = document.getElementById(eID);
        const stopY = this.getElementDomPosition(elm);
        const distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        let speed = Math.round(distance / 100);

        if (speed >= 20) {
            speed = 20;
        }

        const step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (let i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        return false;
    }

    getScrollDistanceTo(eID): number {
        const elm = document.getElementById(eID);

        if (!elm) return -1; // element not found

        const stopY = this.getElementDomPosition(elm);

        return stopY
    }
}
