// / <reference types="Cypress" />

describe('Category: Visual tests', () => {
    // eslint-disable-next-line no-undef
    before(() => {
        // Clean previous state and prepare Administration
        cy.setToInitialState()
            .then(() => {
                cy.loginViaApi();
            })
            .then(() => {
                cy.createProductFixture();
            })
            .then(() => {
                cy.openInitialPage(Cypress.env('admin'));
            });
    });

    it('@visual: check appearance of basic category workflow', () => {
        cy.server();
        cy.route({
            url: `${Cypress.env('apiPath')}/search/category`,
            method: 'post'
        }).as('getData');

        cy.clickMainMenuItem({
            targetPath: '#/sw/category/index',
            mainMenuId: 'sw-catalogue',
            subMenuId: 'sw-category'
        });

        cy.wait('@getData').then((xhr) => {
            expect(xhr).to.have.property('status', 200);
        });
        cy.get('.sw-category-tree').should('be.visible');
        cy.takeSnapshot('[Category] Detail', '.sw-category-tree');

        cy.contains('.tree-link', 'Home').click();
        cy.wait('@getData').then((xhr) => {
            expect(xhr).to.have.property('status', 200);
        });
        cy.get('.sw-loader').should('not.exist');
        cy.takeSnapshot('[Category] Listing', '.sw-card');

        cy.contains('.sw-category-detail__tab-products', 'Products');
        cy.get('.sw-loader').should('not.exist');
        cy.get('.sw-data-grid__skeleton').should('not.exist');
        cy.takeSnapshot('[Category] Detail, Products', '.sw-card');

        cy.contains('.sw-category-detail__tab-cms', 'Layout');
        cy.get('.sw-loader').should('not.exist');
        cy.takeSnapshot('[Category] Detail, Products', '.sw-card');
    });
});
