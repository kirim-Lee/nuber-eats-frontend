describe('Edit profile', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.login('real@mail.com', 'real@mail.com');
  });

  it('can go to / edit profile using the header', () => {
    cy.get('a[href="/edit-profile"]').click();
  });

  it('can change email', () => {
    cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
      if (req.body?.operationName === 'editProfileMutation') {
        req.reply((res) => {
          res.send({ fixture: 'user/edit-profile.json' });
        });
      }
    });
    cy.visit('/edit-profile').get('[name=email]').clear().type('new@mail.com');
    cy.findByText('Save profile').click();
    cy.get('a[href="/edit-profile"]').should('contain.text', 'new@mail.com');
  });
});
