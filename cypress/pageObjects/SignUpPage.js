import { SELECTORS } from '../support/selectors'

class SignUpPage {
  fillRegistrationDetails(password) {
    cy.get('#id_gender1').check()
    cy.get(SELECTORS.password).type(password)
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('May')
    cy.get('[data-qa="years"]').select('1995')
    cy.get('#first_name').type('Test')
    cy.get('#last_name').type('User')
    cy.get('#company').type('Test Company')
    cy.get('#address1').type('123 Test Street')
    cy.get('#country').select('Canada')
    cy.get('#state').type('Test State')
    cy.get('#city').type('Test City')
    cy.get('#zipcode').type('12345')
    cy.get('#mobile_number').type('1234567890')
    cy.get(SELECTORS.createAccountButton).click()
    cy.get(SELECTORS.accountCreatedMessage).contains('Account Created!')
    cy.url().should('include', '/account_created')
    cy.get(SELECTORS.continueButton).click()
  }
}

export default SignUpPage