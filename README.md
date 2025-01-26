# Tekarsh Assignment

This project contains end-to-end tests for the Automation Exercise website using Cypress.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd tekarsh_assignment
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```properties
   TEST_PASSWORD=TestPassword123
   TEST_URL=https://automationexercise.com
   ```

## Running Tests

### Running All Tests

To run all the tests, use the following command:

```sh
npx cypress run
```

### Running Tests in Interactive Mode

To open Cypress in interactive mode, use the following command:

```sh
npx cypress open
```

This will open the Cypress Test Runner, where you can run individual test files.

### Running Specific Test File

To run a specific test file, use the following command:

```sh
npx cypress run --spec "cypress/e2e/UI_API_Testing.cy.js"
```

## Project Structure

- **fixtures**: Contains test data files.
- **e2e**: Contains end-to-end test files.
- **pageObjects**: Contains page object model classes.
- **support**: Contains support files and custom commands.
- **cypress.config.js**: Cypress configuration file.

## Writing Tests

Tests are written in JavaScript using the Cypress framework. The test files are located in the `e2e` directory.

### Example Test

Here is an example of a test file located at `cypress/e2e/UI_API_Testing.cy.js`:

### Importing Page Objects

```javascript
import LoginPage from '../pageObjects/LoginPage'
import SignUpPage from '../pageObjects/SignUpPage'
import MenCategoryPage from '../pageObjects/MenCategoryPage'
import ProductPage from '../pageObjects/ProductPage'
import CartPage from '../pageObjects/CartPage'
import ContactUsPage from '../pageObjects/ContactUsPage'
```

### Using the Page Object Model

The Page Object Model (POM) is a design pattern that helps create object-oriented classes for different pages of the application. This makes the tests more readable, maintainable, and reusable.

### Proper Assertions

Assertions are used to validate the expected outcomes of the tests. Here are some examples of assertions used in the test suite:

- **UI Testing - End to End Flow**: Verifies the successful completion of each step in the user journey.
- **API Test - Validate Brand List**: Checks the response status and ensures the presence or absence of specific brands in the response body.
- **API Test - Verify User Login**: Confirms the successful login of a user by checking the response status and message.

#### Describing Test Suite

```javascript
describe('UI and API Tests', () => {
  const loginPage = new LoginPage()
  const signUpPage = new SignUpPage()
  const menCatPage = new MenCategoryPage()
  const productPage = new ProductPage()
  const cartPage = new CartPage()
  const contactUsPage = new ContactUsPage()

  const testEmail = `test_${Date.now()}@test.com`
  const testPassword = Cypress.env('TEST_PASSWORD')
  const testUrl = Cypress.env('TEST_URL')
```

#### UI Testing - End to End Flow

```javascript
  it('UI Testing - End to End Flow', () => {
    loginPage.visit(testUrl)
    loginPage.fillSignupForm(testEmail)
    signUpPage.fillRegistrationDetails(testPassword)
    menCatPage.selectJeans()
    productPage.viewAnyProductThenAddToCart()
    cartPage.proceedToCheckout()
    cartPage.placeOrder()
    contactUsPage.fillContactForm()
  })
```

#### API Test - Validate Brand List

```javascript
  it('API Test - Validate Brand List', () => {
    cy.request('GET', `${testUrl}/api/brandsList`)
      .then((response) => {
        expect(response.status).to.eq(200)
        const body = JSON.stringify(response.body)
        expect(body).to.include('Polo')
        expect(body).to.include('Babyhug')
        expect(body).to.include('Biba')
        expect(body).not.to.include('Heineken')
        expect(body).not.to.include('BMW')
        expect(body).not.to.include('Razor')
      })
  })
```

#### API Test - Verify User Login

```javascript
  it('API Test - Verify User Login', () => {
    cy.request({
      method: 'POST',
      url: `${testUrl}/api/verifyLogin`,
      form: true,
      body: { email: testEmail, password: testPassword },
    }).then((response) => {
      expect(response.status).to.eq(200)
      const responseBody = JSON.parse(response.body)
      expect(responseBody.message).to.eq('User exists!')
    })
  })
})
```