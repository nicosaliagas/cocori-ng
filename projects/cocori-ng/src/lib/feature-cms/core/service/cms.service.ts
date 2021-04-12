import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CMSService {

  constructor() { }

  public get name() {
    return "tamèrelapute"
  }
}
