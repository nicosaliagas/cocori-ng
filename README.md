# CocoriLibrary : projet library

2 projets : un projet de type library et un projet web angular classique 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

## New project

ng new my-first-project

## Generate commands :
ng g service file
ng g component cocoring-cms --display-block=true --skip-import=true --style=scss

## Lancer le projet web et le projet library en même temps

`Mode développement : lancer la commande pour builder la lib`

npm run build-lib-watch

`Créer un lien symbolique vers la lib`

cd dist\cocori-ng

npm link (sudo avant si linux)

`Projet cible :`
npm link @cocori-ng/lib


`Il est possible de lancer le projet Angular pour tester la librairie`
dans une autre fenêtre cmd, lancer la commande : 

ng serve

## Package lib

After building your library with `ng build --project=cocori-ng`, go to the dist folder `cd dist/cocori-ng` and run `npm pack`.

## Librairie Utilisée

- Angular Material
- Angular Material Design Icons
- FakerJs : fake datas 
    npm install faker --save-dev
    npm install @types/faker --save-dev


## Initialise le thème de la lib Cocori-ng

@import 'cocori-ng/cocori-ng.theme.scss';
@include cocori-ng-theme($theme-principal, $palette-green);


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

## Erreurs

1.
Problème : A la compilation, le site utilisant la lib ne reconnait plus les balises ou attributs Form, Angular Material...
Raison : il y a des imports erronés dans la lib cocori-ng,

ex : import { * } from 'project\cocori-ng\src...\ma_classe' au lieu de ../../ma_classe


## Ressources

// dynamically-create-nested-objects
https://stackoverflow.com/questions/5484673/javascript-how-to-dynamically-create-nested-objects-using-object-names-given-by

