describe('First web test on the app', () => {
    beforeEach(()=> {
      cy.visit('http://localhost:19006')
    })
    it('works', () => {
      // cy.visit('http://localhost:19006')
      cy.contains('To share a photo from your phone with a friend, just press the button below!')
        .should('be.visible')
    })

    it('should contain the test image', ()=> {
        cy.get("[data-testID=image]").should('be.visible')
    })

    it('should have a button that contains the text pick a photo', ()=> {
        cy.get("[data-testId=button]").should('have.text', "Pick a photo");
    })

    it('Should allow users to click the pick a photo button', () => {
        cy.get("[data-testId=button]").click();
        // cannot see web alert messages
        // cy.contains('Hello world');
    })
  
})
