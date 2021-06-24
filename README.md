# CocoriLibrary : projet library

2 projets : un projet de type library et un projet web angular classique 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

# [Installation du poste de travail]

- installer NVM pour gérer différentes version de nodejs sur le poste
tuto : https://dev.to/skaytech/how-to-install-node-version-manager-nvm-for-windows-10-4nbi

## New project

- ng new my-first-project

si erreur lors de la création d'un nouveau projet : 
    Odd numbered Node.js versions will not enter LTS status and should not be used for production

Arrêter et dowgrader la version de nodejs via l'outils NVM puis essayer à nouveau. Le message ne doit pas s'afficher.


## Generate commands :
ng g service file
ng g component cocoring-cms-image-upload --display-block=true --skip-import=true --style=scss

## Compiler la lib Cocori-ng pour ensuite l'utiliser dans un autre projet : 

__Depuis le projet Cocori-ng__ : 
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

Mode développement : lancer la commande pour builder la lib

`npm run lib`

Créer un lien symbolique vers la lib

```
cd dist\cocori-ng
#sudo avant si linux
npm link 
```

Projet cible (ex Boulle):

`npm link @cocori-ng/lib`


si erreur

* se mettre en version node : 15.12.0
* projet cible : "projects.$name.architect.build.options.preserveSymlinks: true" in angular.json
* installer les dépendances manquantes dans le projet cible et refaire un coup de : npm link @cocori-ng/lib

Il est possible de lancer le projet Angular pour tester la librairie : 
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

## Erreurs

1.
Problème : A la compilation, le site utilisant la lib ne reconnait plus les balises ou attributs Form, Angular Material...
Raison : il y a des imports erronés dans la lib cocori-ng,

ex : import { * } from 'project\cocori-ng\src...\ma_classe' au lieu de ../../ma_classe

2.
Erreur du type :

```9 static ɵprov: i0.ɵɵInjectableDef<CurrentUrlRoutingService>;```

Il faut que les versions d'Angular entre la lib et le projet cible soit identique

Comment voir si on est dans les mêmes versions Angular ?

Pour vérifier, consulter les fichiers package.json du projet Cocori-ng et du projet angular cible.

La ligne ```"@angular/core": "~12.0.3"``` => indique le numéro de de version d'Angular du projet ici c'est la version 12

Si le numéro de version majeure d'angular est différent => le mettre à jour à la version la plus récente dans le proejt concernée

NB : Pensez à faire ```npm install``` après un changement de version d'une lib dans le fichier package.json

## Ressources

// dynamically-create-nested-objects
https://stackoverflow.com/questions/5484673/javascript-how-to-dynamically-create-nested-objects-using-object-names-given-by

