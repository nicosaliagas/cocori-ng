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

## Commandes de génération de classes (service, component, il y en a d'autres encore...) :
ng g service file
ng g component cocoring-cms-image-upload --display-block=true --skip-import=true --style=scss

## Builder la lib et la lier pour l'utiliser dans un autre projet

Commandes pour builder la lib :

- pour développer sur le projet cocori-ng
- pour utiliser la lib dans un autre projet avec la méthode `link`

Lancer les commandes à la racine du projet :

- se mettre à la racine du projet, là où se trouve le fichier ```package.json```

Commande qui build la lib et se mets en écoute (rebuild auto si sauvegarde d'un fichier) : ```npm run lib```

- à lancer si vous souhaitez développer la lib

Commande qui build la lib et rends la main : ```npm run lib:build```

- à lancer si la lib est utilisée dans un autre projet

Créer un lien symbolique vers la lib :

- builder la lib avant !
- se placer dans le dossier générer : ```cd dist\cocori-ng```
- lancer la commande : ```npm link```

Depuis le projet cible :

- se mettre à la racine du projet, là où se trouve le fichier ```package.json```
- commande : ```npm link @cocori-ng/lib```
- cela va permettre de faire un lien vers le contenu de la lib ```dist\cocori-ng``` du projet cocori-ng


si erreur :

* se mettre en version node : 15.12.0
* projet cible : "projects.$name.architect.build.options.preserveSymlinks: true" in angular.json
* installer les dépendances manquantes dans le projet cible et refaire un coup de : npm link @cocori-ng/lib

## Lancer le projet pour tester les composants de la lib...

lancer la commande : ```ng serve```

## Packager la lib

After building your library with ```ng build --project=cocori-ng```, go to the dist folder ```cd dist/cocori-ng``` and run ```npm pack```.

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


FlexLayout | MediaObserver :

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
