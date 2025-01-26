class ContactUsPage {
  fillContactForm() {
    // Click on the 'Contact us' link
    cy.contains('Contact us').click()

    // Verify that the URL includes '/contact_us'
    cy.url().should('include', '/contact_us')

    // Fill in the 'Name' field
    cy.get('[data-qa="name"]').type('Test User')

    // Fill in the 'Email' field
    cy.get('[data-qa="email"]').type('testuser@example.com')

    // Fill in the 'Subject' field
    cy.get('[data-qa="subject"]').type('Test Subject')

    // Fill in the 'Message' field
    cy.get('[data-qa="message"]').type('This is a test message.')

    // Upload a file
    cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/example.json')

    // Click on the 'Submit' button
    cy.get('[data-qa="submit-button"]').click()

    // Verify that the submission was successful
    cy.get('.status.alert.alert-success').should('contain', 'Success')
  }
}

export default ContactUsPage