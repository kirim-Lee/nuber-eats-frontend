describe('first test', () => {
  it('should go to hompage', () => {
    cy.visit('/').title().should('eq', 'Welcome to Nuber Eats!');
  });

  it('can see eamil / password validation error', () => {
    cy.visit('/').get('[name=email]').type('tt').clear();
    cy.findByRole('alert').should('have.text', 'Email is required');
    cy.get('[name=email]').type('tt').get('[name=password]').type('tt').clear();
    cy.findByRole('alert').should('have.text', 'Password is required');
  });

  it('can fill out the form', () => {
    cy.visit('/')
      .get('[name=email]')
      .type('ttt@ttt.com')
      .get('button')
      .should('have.attr', 'disabled')
      .get('[name=password]')
      .type('12345')
      .get('button')
      .should('not.have.attr', 'disabled')
      .get('button')
      .click();

    cy.window().its('localStorage.token').should('be.a', 'string');
  });
});
