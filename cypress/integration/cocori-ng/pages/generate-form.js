/// <reference types="Cypress" />

describe(`Génération d'un formulaire`, () => {
    it('Accéder à la page', () => {
        cy.visit(`${Cypress.env('host')}/home`)
    })

    it('Présence du formulaire', () => {
        cy.get('#generatedForm ct-textarea').should('exist');
    })

    it(`Génération d'un formulaire en erreur`, () => {
        cy.get('#generatedForm ct-textarea textarea').clear().type(`test`);
        cy.get('form#generatedForm').submit();
        cy.get('#jsonParsed').contains('oops JSON.parse a généré une erreur... SyntaxError: Unexpected token').should('be.visible');
        cy.get('form#interpretedForm').should('not.be.visible');
    })

    it(`Génération d'un formulaire en succès`, () => {
        cy.get('#generatedForm ct-textarea textarea').clear().type(`{"fields": [{"label": "Nom", "name": "name", "type": "input-text"}]}`, { parseSpecialCharSequences: false });
        cy.get('form#generatedForm').submit();
        cy.get('form#interpretedForm').should('be.visible');
        // cy.get('#interpretedForm ct-input-text').should('have.length', 1);
        // cy.get('#interpretedForm ct-input-text mat-label').should('have.text', 'Nom');
        cy.get('#interpretedForm ct-input-text').then(($input) => {
            expect($input).to.have.length(1);
            expect($input).to.have.text('Nom');
        });
        cy.get('#interpretedForm ct-input-text input[type=text]').clear().type(`aliagas`);
        cy.get('form#interpretedForm').submit();
        cy.get('#resultatInterpretedForm').contains('{ "name": "aliagas" }').should('be.visible');
    })

    it(`Génération d'un formulaire complexe en succès`, () => {
        cy.get('#generatedForm ct-textarea textarea').clear().type(`
            {"fields": [
                {"label": "Nom", "name": "name", "type": "input-text"},
                {"label": "Prénom", "name": "firstname", "type": "input-text"},
                {"label": "Description", "name": "description", "type": "input-textarea"}
            ]}`, { parseSpecialCharSequences: false });
        cy.get('form#generatedForm').submit();
        cy.get('form#interpretedForm').should('be.visible');

        cy.get('#interpretedForm ct-input-text').then(($input) => {
            expect($input).to.have.length(2);
            expect($input.eq(0)).to.have.text('Nom');
            expect($input.eq(1)).to.have.text('Prénom');
        });
    })

    // it('Lecture fichier Json', () => {
    //     // cy.readFile('src/assets/ressources/config-frm-abrege.json').then((json) => {
    //     cy.readFile('cypress/integration/cocori-ng/ressources/config-frm.json').then((json) => {
    //         expect(json).to.be.an('object')
    //     })
    //         .its('test').should('eq', 5)
    // })
})