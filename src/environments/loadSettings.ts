import { IConfigEnvironment } from 'src/app/core/service/environment.service';
import { environmentName } from 'src/environments/environment';

var settingsPromise: Promise<IConfigEnvironment>|null = null

export function loadSettings()
{
  if(settingsPromise == undefined) {
    settingsPromise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let suffix = environmentName ? `.${environmentName}` : "";
      xhr.open('GET', `./assets/appsettings/appsettings${suffix}.json`);
      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject("Impossible de charger l'environnement de l'application.");
        }
      };
      xhr.send();
    });
  }
  return settingsPromise;
}
