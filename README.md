# CocoriLibrary : projet library

2 projets : un projet de type library et un projet web angular classique permettant de dév et tester les composants de la lib 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

Version actuelle d'Angular : 12.0.3  (Août 2021)

# [Installation du poste de travail]

- installer NVM pour gérer différentes version de nodejs sur le poste
tuto : https://dev.to/skaytech/how-to-install-node-version-manager-nvm-for-windows-10-4nbi

## New project

- ng new my-first-project

si erreur lors de la création d'un nouveau projet : 
    Odd numbered Node.js versions will not enter LTS status and should not be used for production

Arrêter et dowgrader la version de nodejs via l'outils NVM puis essayer à nouveau. Le message ne doit pas s'afficher.

## Commandes de génération de classes (service, component, il y en a d'autres encore...) :

```ng g service file```

```ng g component cocoring-cms-image-upload --display-block=true --skip-import=true --style=scss```

## Compiler la lib Cocori-ng pour ensuite l'utiliser dans un autre projet : 

Commandes pour builder la lib :

- pour développer sur le projet cocori-ng
- pour utiliser la lib dans un autre projet avec la méthode `link`

Lancer les commandes à la racine du projet :

- se mettre à la racine du projet, là où se trouve le fichier ```package.json```

__Depuis le projet Cocori-ng__ :

Commande qui build la lib et rends la main : ```npm run lib:build```

- à lancer si la lib est utilisée dans un autre projet

```
npm i
npm run lib:build
cd dist/cocori-ng 
npm link
```

⚠️ On n'utilise pas la commande `npm build` pour compiler Cocori-ng car Cocori-ng est composé de plusieurs sous-projets.

__Depuis le projet client qui utilise Cocori-ng__ : 
```
npm i
npm link @cocori-ng/lib
```
_Puis lancer la commande de build du project cible (npm build, npm run...)_

⚠️ La commande `npm link @cocori-ng/lib` doit être relancée après chaque `npm i` car ce denier détruit les liens symboliques créés pour ier cocori-ng au projet client.

## Développer sur la lib Cocori-ng et sur le projet client en même temps (avec watch) :

Commande qui build la lib et se mets en écoute (rebuild auto si sauvegarde d'un fichier) : ```npm run lib```

- à lancer si vous souhaitez développer la lib

Créer un lien symbolique vers la lib

```
cd dist\cocori-ng
#sudo avant si linux
npm link 
```

Projet cible (ex Boulle):

`npm link @cocori-ng/lib`


si erreur :

* se mettre en version node : 15.12.0
* projet cible : "projects.$name.architect.build.options.preserveSymlinks: true" in angular.json
* installer les dépendances manquantes dans le projet cible et refaire un coup de : npm link @cocori-ng/lib

## Lancer le projet pour tester les composants de la lib...

lancer la commande : ```ng serve```

## Packager la lib

After building your library with ```ng build --project=cocori-ng```, go to the dist folder ```cd dist/cocori-ng``` and run ```npm pack```.

## 🎨 Styles et Thème de la lib

- De quoi parle t'on ?


Cocori-ng exporte des feuilles de styles partagées, des mixins et un thème.

Tous ces styles sont réunis dans un fichier scss : ```cocori-ng.theme.scss```

Importer ce fichier thème dans un projet web permet à l'utilisateur de bénéficier des styles de la lib et de les consommer ou de les redéfinir dans son projet web. 

Le thème de la lib permets de styliser les composants (du moins une partie) avec les couleurs du thème principal du projet cible. Ainsi les composants de la lib seront aux couleurs du projets cibles.

- Comment charger les styles et paramétrer le thème de la lib dans mon projet :

Depuis le thème principal de mon projet : 

on importe le thème et tous les fichiers scss de la lib : ```@import 'cocori-ng/cocori-ng.theme.scss';```

on charge le thème de la lib avec les palettes de couleurs du site en paramètre :

    - le thème du site
    - la palette de couleurs vertes (pour les notifs succès par exemple)
    - la palette de couleurs bleues

exemple : ```@include cocori-ng-theme($theme-principal, $palette-green, $palette-blue);```

- Utiliser une mixin dans un fichier scss de mon projet :

on importe les mixins depuis la lib : ```@import "@cocori-ng/lib/src/lib/assets/mixins";```

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

## Librairie Utilisée

- Angular Material
- Angular Material Design Icons
- FakerJs : fake datas 
    npm install faker --save-dev
    npm install @types/faker --save-dev

`Utiliser le color picker dans un projet`

doc lib : https://www.cssscript.com/chrome-devtools-color-picker/

- installer la lib color picker (tjrs depuis la racine du projet cible) : ```npm i @r-tek/colr_pickr --save```
- référencer la lib dans le fichier angular.json :
    > architect / build / options / styles : ["./node_modules/@r-tek/colr_pickr/build/colr_pickr.min.css"]
    > architect / build / options / scripts : ["./node_modules/@r-tek/colr_pickr/build/colr_pickr.min.js"]


**********************
## Optimize Bundle Size
**********************
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


## Mise à jour d'Angular sur un projet

- s'il s'agit d'une version majeur d'Angular ex : passage du version 11 vers 12 ou 12 vers 13 ...
    * mettre à jour la version d'Angular cli sur le serveur de ci/cd [documentation Cocorisoft](https://bitbucket.org/cocorisoft/cocorisoft/src/master/ci-cd/README.md)
- étapes à suivre pour faire une montée de version d'Angular : https://update.angular.io/?l=3&v=11.0-12.0
- ng update pour voir les packages à mettre à jour
- ex : ng update @angular/cdk @angular/flex-layout @angular/material

## Angular Tips & Ressources + Aides + Help !

// dynamically-create-nested-objects
https://stackoverflow.com/questions/5484673/javascript-how-to-dynamically-create-nested-objects-using-object-names-given-by


``FlexLayout | MediaObserver :``

/** implémentation côté code pour détecter la taille de l'écran */

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

`` Référence un composant enfant et accès à ces propriétés depuis un composant parent ``

@ViewChild(CocoringDatagridComponent, { static: false }) cocoringDatagridComponent!: CocoringDatagridComponent;

