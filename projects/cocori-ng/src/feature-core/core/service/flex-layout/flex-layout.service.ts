import { Injectable } from '@angular/core';
import { MediaChange } from '@angular/flex-layout';

@Injectable({
  providedIn: 'root'
})
export class FlexLayoutService {
  public getAlias = (MediaChange: MediaChange[]) => {
    return MediaChange[0].mqAlias;
  }
}
