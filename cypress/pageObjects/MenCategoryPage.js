class MenCategoryPage {
  selectJeans() {
    cy.contains('Men').click()
    cy.contains('Jeans').click()
  }
}

export default MenCategoryPage