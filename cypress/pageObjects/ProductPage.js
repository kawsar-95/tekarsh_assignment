class ProductPage {
  viewAnyProductThenAddToCart() {
    cy.url().should('include', '/category_products')
    cy.contains('View Product').first().click()
    cy.url().should('include', '/product_details')
    cy.get('#quantity').clear().type('2')
    cy.get('.btn.btn-default.cart').click()
    cy.get('.btn.btn-success.close-modal.btn-block').click()
  }
}

export default ProductPage