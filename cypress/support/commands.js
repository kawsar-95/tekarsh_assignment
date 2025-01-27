// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { SELECTORS } from './selectors';

Cypress.Commands.add('login', (email, password) => {
  cy.visit(Cypress.env('BASE_URL') + '/login');
  cy.get(SELECTORS.login.signupName).type('Test User');
  cy.get(SELECTORS.login.signupEmail).type(email);
  cy.get(SELECTORS.login.signupButton).click();
  cy.get(SELECTORS.login.password).type(password);
  cy.get(SELECTORS.login.createAccountButton).click();
});

Cypress.Commands.add('fillContactForm', (name, email, subject, message) => {
  cy.contains(SELECTORS.contactUs.link).click();
  cy.url().should('include', '/contact_us');
  cy.get(SELECTORS.contactUs.name).type(name);
  cy.get(SELECTORS.contactUs.email).type(email);
  cy.get(SELECTORS.contactUs.subject).type(subject);
  cy.get(SELECTORS.contactUs.message).type(message);
  cy.get(SELECTORS.contactUs.uploadFile).selectFile('cypress/fixtures/example.json');
  cy.get(SELECTORS.contactUs.submitButton).click();
  cy.get(SELECTORS.contactUs.successMessage).should('contain', 'Success');
});