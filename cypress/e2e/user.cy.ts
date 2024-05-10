const testUser = {
  email: 'example@mail.com',
  password: 'qwerty123456',
};

describe('User testing', () => {
  // Если пользователь авторизован, нажать кнопку "Log out"
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl!);
    cy.wait(1500)
      .get('body')
      .then(($body) => {
        if ($body.find('#log-out').length > 0) {
          cy.get('#log-out').click();
        } else {
          cy.log('The user is not logged in');
        }
      });
  });

  it('User. Search. Unit information. Favorites', () => {
    // Перейти на страницу '/signin' и авторизоваться
    cy.visit('/signin');
    cy.get('[type="email"]').type(testUser.email);
    cy.get('[type="password"]').type(testUser.password);
    cy.get('form[name="login"]').submit();
    cy.url().should('not.include', '/signin');

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

    // Проверить что есть карточка и кнопка лайка, нажать на нее
    cy.get('[data-testid="book-card"]').should('be.visible');
    cy.get('[data-testid="book-card"] [data-testid="like-btn"]')
      .should('exist')
      .click();
    // Проверить, что лайк проставлен
    cy.get('[data-testid="book-card"] [data-testid="like-btn"]').should(
      'have.attr',
      'data-testLiked',
      'true',
    );

    // Перейти на страницу избранного, проверить что есть карточка
    cy.visit('/favorites');
    cy.wait(1500).get('[data-testid="page-card"]').should('exist');
    cy.get('[data-testid="page-card"] [data-testid="like-btn"]').as('likeBtn');

    // Нажать на кнопку лайка и карточка должна исчезнуть
    cy.get('@likeBtn').should('have.attr', 'data-testLiked', 'true').click();
    cy.get('[data-testid="page-card"]').should('not.exist');
  });
});
