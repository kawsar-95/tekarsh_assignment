class CartPage {
  proceedToCheckout() {
    // Click on the cart link in the shop menu
    cy.get('.shop-menu a[href="/view_cart"]').click()
    // Click on the 'Proceed To Checkout' button
    cy.contains('Proceed To Checkout').click()
  }

  placeOrder() {
    // Verify that the URL includes '/checkout'
    cy.url().should('include', '/checkout')
    // Verify that the delivery address section is visible
    cy.get('#address_delivery').should('be.visible')
    // Verify that the invoice address section is visible
    cy.get('#address_invoice').should('be.visible')
    // Verify that the table containing order details is visible
    cy.get('.table').should('be.visible')
    // Verify that the cart quantity contains '2'
    cy.get('.cart_quantity').contains('2')
    // Click on the 'Check Out' button
    cy.get('.btn.btn-default.check_out').click()
    // Verify that the URL includes '/payment'
    cy.url().should('include', '/payment')
    // Enter the name on the card
    cy.get('[data-qa="name-on-card"]').type('Test User')
    // Enter the card number
    cy.get('[data-qa="card-number"]').type('4111111111111111')
    // Enter the CVC code
    cy.get('[data-qa="cvc"]').type('123')
    // Enter the expiry month
    cy.get('[data-qa="expiry-month"]').type('05')
    // Enter the expiry year
    cy.get('[data-qa="expiry-year"]').type('2025')
    // Click on the 'Pay' button
    cy.get('[data-qa="pay-button"]').click()
    // Verify that the order placed message contains 'Order Placed!'
    cy.get('[data-qa="order-placed"]').should('contain', 'Order Placed!')
  }
}

export default CartPage