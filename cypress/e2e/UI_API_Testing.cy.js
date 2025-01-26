import LoginPage from '../pageObjects/LoginPage'
import SignUpPage from '../pageObjects/SignUpPage'
import MenCategoryPage from '../pageObjects/MenCategoryPage'
import ProductPage from '../pageObjects/ProductPage'
import CartPage from '../pageObjects/CartPage'
import ContactUsPage from '../pageObjects/ContactUsPage'

describe('UI and API Tests', () => {
  const loginPage = new LoginPage()
  const signUpPage = new SignUpPage()
  const menCatPage = new MenCategoryPage()
  const productPage = new ProductPage()
  const cartPage = new CartPage()
  const contactUsPage = new ContactUsPage()

  const testEmail = `test_${Date.now()}@test.com`
  // const testPassword = 'TestPassword123'
  const testPassword = Cypress.env('TEST_PASSWORD')
  const baseUrl = Cypress.env('BASE_URL')

  it('UI Testing - End to End Flow', () => {
    // 1. Visit the Login Page
    loginPage.visit(baseUrl)

    // 2. Sign Up
    loginPage.fillSignupForm(testEmail)
    console.log(testEmail)
    signUpPage.fillRegistrationDetails(testPassword)
    // 3. Select Men -> Jeans
    menCatPage.selectJeans()

    // 4. View & Update Product (quantity=2)
    productPage.viewAnyProductThenAddToCart()
    // 5. Proceed to Checkout & place order
    cartPage.proceedToCheckout()
    cartPage.placeOrder()

    // 6. Contact Us form
    contactUsPage.fillContactForm()

  })

  // API Tests
  it('API Test - Validate Brand List', () => {
    // cy.request('GET', 'https://automationexercise.com/api/brandsList')
    cy.request('GET', `${baseUrl}/api/brandsList`)
      .then((response) => {
        expect(response.status).to.eq(200)
        const body = JSON.stringify(response.body)
        const responseBody = JSON.parse(response.body);
        // Check presence
        expect(body).to.include('Polo')
        expect(body).to.include('Babyhug')
        expect(body).to.include('Biba')
        // Check absence
        expect(body).not.to.include('Heineken')
        expect(body).not.to.include('BMW')
        expect(body).not.to.include('Razor')
        // Validate response structure
        expect(responseBody).to.have.property('responseCode', 200)
        expect(responseBody).to.have.property('brands').that.is.an('array')
        responseBody.brands.forEach((brand) => {
          expect(brand).to.have.property('id').that.is.a('number')
          expect(brand).to.have.property('brand').that.is.a('string')
        })
      })
  })

  it('API Test - Verify User Login', () => {
    cy.request({
      method: 'POST',
      // url: 'https://automationexercise.com/api/verifyLogin',
      url: `${baseUrl}/api/verifyLogin`,
      form: true,
      body: { email: testEmail, password: testPassword },
    }).then((response) => {
      expect(response.status).to.eq(200)
      const responseBody = JSON.parse(response.body);
      expect(responseBody.message).to.eq('User exists!')
      // Check structure
      expect(responseBody).to.have.property('message')
      expect(responseBody.message).to.be.a('string')
    })
  })
})
