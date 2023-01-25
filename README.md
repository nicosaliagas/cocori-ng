# ✨Cocori-ng 

**Cocori-ng is an Angular full of great components & utilites based on Material**


2 projets :
- un projet de type library
- un projet web angular classique permettant de dév et tester les composants de la lib

Montée de version d'Angular :
- version 14.1.1 (Juillet 2022)
- version 13.3.4 (Avril 2022)
- version 13.0.3 (Nov 2021)
- version 12.0.3 (Août 2021)

Version Node : 16.10.0
Version NPM : 7.24.0

### Update Angular CLI version Globally

npm uninstall -g angular-cli
npm cache verify (if npm > 5)
npm install -g @angular/cli@latest

🔗 https://www.angularjswiki.com/angular/update-angular-cli-version-ng-update-to-latest-6-7-versions/#:~:text=Steps%20To%20update%20Angular%20CLI,angular%2Fcli%40latest%20command

### CLI generate d`Angular schematics :

exemple generate new component :
```
ng g component cocoring-cms-image-upload --display-block=true --skip-import=true --style=scss
```

🔗https://angular.io/cli/generate


### Utilisation de la lib cocori-ng :

*Lancer les commandes depuis la racine du projet web, là où se trouve le fichier `package.json` (pas dans le dossier `projects`)*

Faire un `npm i` si pas fait depuis longtemps

Builder la lib et rends la main : `ng build --project=cocori-ng`

Builder la lib et watch les changements : `ng build --project=cocori-ng --watch`

Puis se mettre dans le dossier de génération du livrable de la lib `cd dist/cocori-ng`

Générer un lien symbolique vers les sources de la lib : `npm link`

✨ **Récapitulatif des commandes pour utiliser les sources de cocori-ng dans un autre projet en local (sans passer par npm) :**

```javascript
npm i
ng build --project=cocori-ng /** Commande qui build la lib et rends la main */
cd dist/cocori-ng
npm link
```

⚠️ On n utilise pas la commande `npm build` pour compiler Cocori-ng car Cocori-ng est composé de plusieurs sous-projets.

✨ **Utiliser la lib depuis un autre projet client en local** :

```javascript
npm link cocori-ng
```

_Puis lancer la commande de build du project cible (npm build, npm run...)_

⚠️ Depuis le projet client, la commande `npm link cocori-ng` doit être relancée après chaque commande d'install `npm i` ou tout ajout d'une nouvelle lib. Ces commandes cassent le lien symbolique créé pour lier cocori-ng au projet client.

⚠️ angular.json :

- mettre `preserveSymlinks: true` dans `projects.$name.architect.build.options`

⚠️ package.json :

- installer les dépendances manquantes (penser ensuite à refaire npm link cocori-ng)


### Projet web de la librairie

*Pour tester les composants de la lib ou en créer de nouveaux*

✨Builder le projet avec l`option watch :

``ng build --project=cocori-ng --watch``

✨Lancer le projet front :

``ng serve --configuration "local"``

Si htpps : 

``ng serve --ssl --configuration "local"``

### ✨Publier la lib sur Npm

**Url du dépôt Npm**

🔗https://www.npmjs.com/package/cocori-ng

**Incrémenter la version de la lib**

Fichier : ``projects\cocori-ng\package.json`` (propriété ``version``)

**Builder la lib**

``ng build --project=cocori-ng --configuration production``

**Publish on Npm**

Check if connected as nicosaliagas : ``npm whoami``
Publier sur Npm :
``cd dist/cocori-ng``
``npm publish --access public``

### Packager la lib

Build the library : ``ng build --project=cocori-ng``
Aller dans le dossier dist : ``cd dist/cocori-ng`` puis lancer ``npm pack``

Le fichier ``cocori-ng-[version].tgz`` est généré


### Styles et Thème de la lib

**- De quoi parle t on ?**

Cocori-ng exporte des feuilles de styles partagées, des mixins et un thème.

Tous ces styles sont réunis dans un fichier scss : ``cocori-ng.theme.scss``

Importer ce fichier thème dans un projet web permet à l'utilisateur de bénéficier des styles de la lib et de les consommer et de les redéfinir dans son projet web.

Le thème de la lib permets de styliser les composants (du moins une partie) avec les couleurs du thème principal du projet client. Ainsi les composants de la lib seront aux couleurs du projets client.

**- Comment charger les styles et paramétrer le thème de la lib dans mon projet client :**

Depuis le thème principal de mon projet client :

on importe le thème et tous les fichiers scss de la lib :

``@import "./node_modules/cocori-ng/cocori-ng.theme.scss";``

on charge le thème de la lib avec les palettes de couleurs du site en paramètre :
   - le thème du site
   - la palette de couleurs vertes (pour les notifs succès par exemple)
   - la palette de couleurs bleues

exemple :

``@include cocori-ng-theme($theme-principal, $palette-green, $palette-blue);``

- Exemple d'utilisation une mixin de la lib cocori-ng dans mon projet client :

on importe les mixins depuis la lib dans un fichier scss de mon projet client :
``@import "./node_modules/cocori-ng/src/assets/mixins";``

puis par exemple :

```
.main {
    padding: 2.25rem 2.25rem 0.75rem;

    /* j'utilise la mixin */
    @include for-phone-only {
        padding: 0.75rem;
    }
  }
```

**- Comment utiliser des palettes de couleurs définies depuis son thème dans ses styles ? 🎨**

- Définir sa palette dans un fichier _variables.scss

*exemple différents contrastes de couleur orange :*

```
$mat-primary: (
  main: #8c8c8c,
  lighter: #f2f2f2,
  darker: #3c4043,
  contrast:
    (
      main: #000000,
      lighter: #000000,
      darker: #000000,
    ),
);
```

```
$palette-primary: mat.define-palette($mat-primary, main, lighter, darker);
```

- L utiliser dans sa feuille de style :

import material : ``@use "~@angular/material" as mat;``

import des variables, où se trouvent les palettes de couleur : ``@import 'variables';``

puis

```css
.lives-title {
  font-weight: 700;
  color: mat.get-color-from-palette($palette-primary, darker);
}
```

### Styles : classes margin et padding générées via mixins

le fichier `_margins-paddings.scss` génère un ensemble de classes css pour les margin et padding

*exemple d utilisation des classes css :*

``.m-b-15`` : ``margin-bottom: 15px;``

``.m-x-30`` : ``margin: 30px;``

``.p-l-10`` :  ``padding-left: 10px;``

``.p-x-25`` : ``padding: 25px;``

*Article Medium :*

``🔗 https://medium.com/@jerrythimothy/margins-paddings-sass-mixin-16460c32507f``


### Fluent reactive form *(à enrichir)*

**- génération de boutons de formulaire :**

- Bouton classique - non submit - avec callback sur le clique du bouton

```
.addButton('Annuler', config => config
  .isTypeSubmit(false)
  .outputCallback({
    click: () => console.log('callback sur le clique sur mon bouton')
  })
)
```

- Bouton de validation - type submit - avec callback sur le clique du bouton

```
.addButton('Appliquer', config => config
  .isTypeSubmit()
  .icon('check')
  .outputCallback({
    callback: () => console.log("callback sur le fait que mon bouton vient d'être ajouté à la vue")
  })
)
```

### Exemple d encapsulation d une lib js dans un composant Angular

#### Librairie color picker

**- Installation et référencement**

Source : [Lien vers la lib](https://www.cssscript.com/chrome-devtools-color-picker)

- installer la librairie : ``npm i @r-tek/colr_pickr --save``

- référencer la librairie dans le fichier ``angular.json`` :

  architect/build/options/styles :

  ``["./node_modules/@r-tek/colr_pickr/build/colr_pickr.min.css"]``

  architect/build/options/scripts :

  ``["./node_modules/@r-tek/colr_pickr/build/colr_pickr.min.js"]``

**- Création de la directive**

Détails du fichier *cocoring-colorpicker.directive.ts* : 
``projects\cocori-ng\src\feature-form\shared\directive\color-picker\cocoring-colorpicker.directive.ts``

**- Utilisation de la directive**

```HTML
<div class="circle-color" [cocoring-colorpicker]="color" (onColorChange)="onColorChange($event)"></div>
```

### Poids des librairies d'un projet front :

**Buts :**
**- Visualiser les libraires les plus gourmandes d un projet**
**- Optimiser le chargement du projet**

Installer le bundle analyser de Webpack : 

``npm install -g webpack-bundle-analyzer``

Build l application avec l option stats : 

``ng build --stats-json``

Lancer l interface avec les stats :

``webpack-bundle-analyzer dist/[project_name]/stats.json``

Source : [Optimize Angular bundle size in 4 steps](https://indepth.dev/posts/1217/how-to-reuse-common-layouts-in-angular-using-router)

## Tests e2e via Cypress

Installation : ``npm install cypress --save-dev``

Ouverture de l'interface : ``npx cypress open``

*Exemple de code :*

** Se mettre en écoute d un point d API **

```javascript
/// <reference types="Cypress" />

describe("Modifier les informations de son profil", () => {
  var interceptPrivateProfileApi = (userId) => {
    cy.interceptApi({
      method: "GET",
      url: `/users/${userId}/profile`,
    }).as("getProfile");
  };

  var getprivateProfile = () =>
    cy
      .wait("@getProfile")
      .then((interception) => cy.wrap(interception.response.body));

  it(`⚡️ Etapes d'exécution des tests`, () => {
    /** scénario de connexion au site */
    auth.login(email, password).then((userId) => {
      clickEntryAccount(userId);
    });
  });

  var clickEntryAccount = (userId) => {
    cy.log(`⚡️Clique sur l'entrée de menu : Compte`);

    /** avant d'être rediriger sur une autre page
     *  on se met en écoute du point d'API qui sera appeler sur la nouvelle page
    */
    interceptPrivateProfileApi(userId);

    cy.get("mat-list").contains("Compte").click();

    /** On test la nouvelle url */
    cy.get("page-profil-compte").should("exist");

    /**
     *  ce point d'API est exécuté au chargement de la page pour récupérer et afficher les données utilisateur
     *  on attends qu'il se finisse pour récupérer les données et continuer les tests de la page avec ces données
    */
    getprivateProfile().then((datas) => {
      /** les tests continuent avec les datas retournées par le point d'API */
      /** tester que les valeurs s'affichent bien dans la page etc... */
    });
  };
});
```

Doc sur les connecteurs : [Connectors](https://example.cypress.io/commands/connectors)

Doc lecture d un fichier Json : [Files](https://example.cypress.io/commands/files)

Doc conserver le localstorage entre les tests Cypress :
[How to preserve localStorage between Cypress tests ](https://dev.to/javierbrea/how-to-preserve-localstorage-between-cypress-tests-19o1)


### Nouveau projet Angular avec installation de la lib Cocori-ng

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


### Gestion plusieurs versions de NodeJs en local 

Si besoins, installer l'outils NVM pour gérer différentes version de nodejs sur le poste
🔗 https://dev.to/skaytech/how-to-install-node-version-manager-nvm-for-windows-10-4nbi


## Angular Tips

**How to dynamically create nested objects using object names given by an array**

https://stackoverflow.com/questions/5484673/javascript-how-to-dynamically-create-nested-objects-using-object-names-given-by

**FlexLayout : affecter une classe css en fonction de la taille de l écran ?**

exemple :
https://github.com/angular/flex-layout/wiki/ngClass-API#responsive-features

```
[ngClass.lt-md]="'zone-left-mobile'"
```

**Détecter si on est en taille mobile avec la lib FlexLayout ?**

    ngOninit() {
    	if (this.mediaObserver.isActive('lt-md')) {
    		/// vue mobile par exemple
    	}
    }

**Détecter la taille de l`écran côté component avec la lib FlexLayout ?**

https://github.com/angular/flex-layout/wiki/MediaObserver

*exemple :*
```javascript
    private eventMediaChange() {
        this.mediaObserver
          .asObservable()
          .pipe(
            takeUntil(this.destroy$),
            distinctUntilChanged(
              (x: MediaChange[], y: MediaChange[]) => this.flexLayoutService.getAlias(x) === this.flexLayoutService.getAlias(y)
            )
          )
          .subscribe((change) => {
            change.forEach((item) => {
    
              if (item.mqAlias === 'lt-md' && this.typeMedia !== 'mobile') {
                this.typeMedia = 'mobile'
                this.loadMobileContent();
              } else if ((item.mqAlias === 'md' || item.mqAlias === 'gt-md') && this.typeMedia !== 'desktop') {
                this.typeMedia = 'desktop'
                this.loadDesktopContent()
              }
            });
          });
      }
```

**Référence un composant enfant et accès à ces propriétés depuis un composant parent**

```javascript
@ViewChild(CocoringDatagridComponent, { static: false }) cocoringDatagridComponent!: CocoringDatagridComponent;
```

**Detect when a child element in Angular is rendered and access it**
```javascript
private myElement: ElementRef;
  @ViewChild('mySelector', {static : false}) set content(content: ElementRef) {
    if(content) { // initially setter gets called with undefined
      // debugger;
      this.myElement = content;
    }
  }
  
<div #mySelector *ngIf="initiallyFalseThenAfterDbResponseIsTrue"></div>
```


**Typescript : type function**

*model :*
```javascript
export interface HeaderMenuItem {
    callback: Function;
}
```

*component :*

```javascript
callback: () => this.my_function()
```

**Angular : récupérer la valeur d un paramètre contenu de l url (ex : get id param : http://url?id=toto)**

```javascript
this.subscriptions.add(
    this.route.queryParams.subscribe(params => {
    this.pageId = params['id']
)
```

**Angular : change URL params sans refresh**

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
