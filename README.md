<h1 dir="auto" align="center"><a id="user-content-angular---the-modern-web-developers-platform" class="anchor" aria-hidden="true" href="#angular---the-modern-web-developers-platform"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Cocori-ng</h1>

<p dir="auto" align="center">
  <a target="_blank" title="Made with Angular" rel="noopener noreferrer" href="https://angular.io/assets/images/logos/angular/angular.svg"><img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular-logo" style="max-width: 100%;" width="120px" height="120px"></a>
  <br>
  <i>Cocori-ng is an Angular full of great components & utilites based on Material</i>
  <br>
</p>


# Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setting Up the Library](#settingup)
	1. [Library Web Interface](#librarywebinterface)
	2. [How to publish on Npm?](#publishnpm)
	3. [How to Package the library?](#packagelib)
3. [Styles & Themes of the library](#stylesthemes)
	1. [How to load the styles and set the theme of the lib from a client project?](#loadstylesthemes)
	2. [How to use color palettes defined from its theme in its component styles?](#usecolorpalette)
	3. [Mixins : classes margin & padding](#mixins)
4. [Fluent reactive form *(à enrichir)*](#reactiveform)
5. [Wrapping a javascript lib in an Angular component](#wrapjslib)
6. [Optimize Angular bundle size](#bundlesize)
7. [End-to-end testing with Cypress](#cypress)
8. [Upgrade front libraries of a project](#upgrade)
	1. [Deals with several versions of NodeJs](#nvm)
9. [Angular / Javascript Tips](#tips)
---

## Prerequisites : <a name="prerequisites"></a>


**Two projects :**
- the library
- the web project in order to view, test and develop the components of the lib

**Upgrade versions of Angular :**
- version 14.1.1 (July 2022)
- version 13.3.4 (April 2022)
- version 13.0.3 (November 2021)
- version 12.0.3 (August 2021)

Node : 16.10.0
Npm : 7.24.0

**Update Angular CLI version Globally**

npm uninstall -g angular-cli
npm cache verify (if npm > 5)
npm install -g @angular/cli@latest

🔗 https://www.angularjswiki.com/angular/update-angular-cli-version-ng-update-to-latest-6-7-versions/#:~:text=Steps%20To%20update%20Angular%20CLI,angular%2Fcli%40latest%20command


## Setting Up the Library :  <a name="settingup"></a>

*Lancer les commandes depuis la racine du projet web, là où se trouve le fichier `package.json` (pas dans le dossier `projects`)*

Faire un `npm i` si pas fait depuis longtemps

Builder la lib et rends la main : `ng build --project=cocori-ng`

Builder la lib et watch les changements : `ng build --project=cocori-ng --watch`

Puis se mettre dans le dossier de génération du livrable de la lib `cd dist/cocori-ng`

Générer un lien symbolique vers les sources de la lib : `npm link`

**Récapitulatif des commandes pour utiliser les sources de cocori-ng dans un autre projet en local (sans passer par npm) :**

```javascript
npm i
ng build --project=cocori-ng /** Commande qui build la lib et rends la main */
cd dist/cocori-ng
npm link
```

⚠️ On n utilise pas la commande `npm build` pour compiler Cocori-ng car Cocori-ng est composé de plusieurs sous-projets.

**Utiliser la lib depuis un autre projet client en local** :

```javascript
npm link cocori-ng
```

_Puis lancer la commande de build du project cible (npm build, npm run...)_

⚠️ Depuis le projet client, la commande `npm link cocori-ng` doit être relancée après chaque commande d'install `npm i` ou tout ajout d'une nouvelle lib. Ces commandes cassent le lien symbolique créé pour lier cocori-ng au projet client.

⚠️ angular.json :

- mettre `preserveSymlinks: true` dans `projects.$name.architect.build.options`

⚠️ package.json :

- installer les dépendances manquantes (penser ensuite à refaire npm link cocori-ng)


### Library Web Interface : <a name="librarywebinterface"></a> 

*Pour tester les composants de la lib ou en créer de nouveaux*

✨Builder le projet avec l`option watch :

``ng build --project=cocori-ng --watch``

✨Lancer le projet front :

``ng serve --configuration "local"``

Si htpps : 

``ng serve --ssl --configuration "local"``

### How to publish on Npm? : <a name="publishnpm"></a> 

**Url du dépôt Npm**

🔗https://www.npmjs.com/package/cocori-ng

**Increment the version of the library**

Fichier : ``projects\cocori-ng\package.json`` (propriété ``version``)

**Build the library**

``ng build --project=cocori-ng --configuration production``

**Publish it on Npm**

Check if connected as nicosaliagas : ``npm whoami``
Publier sur Npm :
``cd dist/cocori-ng``
``npm publish --access public``

### How to Package the library? : <a name="packagelib"></a>

Build the library : ``ng build --project=cocori-ng``
Aller dans le dossier dist : ``cd dist/cocori-ng`` puis lancer ``npm pack``

Le fichier ``cocori-ng-[version].tgz`` est généré

---

## Styles & Themes of the library: <a name="stylesthemes"></a>

Cocori-ng exporte des feuilles de styles partagées, des mixins et un thème.

Tous ces styles sont réunis dans un fichier scss : ``cocori-ng.theme.scss``

Importer ce fichier thème dans un projet web permet à l'utilisateur de bénéficier des styles de la lib et de les consommer et de les redéfinir dans son projet web.

Le thème de la lib permets de styliser les composants (du moins une partie) avec les couleurs du thème principal du projet client. Ainsi les composants de la lib seront aux couleurs du projets client.

### How to load the styles and set the theme of the lib from a client project? <a name="loadstylesthemes"></a>

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

### How to use color palettes defined from its theme in its component styles? <a name="usecolorpalette"></a>

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

### Mixins : classes margin & padding: <a name="mixins"></a>

le fichier `_margins-paddings.scss` génère un ensemble de classes css pour les margin et padding

*exemple d utilisation des classes css :*

``.m-b-15`` : ``margin-bottom: 15px;``

``.m-x-30`` : ``margin: 30px;``

``.p-l-10`` :  ``padding-left: 10px;``

``.p-x-25`` : ``padding: 25px;``

*Article Medium :*

``🔗 https://medium.com/@jerrythimothy/margins-paddings-sass-mixin-16460c32507f``


## Fluent reactive form *(à enrichir)*: <a name="reactiveform"></a>

**Génération de boutons de formulaire :**

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
---


## Wrapping a javascript lib in an Angular component: <a name="wrapjslib"></a>

#### Exemple avec la librairie : Color Picker

**Installation et référencement**

Source : [Lien vers la lib](https://www.cssscript.com/chrome-devtools-color-picker)

- installer la librairie : ``npm i @r-tek/colr_pickr --save``

- référencer la librairie dans le fichier ``angular.json`` :

  architect/build/options/styles :

  ``["./node_modules/@r-tek/colr_pickr/build/colr_pickr.min.css"]``

  architect/build/options/scripts :

  ``["./node_modules/@r-tek/colr_pickr/build/colr_pickr.min.js"]``

**Création de la directive**

Détails du fichier *cocoring-colorpicker.directive.ts* : 
``projects\cocori-ng\src\feature-form\shared\directive\color-picker\cocoring-colorpicker.directive.ts``

**Utilisation de la directive**

```HTML
<div class="circle-color" [cocoring-colorpicker]="color" (onColorChange)="onColorChange($event)"></div>
```

## Optimize Angular bundle size: <a name="bundlesize"></a>

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

---


## End-to-end testing with Cypress: <a name="cypress"></a>

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

---

## Upgrade front libraries of a project: <a name="upgrade"></a>

- exécuter la commande : ``ng update`` pour voir les package angular à mettre à jour

- faire ``ng update [nom du package]`` (archiver le fichier package.json entre chaque commande)

- Si erreur lors du `ng update`, ne pas hésiter de refaire la commande avec ` --force` à la fin
(ex : `ng update @angular/cdk --force`)

ex : problème de version avec Typescript
```
Package "@angular-devkit/build-angular" has an incompatible peer dependency to "typescript" (requires ">=4.4.3 <4.7", would install "4.7.4").
```

- Les packages angular seront à mettre à jour les uns après les autres en premier.

⚠️ Faire un commit et tester entre chaque update.

- Le package angular/material est en général à mettre à jour en 1er (dépendance avec le cdk)

- Relancer la commande `ng update` pour vérifier que tout soit ok

    Message de confirmation :

    ``We analyzed your package.json and everything seems to be in order. Good work!``

- Mettre à jour plusieurs package en une seule fois : `ng update name-package1 name-package2 name-package3` ...

- si certains package ne se mettent pas à jour (via la commande `ng update [nom du package]` ) : ``npm install rxjs@latest``

⚠️ Pensez à mettre à jour les versions des libs dans le fichier package.json de la lib `projects\cocori-ng\package.json` (propriété : peerDependencies) ⚠️


### Deals with several versions of NodeJs: <a name="nvm"></a>

Si besoins, installer l'outils NVM pour gérer différentes version de nodejs sur le poste
🔗 https://dev.to/skaytech/how-to-install-node-version-manager-nvm-for-windows-10-4nbi


## Angular / Javascript Tips: <a name="tips"></a>

**CLI generate of Angular schematics :**

exemple generate new component :
```
ng g component my_comp_name --display-block=true --skip-import=true --style=scss
```

All the commands : 🔗https://angular.io/cli/generate

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

**Change URL params without refresh**

```
this.urlHelperService.updateParamsUrlWithoutRefresh({ id: null })
```

**Change detection : déclencher les changements de variables dans la vue manuellement**

```
@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})

constructor(private cdr: ChangeDetectorRef) { }

/** Forcer le changement dans la vue */
this.cdr.detectChanges()
```

**Loop object properties | Iterate through object properties**

```
Object.entries(values).forEach(([key, value]) => {
    console.log(">>> ",key, value)
})
```

**Scss : bordure not full width**

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

**Material Icon : outlined style**

```
<mat-icon fontSet="material-icons-outlined">filter_alt</mat-icon>
```

**Material Icon : use in css**

```
li {
    &::before {
      🔹font-family: "Material Icons";
      🔹content: "\e5cc";
    }
  }
```

**Reactive form : ne pas émettre l'évènement de maj au setValue**

```
form.get('control').setValue('', {emitEvent: false})
```

**Subscribe / Unsubscribe**

⚠️ Se désabonner de tous les subscribe !

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

**DateTime/luxon : date functions helper :**

[Lien vers la doc](https://github.com/moment/luxon/blob/master/docs/formatting.md)

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

**Javascript : Replace all occurences :**

``myStringVar.replace(new RegExp(`${searchVar}`), replaceVar)  ``


**Unselect material button (enlever le focus) :**

Mettre ``cdkFocusRegionstart`` sur un autre élément Html 
ou mettre ``onclick="this.blur()"``

**RxJs : Groupby**
```
from(this.confPage.widgets).pipe(
	groupBy((widget: CustomType) => {
	return <number>widget.zone
}),
mergeMap(group => zip(of(group.key), group.pipe(toArray())))
).subscribe((group: [number | null, CustomType[]]) => {
	console.log("new group >>> ", group)
})
```

**Observable : call rest api and return new Observable :**
```
getEventInfos(): Observable<EventInfosModel> {
	if (this.eventInfos) {
	return of(this.eventInfos)
	} else {
		var subject = new Subject<EventInfosModel>();

        this.httpService.get(`url`).subscribe(
            (datas: any) => {
                this.eventInfos = datas
                subject.next(datas);
            })
        return subject.asObservable();
    }
}
```

**Exemple subscribe next / error**
```
this.getMappedDatasApi<WHeader>().pipe(
	takeUntil(this.destroy$),
filter((datas: any[]) => datas.length > 0),
).subscribe({
	next: this.handleUpdateResponse.bind(this),
	error: this.handleError.bind(this)
	}
)
```

**Scroll event avec material**
```
const content: any = document.querySelector('.mat-sidenav-content');

const scroll$ = fromEvent(content, 'scroll').pipe(
	throttleTime(10), // only emit every 10 ms
	map(() => content.scrollTop), // get vertical scroll position
	pairwise(), // look at this and the last emitted element
	// compare this and the last element to figure out scrolling direction
	map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)), 
	distinctUntilChanged(), // only emit when scrolling direction changed
	// share a single subscription to the underlying sequence in case of multiple subscribers
	share(), 
);

const goingUp$ = scroll$.pipe(
	filter(direction => direction === Direction.Up)
);

const goingDown$ = scroll$.pipe(
	filter(direction => direction === Direction.Down)
);

goingUp$.subscribe(() => console.log('scrolling up'))

goingDown$.subscribe(() => console.log('scrolling down'))
```

**Javascript : remove all elements from an array**

a.splice(0, a.length)

**Catch erreurs dans les appels api Observable/rxjs**
```
this.httpService.post(`apiUrl`, datas, SkipHeaders.TRUE).pipe(
catchError(err => {
	return throwError(() => err.error)
}),
).subscribe((datas: any) => { ... })
```

**Extract certain properties from all objects in array**
```
(<Object[]>items).map(( { id, name } ) => ( { id, name } ))
```

