import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment as environmentPromise } from './environments/environment';

// import { environment } from './environments/environment';

// if (environment.production) {
//   enableProdMode();
// }

// document.addEventListener('DOMContentLoaded', () => {
//   platformBrowserDynamic().bootstrapModule(AppModule)
//     .catch(err => console.error(err));
// });

environmentPromise.then((environment: any) => {
  if (environment['production']) {
    enableProdMode();
  }

  platformBrowserDynamic().bootstrapModule(AppModule);
});
