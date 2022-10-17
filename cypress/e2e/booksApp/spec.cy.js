describe('check BooksApp', () => {
  const mailTest_1 = 'bropet@mail.ru';
  const passTest_1 = '123';
  const mailTest_2 = 'test@test.com';
  const passTest_2 = 'test';

  // При отправлении заполненной формы авторизации, происходит обновление страницы. Данные пользователя сохраняются в 
  // localStorage. В Cypress при обновлении страницы localStorage стирается автоматически. Нагуглила такой обходной вариант.
  Cypress.LocalStorage.clear = ()=>{};

  before(() => {
    cy.visit('http://localhost:3000/');
    cy.window().then((window) => {
        window.localStorage.clear();
    })
    
    cy.get('a[href="/"]').as('BooksList');
    cy.loginBooksApp(mailTest_1, passTest_1); 
    cy.get('a[href="/favorites"]').as('favorites');
    cy.addBook('MyBook1', 'About Cypress');
    cy.addBook('MyBook2', 'About Netology');
    cy.addBook('MyBook3', 'About JS');
    cy.logOut();    
  })

  it('page should be displayed', () => {
    cy.visit('http://localhost:3000/');
    cy.url().should('include', 'http://localhost:3000/');
    cy.window().contains('Books list');
    cy.contains('button', 'Log in');
  })

  it('books should be added to favorites', () => {
    cy.loginBooksApp(mailTest_1, passTest_1);
    cy.get('a[href="/favorites"]').as('favorites');

    cy.get('@favorites').click();
    cy.contains('a', 'Please add some book to favorit on home page!').click({force:true});
    cy.contains('button', 'Add to favorite').click();
    cy.contains('button', 'Add to favorite').click();
    cy.get('.card-footer button').filter(':contains("Delete from favorite")').should('have.length', 2);
    cy.get('.card-footer button').filter(':contains("Add to favorite")').should('have.length', 1);
    
    cy.get('@favorites').click();
    cy.get('.card-footer button').filter(':contains("Delete from favorite")').should('have.length', 2);
    cy.get('.card-footer button').filter(':contains("Add to favorite")').should('not.exist');
    cy.get('a[href="/"]').click();
    cy.logOut();
  })

  it('books in favorites should be clickable', () => {
    cy.loginBooksApp(mailTest_1, passTest_1);

    cy.get('a[href="/favorites"]').click();
    cy.contains('MyBook1').click();
    cy.window().contains('MyBook1').find('+ p').contains('About Cypress');
    cy.contains('button', 'Dowload book');
    cy.get('a[href="/"]').click();
    cy.logOut();
  })

  it('books should be removed from favorites', () => {
    cy.loginBooksApp(mailTest_1, passTest_1);

    cy.get('a[href="/favorites"]').click();
    cy.contains('button', 'Delete from favorite').click();
    cy.get('.card-footer button').filter(':contains("Delete from favorite")').should('have.length', 1);
    cy.contains('button', 'Delete from favorite').click();
    cy.contains('Delete from favorite').should('have.not.exist') ;
    cy.contains('a', 'Please add some book to favorit on home page!').click();
    cy.get('.card-footer button').filter(':contains("Add to favorite")').should('have.length', 3);
    cy.logOut();
  })

})