/// <reference types="Cypress" />

describe(`Page d'accueil du projet lib`, () => {
    it('Accéder à la page', () => {
        cy.visit(`${Cypress.env('host')}/home`)
    })

    it('Présence des boutons', () => {
        cy.get('ct-home .actions button').should('have.length', 3);
    })
})