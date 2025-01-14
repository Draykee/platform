// / <reference types="Cypress" />

describe('Administration: Check module navigation', () => {
    // eslint-disable-next-line no-undef
    before(() => {
        cy.setToInitialState()
            .then(() => {
                cy.loginViaApi();
            })
            .then(() => {
                cy.createReviewFixture();
            })
            .then(() => {
                cy.openInitialPage(`${Cypress.env('admin')}#/sw/dashboard/index`);
            });
    });

    it('@base @navigation: navigate to review module', () => {
        cy.server();
        cy.route({
            url: `${Cypress.env('apiPath')}/search/product-review`,
            method: 'post'
        }).as('getData');

        cy.clickMainMenuItem({
            targetPath: '#/sw/review/index',
            mainMenuId: 'sw-catalogue',
            subMenuId: 'sw-review'
        });
        cy.wait('@getData').then((xhr) => {
            expect(xhr).to.have.property('status', 200);
        });
        cy.get('.sw-review-list').should('be.visible');

        cy.get('.sw-data-grid-skeleton').should('not.exist');
        cy.contains('.sw-data-grid__cell--title', 'Bestes Produkt').should('be.visible');
        cy.takeSnapshot('[Review] Listing', '.product-slider-item');

        cy.contains('.sw-data-grid__cell--title', 'Bestes Produkt').click();
        cy.get('.sw-loader').should('not.exist');
        cy.takeSnapshot('[Review] Listing', '.sw-card-section--secondary');
    });
});
