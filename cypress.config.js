// filepath: /c:/Users/Nuruddin Kawsar/Desktop/TEKARSH_ASSIGNMENT/cypress.config.js
const { defineConfig } = require("cypress");
const dotenv = require('dotenv');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Load environment variables from .env file
      const env = dotenv.config().parsed;

      // Assign environment variables to Cypress config
      config.env = { ...config.env, ...env };

      return config;
    },
  },
});