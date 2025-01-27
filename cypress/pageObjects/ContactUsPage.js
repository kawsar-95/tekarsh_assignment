import { SELECTORS } from '../support/selectors'

class ContactUsPage {
  fillContactForm() {
    cy.fillContactForm('Test User', 'testuser@example.com', 'Test Subject', 'This is a test message.')
  }
}

export default ContactUsPage