class LoginPage {
  // Method to visit the login page
  visit() {
    cy.visit('https://automationexercise.com/login') // Navigate to the login page
  }

  // Method to fill the signup form
  fillSignupForm(email) {
    cy.url().should('include', '/login') // Verify that the URL includes '/login'
    cy.get('[data-qa="signup-name"]').type('Test User') // Type 'Test User' into the signup name field
    cy.get('[data-qa="signup-email"]').type(email) // Type the provided email into the signup email field
    cy.get('[data-qa="signup-button"]').click() // Click the signup button
  }
}

export default LoginPage