import { Component } from '@angular/core';
import { GlobalErrorInterceptorService } from 'cocori-ng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cocori-library';

  constructor(private globalErrorInterceptorService: GlobalErrorInterceptorService) {
    
  }
}
