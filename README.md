# ✨CocoriLibrary : projet library

2 projets : un projet de type library et un projet web angular classique permettant de dév et tester les composants de la lib

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

Version actuelle d'Angular : 14.0.5 (Juillet 2022)
Version actuelle d'Angular : 13.3.4 (Avril 2022)
Version actuelle d'Angular : 13.0.3 (Nov 2021)
Version actuelle d'Angular : 12.0.3 (Août 2021)

Version Node : 16.10.0
Version NPM : 7.24.0

# [Installation du poste de travail]

- installer NVM pour gérer différentes version de nodejs sur le poste
  tuto : https://dev.to/skaytech/how-to-install-node-version-manager-nvm-for-windows-10-4nbi

## New project

- ng new my-first-project

si erreur lors de la création d'un nouveau projet :
Odd numbered Node.js versions will not enter LTS status and should not be used for production

Arrêter et dowgrader la version de nodejs via l'outils NVM puis essayer à nouveau. Le message ne doit pas s'afficher.

## Update Angular CLI version Globally

npm uninstall -g angular-cli
npm cache verify (if npm > 5)
npm install -g @angular/cli@latest

https://www.angularjswiki.com/angular/update-angular-cli-version-ng-update-to-latest-6-7-versions/#:~:text=Steps%20To%20update%20Angular%20CLI,angular%2Fcli%40latest%20command.

## Commandes de génération de classes (service, component, il y en a d'autres encore...) :

`ng g service file`

Generate new component :
`ng g component cocoring-cms-image-upload --display-block=true --skip-import=true --style=scss`

## Compiler la lib Cocori-ng pour ensuite l'utiliser dans un autre projet (sans passer par le dépôt npm, tout en local):

Commandes pour builder la lib :

- pour développer sur le projet cocori-ng
- pour utiliser la lib dans un autre projet avec la méthode `link`

Lancer les commandes à la racine du projet :

- se mettre à la racine du projet, là où se trouve le fichier `package.json`

**Depuis le projet Cocori-ng** :

Faire un `npm i` si pas fait depuis longtemps

Commande qui build la lib et rends la main : `ng build --project=cocori-ng` ou `npm run lib:build`

Puis se mettre dans le dossier de génération du livrable de la lib `cd dist/cocori-ng;`

Générer un lien symbolique vers les sources de la lib : `npm link ;`

✨ **Récapitulatif des commandes pour utiliser les sources de cocori-ng dans un autre projet en local (sans passer par NPM) :**

```
npm i
ng build --project=cocori-ng ou npm run lib:build /** Commande qui build la lib et rends la main */
cd dist/cocori-ng ;
puis
npm link ;
```

⚠️ On n'utilise pas la commande `npm build` pour compiler Cocori-ng car Cocori-ng est composé de plusieurs sous-projets.

✨ **Depuis le projet client qui utilise Cocori-ng** :

```
npm i
npm link cocori-ng
```

_Puis lancer la commande de build du project cible (npm build, npm run...)_

⚠️ La commande `npm link @cocori-ng/lib` doit être relancée après chaque `npm i` car ce denier détruit les liens symboliques créés pour ier cocori-ng au projet client.

## Créer un lien `Link` vers la lib pour développer / tester une application en local 

Développer sur la lib Cocori-ng et sur le projet client en même temps (avec watch) :

Commande qui build la lib et se mets en écoute (rebuild auto si sauvegarde d'un fichier) : 
```npm run lib``` (commande à exécuter si vous souhaitez dev sur la lib)

Créer un lien symbolique vers la lib :
```
cd dist\cocori-ng
npm link (#sudo avant si linux)
```

Projet cible :

`npm link @cocori-ng/lib`

⚠️ angular.json :

- mettre `preserveSymlinks: true` dans `projects.$name.architect.build.options`

⚠️ package.json :

- installer les dépendances manquantes (penser à refaire npm link @cocori-ng/lib)

Prendre exemple avec les dépendances d'un autre projet web tels que Boulle ou Atlantx (fichier package.json )

Librairies requises  :

"@angular/cdk": "^12.0.3",
"@angular/material": "^12.0.3",
"@angular/flex-layout": "^12.0.0-beta.34",

- Démarrer le projet frontend :

## Lancer le projet pour tester les composants de la lib...

✨#frontend démarrer le build en mode watch
ng build --project=cocori-ng --watch (ou npm run lib)

✨#frontend local + backend local
ng serve --configuration "local" --port 5050 -o

(implémentation si htpps : ng serve --ssl --configuration "local" --port 5050)

## ✨publish on npm

`URL vers NPM`
https://www.npmjs.com/package/cocori-ng

`Incrémenter la version`
Fichier : `projects\cocori-ng\package.json` (propriété `version`)

`Build la lib prod`
ng build --project=cocori-ng --configuration production

`Publish on NPM`
(npm whoami : check if connected as nicosaliagas)
cd dist/cocori-ng
npm publish --access public

## Packager la lib

After building your library with `ng build --project=cocori-ng`, go to the dist folder `cd dist/cocori-ng` and run `npm pack`.

## 🔹 Styles et Thème de la lib

- De quoi parle t'on ?

Cocori-ng exporte des feuilles de styles partagées, des mixins et un thème.

Tous ces styles sont réunis dans un fichier scss : `cocori-ng.theme.scss`

Importer ce fichier thème dans un projet web permet à l'utilisateur de bénéficier des styles de la lib et de les consommer ou de les redéfinir dans son projet web.

Le thème de la lib permets de styliser les composants (du moins une partie) avec les couleurs du thème principal du projet cible. Ainsi les composants de la lib seront aux couleurs du projets cibles.

- Comment charger les styles et paramétrer le thème de la lib dans mon projet :

Depuis le thème principal de mon projet :

on importe le thème et tous les fichiers scss de la lib : `@import 'cocori-ng/cocori-ng.theme.scss';`

on charge le thème de la lib avec les palettes de couleurs du site en paramètre :

    - le thème du site
    - la palette de couleurs vertes (pour les notifs succès par exemple)
    - la palette de couleurs bleues

exemple : `@include cocori-ng-theme($theme-principal, $palette-green, $palette-blue);`

- Utiliser une mixin dans un fichier scss de mon projet :

on importe les mixins depuis la lib : `@import "@cocori-ng/lib/src/lib/assets/mixins";`

puis par exemple :

```
.main {
    padding: 2.25rem 2.25rem 0.75rem;

    /* j'utilise une mixin */
    @include for-phone-only {
        padding: 0.75rem;
    }
  }
```

- 🎨 Comment utiliser des palettes de couleurs définies depuis son thème dans ses styles ?

1. Définir ses couleurs dans son fchier \_variables.scss

exemple différents contrastes de couleur orange :

```
$mat-orange: (
  main: #ffc107,
  lighter: #fadb7b,
  darker: #be9004,
  200: #ffc107,
  contrast: (
    main: #000000,
    lighter: #000000,
    darker: #000000,
  )
);
```

2. Initialiser sa palette dans son thème.scss

```
$palette-orange: mat.define-palette($mat-orange, main, lighter, darker);
```

3. L'utiliser dans sa feuille de style :

import material : `@use "~@angular/material" as mat;`
import des variables, où se trouvent les palettes de couleur : `@import 'variables';`

puis

```
.fab-color {
    background-color: mat.get-color-from-palette($palette-blue, main);
}
```

4. Utiliser les mixin de cocori-ng dans un projet client :

import des mixins : `@import "@cocori-ng/lib/src/lib/assets/mixins";`

```
@include for-phone-only {
  width: 0;
}
```

## 🔹 Styles : classes margin et padding générées via mixins

source : https://medium.com/@jerrythimothy/margins-paddings-sass-mixin-16460c32507f

le fichier `_margins-paddings.scss` génère un ensemble de classes css pour les margin et padding

ex de classes css :

.m-b-15 ==> pour margin-bottom: 15px;
.m-x-30 ==> pour margin: 30px;

ou

.p-l-10 ==> pour padding-left: 10px;
.p-x-25 ==> pour padding: 25px;

## 🔹 Config des boutons de formulaire dynamique avec Cocori-ng

`Bouton classique - non submit - avec callback sur le clique du bouton `

```
.addButton('Annuler', config => config
  .isTypeSubmit(false)
  .outputCallback({
    click: () => console.log('callback sur le clique sur mon bouton')
  })
)
```

`Bouton de validation - type submit `

```
.addButton('Appliquer', config => config
  .isTypeSubmit()
  .icon('check')
  .outputCallback({
    callback: () => console.log('callback sur le fait que mon bouton vient d'être ajouté à la vue')
  })
)
```

## Librairie Utilisée

- Angular Material
- Angular Material Design Icons
- FakerJs : fake datas
  npm install faker --save-dev
  npm install @types/faker --save-dev
- Gallery : https://github.com/MurhafSousli/ngx-gallery

`Utiliser le color picker dans un projet`

doc lib : https://www.cssscript.com/chrome-devtools-color-picker/

- installer la lib color picker (tjrs depuis la racine du projet cible) : `npm i @r-tek/colr_pickr --save`
- référencer la lib dans le fichier angular.json :
  > architect / build / options / styles : ["./node_modules/@r-tek/colr_pickr/build/colr_pickr.min.css"]
  > architect / build / options / scripts : ["./node_modules/@r-tek/colr_pickr/build/colr_pickr.min.js"]

---

## Optimize Bundle Size

---

https://medium.com/angular-in-depth/optimize-angular-bundle-size-in-4-steps-4a3b3737bf45

Installer le bundle analyser de Webpack

npm install -g webpack-bundle-analyzer

build : ng build --stats-json

lancer l'interface avec les stats : webpack-bundle-analyzer dist/EventBoulle/stats.json

## Tests e2e via Cypress

npm install cypress --save-dev

> run : npx cypress open
> record tests e2e : npx cypress run --record --key 84330dcb-1088-4e89-bfc4-72d1c3f63c13

`connecteurs`
https://example.cypress.io/commands/connectors

`lire un fichier json`
https://example.cypress.io/commands/files

`Conserver le localstorage entre les tests CypressJs`
https://dev.to/javierbrea/how-to-preserve-localstorage-between-cypress-tests-19o1

## Nouveau projet Angular avec installation de la lib Cocori-ng

- ng new my-project
- install librairies:
  - ng add @angular/material
  - npm i @angular/flex-layout @tinymce/tinymce-angular spark-md5
- dans angular.json : architect.build.options.preserveSymlinks = true
- npm link @cocori-ng/lib (après avoir créé le lien symbolique vers la lib cocoring)

## Montée de version majeure d'Angular et angular-cli sur un projet

- s'il s'agit d'une version majeur d'Angular ex : passage du version 11 vers 12 ou 12 vers 13 ...
  - mettre à jour la version d'Angular cli sur le serveur de ci/cd [documentation Cocorisoft](https://bitbucket.org/cocorisoft/cocorisoft/src/master/ci-cd/Configuration%20CI-CD.md)
- étapes à suivre pour faire une montée de version d'Angular : https://update.angular.io/?l=3&v=11.0-12.0
- ng update pour voir les packages à mettre à jour
- ex : ng update @angular/cdk @angular/flex-layout @angular/material

## ✨ Monter la version des libraries d'un projet #upgrade

- exécuter la commande : `ng update` pour voir les package angular à mettre à jour

- faire `ng update [nom du package]` (archiver le fichier package.json entre chaque commande)

✔️ Si erreur lors du `ng update`, ne pas hésiter de refaire la commande avec ` --force` à la fin
(ex : `ng update @angular/cdk --force`)

ex : problème de version avec Typescript
`Package "@angular-devkit/build-angular" has an incompatible peer dependency to "typescript" (requires ">=4.4.3 <4.7", would install "4.7.4").`

✔️ Les packages angular seront à mettre à jour les uns après les autres en premier.

⚠️ Faire un commit et tester entre chaque update.

✔️ Le package angular/material est en général à mettre à jour en 1er (dépendance avec le cdk)

✔️ Relancer la commande `ng update` pour vérifier que tout soit ok

    Message de confirmation :

    💪 We analyzed your package.json and everything seems to be in order. Good work!

✔️ Mettre à jours, en plus les autres librairies de "package.json > dependencies" telles que :
(pour savoir si le package doit être mis à jour, laisser la souris sur le nom du package pour que sa version actuelle apparaîsse et la comparer avec celle du projet)

- @angular/flex-layout
- @r-tek/colr_pickr
- @tinymce/tinymce-angular
- ng-gallery
- ngx-mask
- etc...

Mettre à jour plusieurs package en une seule fois : `ng update name-package1 name-package2 name-package3` ...

- si certains package ne se mettent pas à jour (via la commande `ng update [nom du package]` ) : `npm install rxjs@latest`

⚠️ Pensez à mettre à jour les versions des libs dans le fichier package.json de la lib `projects\cocori-ng\package.json` (propriété : peerDependencies) ⚠️

## Angular Tips & Ressources + Aides + Help !

// dynamically-create-nested-objects
https://stackoverflow.com/questions/5484673/javascript-how-to-dynamically-create-nested-objects-using-object-names-given-by

`FlexLayout : affecter une classe css en fonction de la taille de l'écran ? `

exemple :
https://github.com/angular/flex-layout/wiki/ngClass-API#responsive-features

```
[ngClass.lt-md]="'zone-left-mobile'"
```

`Détecter si on est en taille mobile avec la lib FlexLayout ? `

ngOninit() {
if (this.mediaObserver.isActive('lt-md')) {
/// vue mobile par exemple
}
}

`Détecter la taille de l'écran côté component avec la lib FlexLayout ? `

https://github.com/angular/flex-layout/wiki/MediaObserver

exemple :

constructor(private mediaObserver: MediaObserver,) { }

private getAlias = (MediaChange: MediaChange[]) => {
return MediaChange[0].mqAlias;
};

private eventMediaChange() {
this.mediaObserver
.asObservable()
.pipe(
distinctUntilChanged(
(x: MediaChange[], y: MediaChange[]) => this.getAlias(x) === this.getAlias(y)
)
)
.subscribe((change) => {
change.forEach((item) => {
this.activeMediaQuery = item
? `'${item.mqAlias}' = (${item.mediaQuery})`
: '';

        if (item.mqAlias === 'lt-md') {
          this.loadMobileContent();
        }
      });
    });

}

`Référence un composant enfant et accès à ces propriétés depuis un composant parent`

@ViewChild(CocoringDatagridComponent, { static: false }) cocoringDatagridComponent!: CocoringDatagridComponent;

`Typescript : callback function`

model :

```
export interface HeaderMenuItem {
    callback: Function;
}
```

component :

```
callback: () => this.my_function()
```

`Angular : récupérer la valeur d'un paramètre contenu de l'url (ex : get id param : http://url?id=toto)`

```
this.subscriptions.add(
    this.route.queryParams.subscribe(params => {
    this.pageId = params['id']

    if (this.pageId) this.titreModal = "Modification de la page"
    })
)
```

`Angular : change URL params sans refresh`

```
this.urlHelperService.updateParamsUrlWithoutRefresh({ id: null })
```

`Change detection : déclencher les changements de variables dans la vue manuellement`

```
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
  ...

constructor(private cdr: ChangeDetectorRef)

🔹this.cdr.detectChanges()

dans les appels Http :
🔹catchError((err: any) => {
  this.cdr.detectChanges()
  return throwError(err);
})

```

`Loop object properties | Iterate through object properties`

```
Object.entries(values).forEach(([key, value]) => {
    console.log(">>> ",key, value)
})
```

`Scss : bordure not full width`

```
.border {
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    width: 50%;
    border-bottom: 1px solid #797978;
  }
}
```

`Material Icon : outlined style`

```
<mat-icon fontSet="material-icons-outlined">filter_alt</mat-icon>
```

`Material Icon : use in css `

```
li {
    &::before {
      🔹font-family: "Material Icons";
      🔹content: "\e5cc";
    }
  }
```

`Reactive form : ne pas émettre l'évènement de maj au setValue`

```
form.get('control').setValue('', {emitEvent: false})
```

`Unsubscribe vs Subscribe`

⚠️ Pensez à se désabonner de tous les subscribe !

```
@Component({
  selector: "app-flights",
  templateUrl: "./flights.component.html"
})
export class FlightsComponent implements OnDestroy, OnInit {
  🔹private readonly destroy$ = new Subject();

  public flights: FlightModel[];

  constructor(private readonly flightService: FlightService) {}

  ngOnInit() {
    this.flightService
      .getAll()
      .pipe(
        🔹takeUntil(this.destroy$)
      )
      .subscribe(flights => (this.flights = flights));
  }

  ngOnDestroy() {
    🔹this.destroy$.next(undefined);
    🔹this.destroy$.complete();
  }
}

```

`DateTime/luxon : date functions helper :`

> > https://github.com/moment/luxon/blob/master/docs/formatting.md

Date to DateTime : `DateTime.fromJSDate(startDate)`

DateTime to Date : `myDateVar.toJSDate()`

DateTime to Iso : `dt.toISO(); //=> '2017-04-20T11:32:00.000-04:00'`

Set Date to midnight : `new Date(varDate.setHours(0,0,0,0))`

Diff dates :

```
  const date1 = luxon.DateTime.fromISO(api.meeting.startsAt)
  const date2 = luxon.DateTime.fromISO(api.meeting.endsAt)

  const diff: any = date2.diff(date1, "minutes").toObject()

  console.log(diff['minutes'])
```

`Replace all :`

`` myStringVar.replace(new RegExp(`${searchVar}`), replaceVar)  ``

`Unselect material button (enlever le focus)`

Mettre "cdkFocusRegionstart" sur un autre élément

ou mettre onclick="this.blur()"

`Groupby rxjs`

from(this.confPage.widgets).pipe(
groupBy((widget: CustomType) => {
return <number>widget.zone
}),
mergeMap(group => zip(of(group.key), group.pipe(toArray())))
).subscribe((group: [number | null, CustomType[]]) => {
console.log("new group >>> ", group)
})

`Observable : call rest api and return new Observable :`

getEventInfos(): Observable<EventInfosModel> {
if (this.eventInfos) {
return of(this.eventInfos)
} else {
var subject = new Subject<EventInfosModel>();

        this.httpService.get(`${this.environmentService.appServerPath}/event-infos`).subscribe(
            (datas: any) => {
                this.eventInfos = datas

                subject.next(datas);
            })

        return subject.asObservable();
    }

}

`Exemple subscribe next / error`

this.getMappedDatasApi<WHeader>().pipe(
takeUntil(this.destroy$),
filter((datas: any[]) => datas.length > 0),
).subscribe({
next: this.handleUpdateResponse.bind(this),
error: this.handleError.bind(this)
}
)

`Scroll event avec material`

const content: any = document.querySelector('.mat-sidenav-content');
const scroll$ = fromEvent(content, 'scroll').pipe(
throttleTime(10), // only emit every 10 ms
map(() => content.scrollTop), // get vertical scroll position
pairwise(), // look at this and the last emitted element
map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)), // compare this and the last element to figure out scrolling direction
distinctUntilChanged(), // only emit when scrolling direction changed
share(), // share a single subscription to the underlying sequence in case of multiple subscribers
);

const goingUp$ = scroll$.pipe(
filter(direction => direction === Direction.Up)
);

const goingDown$ = scroll$.pipe(
filter(direction => direction === Direction.Down)
);

goingUp$.subscribe(() => console.log('scrolling up'))
goingDown$.subscribe(() => console.log('scrolling down'))

`Component input avec set`

@Input()
set refresh(test: string) { }

`Javascript array empty or remove all`

a.splice(0,a.length)

`Catch erreurs dans les appels api Observable/rxjs`

(<any>this.httpService.post(`apiUrl`, datas, SkipHeaders.TRUE)).pipe(
catchError(err => {
return throwError(() => err.error)
// return of(true)
}),
).subscribe((datas: any) => {})

`Group by property of an object`

itemsToAdd : array of TodoItem

const groupByListId: Object = itemsToAdd.reduce((r: any, a: TodoItem) => {
    r[a.todoListId] = r[a.todoListId] || [];
    r[a.todoListId].push(a);

    return r;
}, Object.create(null));


`Extract certain properties from all objects in array`

(<TodoItem[]>items).map(({id, name}) => ({id, name}))


`IndexedDb : boucler sur des promesses`

await Promise.all(flagsToSync.map(async (flag: Flag) => {

}))