describe('Guest testing', () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl!);
  });

  it('Search. Unit information', () => {

    // Ввести в поисковую строку слово 'азбука'
    cy.get('[data-testid="search-input"]').type('азбука');

    // В выпадающем меню перейти по первой ссылке и проверить
    // что мы по адресу '/book/:bookId'
    cy.get('[data-testid="suggestions"]').should('be.visible');
    cy.get('[data-testid="suggestions"] a')
      .first()
      .then(($cardLink) => {
        const cardId = $cardLink.attr('data-testid');
        cy.wrap($cardLink).click();
        cy.url().should('include', `/book/${cardId}`);
      });
    
    // Проверить что есть карточка
    cy.wait(1500).get('[data-testid="book-card"]').should('be.visible');
  });
});
