import { SELECTORS } from '../support/selectors'

class LoginPage {
  visit(baseUrl) {
    cy.visit(`${baseUrl}/login`)
  }

  fillSignupForm(email) {
    cy.url().should('include', '/login')
    cy.get(SELECTORS.signupName).type('Test User')
    cy.get(SELECTORS.signupEmail).type(email)
    cy.get(SELECTORS.signupButton).click()
  }
}

export default LoginPage