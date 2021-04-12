import { Injectable } from '@angular/core';
import { CMSService } from '@cocori-ng/lib/src/lib/feature-cms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private cmsService: CMSService) {
    console.log("From FORMSERVICE >> ", this.cmsService.name)
  }
}
