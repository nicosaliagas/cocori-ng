# CocoriLibrary : projet library

2 projets : un projet de type library et un projet web angular classique permettant de dév et tester les composants de la lib

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

Version actuelle d'Angular : 12.0.3 (Août 2021)

# [Installation du poste de travail]

- installer NVM pour gérer différentes version de nodejs sur le poste
  tuto : https://dev.to/skaytech/how-to-install-node-version-manager-nvm-for-windows-10-4nbi

## New project

- ng new my-first-project

si erreur lors de la création d'un nouveau projet :
Odd numbered Node.js versions will not enter LTS status and should not be used for production

Arrêter et dowgrader la version de nodejs via l'outils NVM puis essayer à nouveau. Le message ne doit pas s'afficher.

## Commandes de génération de classes (service, component, il y en a d'autres encore...) :

`ng g service file`

Generate new component :
`ng g component cocoring-cms-image-upload --display-block=true --skip-import=true --style=scss`

## Compiler la lib Cocori-ng pour ensuite l'utiliser dans un autre projet :

Commandes pour builder la lib :

- pour développer sur le projet cocori-ng
- pour utiliser la lib dans un autre projet avec la méthode `link`

Lancer les commandes à la racine du projet :

- se mettre à la racine du projet, là où se trouve le fichier `package.json`

**Depuis le projet Cocori-ng** :

Commande qui build la lib et rends la main : `npm run lib:build`

- à lancer si la lib est utilisée dans un autre projet

```
npm i
npm run lib:build
cd dist/cocori-ng ; npm link ; cd ../..
npm link
```

⚠️ On n'utilise pas la commande `npm build` pour compiler Cocori-ng car Cocori-ng est composé de plusieurs sous-projets.

**Depuis le projet client qui utilise Cocori-ng** :

```
npm i
npm link @cocori-ng/lib
```

_Puis lancer la commande de build du project cible (npm build, npm run...)_

⚠️ La commande `npm link @cocori-ng/lib` doit être relancée après chaque `npm i` car ce denier détruit les liens symboliques créés pour ier cocori-ng au projet client.

## Développer sur la lib Cocori-ng et sur le projet client en même temps (avec watch) :

Commande qui build la lib et se mets en écoute (rebuild auto si sauvegarde d'un fichier) : `npm run lib`

- à lancer si vous souhaitez développer la lib

Créer un lien symbolique vers la lib

```
cd dist\cocori-ng
#sudo avant si linux
npm link
```

Projet cible (ex Boulle):

`npm link @cocori-ng/lib`

⚠️ angular.json :

- mettre `preserveSymlinks: true` dans `projects.$name.architect.build.options`

⚠️ package.json :

- installer les dépendances manquantes (penser à refaire npm link @cocori-ng/lib)

Librairies requises de bases :

"@angular/cdk": "^12.0.3",
"@angular/material": "^12.0.3",
"@angular/flex-layout": "^12.0.0-beta.34",
"@tinymce/tinymce-angular": "^4.2.4",
"spark-md5": "^3.0.1",

Librairies pour la partie CMS :

"@r-tek/colr_pickr": "^2.0.0",

- Démarrer le projet frontend :

## Lancer le projet pour tester les composants de la lib...

✨#frontend local + backend local

ng serve --configuration "local" --port 5050

(implémentation si htpps : ng serve --ssl --configuration "local" --port 5050)

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
  - mettre à jour la version d'Angular cli sur le serveur de ci/cd [documentation Cocorisoft](https://bitbucket.org/cocorisoft/cocorisoft/src/master/ci-cd/README.md)
- étapes à suivre pour faire une montée de version d'Angular : https://update.angular.io/?l=3&v=11.0-12.0
- ng update pour voir les packages à mettre à jour
- ex : ng update @angular/cdk @angular/flex-layout @angular/material

## Montée de version des libraries d'un projet

- Voir les librairies à mettre à jour : `npm outdated`

- Update all librairies : `npm update`

## Angular Tips & Ressources + Aides + Help !

// dynamically-create-nested-objects
https://stackoverflow.com/questions/5484673/javascript-how-to-dynamically-create-nested-objects-using-object-names-given-by

`Comment détecter la taille de l'écran côté component avec la lib FlexLayout ? `

https://github.com/angular/flex-layout/wiki/MediaObserver

exemple :

private eventSizeScreen(mediaObserver: MediaObserver) {
this.subscription.add(
mediaObserver.media$.subscribe((change: MediaChange) => {
        this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';

        if (change.mqAlias === 'xs') {
            /** si taille d'écran mobile */
        } else {
            /** sinon */
        }
        })
    );

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
changeDetection: ChangeDetectionStrategy.OnPush,

this.cdr.detectChanges()
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

`Reactive form : ne pas émettre l'évènement de maj au setValue`

```
form.get('control').setValue('', {emitEvent: false})
```

`Unsubscribe`

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
    🔹this.destroy$.next();
    🔹this.destroy$.complete();
  }
}

```