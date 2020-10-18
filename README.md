# CocoriLibrary : projet library

2 projets : un projet de type library et un projet web angular classique 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

## New project

ng new my-first-project

## Lancer le projet web et le projet library en même temps

`Créer un lien symbolique vers la lib`

npm run link

`Build lib & watch`
dans une fenêtre cmd :

npm run build-lib-watch

`Serve projet angular`
dans une autre fenêtre cmd :

ng serve


## Tests e2e via Cypress

npm install cypress --save-dev

> run : npx cypress open
> record tests e2e : npx cypress run --record --key 84330dcb-1088-4e89-bfc4-72d1c3f63c13

`connecteurs`
https://example.cypress.io/commands/connectors

`lire un fichier json`
https://example.cypress.io/commands/files