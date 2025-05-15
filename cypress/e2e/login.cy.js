/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

const toastQuery = 'section[aria-label="Notifications alt+T"] ol li div[data-title=""]';

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[data-cy="login-input-email"]').should('be.visible');
    cy.get('input[data-cy="login-input-password"]').should('be.visible');
    cy.get('button')
      .contains(/^LOGIN$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button')
      .contains(/^LOGIN$/)
      .click();

    cy.get(toastQuery)
      .contains(/"email" is not allowed to be empty/i)
      .should('be.visible');
  });

  it('should display alert when password is empty', () => {
    cy.get('input[data-cy="login-input-email"]').type('test@test.com');

    cy.get('button')
      .contains(/^LOGIN$/)
      .click();

    cy.get(toastQuery)
      .contains(/"password" is not allowed to be empty/i)
      .should('be.visible');
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[data-cy="login-input-email"]').type('test@test.com');
    cy.get('input[data-cy="login-input-password"]').type('wrong_password');

    cy.get('button')
      .contains(/^LOGIN$/)
      .click();

    cy.get(toastQuery)
      .contains(/email or password is wrong/i)
      .should('be.visible');
  });

  it('should display homepage when username and password are correct', () => {
    cy.get('input[data-cy="login-input-email"]').type('test1307@test.com');
    cy.get('input[data-cy="login-input-password"]').type('test1307');

    cy.get('button')
      .contains(/^LOGIN$/)
      .click();

    cy.get('div[data-cy="user-button"]').should('be.visible');
  });
});
