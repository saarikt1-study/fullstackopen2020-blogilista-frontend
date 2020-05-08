describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Tommi',
      username: 'Tsaarika',
      password: 'tosiSALAinen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.get('button').contains('login')
  })

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Tsaarika')
      cy.get('#password').type('tosiSALAinen')
      cy.get('#login-button').click()
  
      cy.contains('Tommi logged in')
    })

    it('fails with wrong password', function() {
      cy.get('#username').type('Tsaarika')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
  
      cy.contains('Wrong credentials')
    })
  })
})