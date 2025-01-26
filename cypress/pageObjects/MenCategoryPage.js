class MenCategoryPage {
  selectJeans() {
    // Hover/click Men -> Jeans
    cy.contains('Men').click() // Click on the 'Men' category
    cy.contains('Jeans').click() // Click on the 'Jeans' subcategory
  }
}
export default MenCategoryPage