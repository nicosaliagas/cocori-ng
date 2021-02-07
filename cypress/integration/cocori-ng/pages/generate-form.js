/// <reference types="Cypress" />

describe(`Génération d'un formulaire`, () => {
    it('Accéder à la page', () => {
        cy.visit(`${Cypress.env('host')}/home`)
    })

    it('Etre redirigé vers la page générant un formulaire dynamique', () => {
        cy.get('button#btnGenerateDynamicForm').click().then(($input) => {
            cy.location('pathname').should('eq', '/generic-form')
        });
    })

    it('Présence du formulaire', () => {
        cy.get('#generatedForm input-textarea-ng').should('exist');
    })

    it(`Génération d'un formulaire en erreur`, () => {
        cy.get('#generatedForm input-textarea-ng textarea').clear().type(`test`);
        cy.get('form#generatedForm').submit();
        cy.get('#jsonParsed').contains('oops JSON.parse a généré une erreur... SyntaxError: Unexpected token').should('be.visible');
        cy.get('form#interpretedForm').should('not.be.visible');
    })

    it(`Génération d'un formulaire en succès`, () => {
        cy.readFile('cypress/integration/cocori-ng/ressources/generate-form-schema.json').then((json) => {
            expect(json).to.be.an('object')

            // .its('test').should('eq', 5)

            cy.get('#generatedForm input-textarea-ng textarea').clear()
            cy.get('#generatedForm input-textarea-ng textarea').then(function (textarea) {
                textarea.val(JSON.stringify(json))
            })
            cy.get('#generatedForm input-textarea-ng textarea').type(' ');
            cy.get('form#generatedForm').submit();
            cy.get('form-container-ng > form').should('be.visible');

            // cy.get('form-container-ng > form input-text-ng').should('have.length', 1);
            // cy.get('form-container-ng > form input-text-ng').should('have.text', 'Nom');

            cy.get('form-container-ng > form input-text-ng').then(($input) => {
                expect($input).to.have.length(1);
                expect($input).to.have.text('Nom');
                cy.get($input).find("input[type=text]").clear().type(`aliagas`);
            });

            cy.get('form-container-ng > form input-viewer-ng').then(($input) => {
                expect($input).to.have.length(1);
                expect($input).to.have.text('Viewer3D');
                cy.get($input).find("input[type=text]").clear().type(10);
            });

            cy.get('form-container-ng > form input-textarea-ng').then(($input) => {
                expect($input).to.have.length(1);
                expect($input).to.have.text('Description');
                cy.get($input).find("textarea").clear().type('ma superbe description');
            });

            cy.get('form-container-ng > form form-buttons-ng').then(($input) => {
                expect($input).to.have.length(1);

                // todo: tester si le bouton est de type submit
                cy.get($input).find("cocoring-button").then(($buttons) => {
                    expect($buttons).to.have.length(3);

                    expect($buttons[1]).to.have.text("Annuler");
                    expect($buttons[2]).to.have.text("Test Button");

                    expect($buttons[0]).to.have.text("Valider");

                    // cy.get('form-container-ng > form').submit();
                    cy.get($buttons[0]).click().then(() => {
                        cy.get('.result-frm').should('be.visible');
                    });
                });
            });
        })
    })
})