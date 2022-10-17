Cypress.Commands.add('logOut', () => {
    cy.contains('button','Log out').click();
})

Cypress.Commands.add('loginBooksApp', (log, pass) => {
    cy.visit('http://localhost:3000/');
    // cy.logOut();
    cy.contains('Log in').click();
    cy.get('#mail').type(log, {delay:0});
    cy.get('#pass').type(pass, {delay:0});
    cy.contains('Submit').click();
})

Cypress.Commands.add('addBook', (title, descr) => {
   cy.contains('button','Add new').click();
   cy.get('#title').type(title, {delay:0});
   cy.get('#description').type(descr, {delay:0});
   cy.contains('Submit').click();
})


   




// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })