import { SELECTORS } from '../support/selectors'
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

  let testEmail
  const testPassword = Cypress.env('TEST_PASSWORD')
  const baseUrl = Cypress.env('BASE_URL')

  before(() => {
    cy.fixture('user').then((user) => {
      testEmail = `test_${Date.now()}@test.com`
      cy.wrap(user).as('user')
    })
  })

  it('UI Testing - End to End Flow', function () {
    loginPage.visit(baseUrl)
    loginPage.fillSignupForm(testEmail)
    signUpPage.fillRegistrationDetails(testPassword)
    menCatPage.selectJeans()
    productPage.viewAnyProductThenAddToCart()
    cartPage.proceedToCheckout()
    cartPage.placeOrder()
    contactUsPage.fillContactForm()
  })

  it('API Test - Validate Brand List', () => {
    cy.request('GET', `${baseUrl}/api/brandsList`).then((response) => {
      expect(response.status).to.eq(200)
      const body = JSON.stringify(response.body)
      const responseBody = JSON.parse(response.body)
      expect(body).to.include('Polo')
      expect(body).to.include('Babyhug')
      expect(body).to.include('Biba')
      expect(body).not.to.include('Heineken')
      expect(body).not.to.include('BMW')
      expect(body).not.to.include('Razor')
      expect(responseBody).to.have.property('responseCode', 200)
      expect(responseBody).to.have.property('brands').that.is.an('array')
      responseBody.brands.forEach((brand) => {
        expect(brand).to.have.property('id').that.is.a('number')
        expect(brand).to.have.property('brand').that.is.a('string')
      })
    })
  })

  it('API Test - Verify User Login', function () {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/verifyLogin`,
      form: true,
      body: { email: testEmail, password: testPassword },
    }).then((response) => {
      expect(response.status).to.eq(200)
      const responseBody = JSON.parse(response.body)
      expect(responseBody.message).to.eq('User exists!')
      expect(responseBody).to.have.property('message')
      expect(responseBody.message).to.be.a('string')
    })
  })
})