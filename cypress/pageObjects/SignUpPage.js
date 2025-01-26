class SignUpPage {
  fillRegistrationDetails(password) {
    // Select gender
    cy.get('#id_gender1').check()

    // Enter password
    cy.get('#password').type(password)

    // Select date of birth
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('May')
    cy.get('[data-qa="years"]').select('1995')

    // Enter first name
    cy.get('#first_name').type('Test')

    // Enter last name
    cy.get('#last_name').type('User')

    // Enter company name
    cy.get('#company').type('Test Company')

    // Enter address
    cy.get('#address1').type('123 Test Street')

    // Select country
    cy.get('#country').select('Canada')

    // Enter state
    cy.get('#state').type('Test State')

    // Enter city
    cy.get('#city').type('Test City')

    // Enter zipcode
    cy.get('#zipcode').type('12345')

    // Enter mobile number
    cy.get('#mobile_number').type('1234567890')

    // Click on create account button
    cy.get('[data-qa="create-account"]').click()

    // Verify account creation message
    cy.get('[data-qa="account-created"]').contains('Account Created!')

    // Verify URL contains '/account_created'
    cy.url().should('include', '/account_created')

    // Click on continue button after account creation
    cy.get('[data-qa="continue-button"]').click()
  }
}

export default SignUpPage