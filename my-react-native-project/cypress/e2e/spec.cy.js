describe('First web test on the app', () => {
  beforeEach(()=> {
    cy.visit('http://localhost:19006')
  })
  it.skip('works', () => {
    // cy.visit('http://localhost:19006')
    cy.contains('Open up App.js to start working on your app!')
      .should('be.visible')
  })

  it('loads a list of users', () => {
    cy.intercept('/users').as('users')
    cy.visit('http://localhost:19006')
    cy.wait('@users').its('response.body')
    .should('be.an', 'Array')
    .and('have.length.gt', 5)
    .then(users => {
      cy.get('[data-testid=user]')
        .should('have.length', users.length)
    })
  })

  it('shows loading indicator', () => {
    // slow down the response by 1 second
    // https://on.cypress.io/intercept
    cy.intercept('/users', (req) => {
      // use bundled Bluebird library
      // which has utility method .delay
      // https://on.cypress.io/promise
      return Cypress.Promise.delay(1000).then(() => req.continue())
    }).as('users')
    cy.visit('http://localhost:19006')
    cy.get('[data-testid=loading]').should('be.visible')
    cy.get('[data-testid=loading]').should('not.exist')
    cy.wait('@users')
  })
})