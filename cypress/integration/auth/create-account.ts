describe('create account', () => {
  it('should see validation error', () => {
    cy.visit('/');
    cy.findByText('Create an Account').click();
    cy.title().should('to.be', 'Create account | Nuber Eats');
    cy.get('[name=email]')
      .type('ttt@non')
      .get('[role=alert]')
      .should('have.text', 'email pattern is not matched')
      .get('[name=email]')
      .clear()
      .get('[role=alert]')
      .should('have.text', 'email is required')
      .get('[name=email]')
      .type('ttt@ttt.com');

    cy.get('[name=password]')
      .type('t')
      .clear()
      .get('[role=alert]')
      .should('have.text', 'password is required')
      .get('[name=password]')
      .type('12345');

    cy.get('[role=alert]')
      .should('not.exist')
      .get('button')
      .should('not.have.attr', 'disabled');
  });

  it('should be able to creat account and login', () => {
    cy.intercept('http://localhost:4000/graphql', (req) => {
      if (req.body?.operationName === 'createAccountMutation') {
        req.reply((res) => {
          res.send({ fixture: 'auth/create-account.json' });
        });
      }
    });

    cy.visit('/create-account')
      .get('[name=email]')
      .type('real@mail.com')
      .get('[name=password]')
      .type('real@mail.com')
      .get('button')
      .click();

    cy.wait(1000).title().should('eq', 'Welcome to Nuber Eats!');

    // @ts-ignore
    cy.login('real@mail.com', 'real@mail.com');

    // cy.window().its('localStorage.token').should('be.a', 'string');
  });
});
