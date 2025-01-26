class ProductPage {
  viewAnyProductThenAddToCart() {
    // Verify that the URL includes '/category_products'
    cy.url().should('include', '/category_products')

    // Click on the first 'View Product' button
    cy.contains('View Product').first().click()

    // Verify that the URL includes '/product_details'
    cy.url().should('include', '/product_details')

    // Clear the quantity input field and type '2'
    cy.get('#quantity').clear().type('2')

    // Click on the 'Add to cart' button
    cy.get('.btn.btn-default.cart').click()

    // Click on the 'Close' button in the modal
    cy.get('.btn.btn-success.close-modal.btn-block').click()
  }
}

export default ProductPage