// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { IConfigEnvironment } from 'src/app/core/service/environment.service';


// export const environment = {
//   production: false
// };


export const environment: Promise<IConfigEnvironment> = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', './assets/appsettings/appsettings.json');
  xhr.onload = function () {
    if (xhr.status === 200) {
      resolve(JSON.parse(xhr.responseText));
    } else {
      reject("Impossible de charger l'environnement de l'application.");
    }
  };
  xhr.send();
});


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
