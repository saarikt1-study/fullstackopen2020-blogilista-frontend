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
    it('fails with wrong password', function() {
      cy.get('#username').type('Tsaarika')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
  
      cy.contains('Wrong credentials')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Tsaarika')
      cy.get('#password').type('tosiSALAinen')
      cy.get('#login-button').click()
  
      cy.contains('Tommi logged in')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function () {
      cy.login({ username: 'Tsaarika', password: 'tosiSALAinen'})
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('Cypress title')
      cy.get('#author').type('Cypress author')
      cy.get('#url').type('Cypress url')
      cy.contains('create').click()
      cy.contains('Cypress title by Cypress author')
    })

    describe('And a blog exists', function() {
      beforeEach(function() {
        cy.request({
          url: 'http://localhost:3001/api/blogs',
          method: 'POST',
          body: {
            title: 'Another Cypress title',
            author: 'Another Cypress author',
            url: 'Another Cypress url'
          },
          headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
          }
        })
        cy.visit('http://localhost:3000')
      })

      it('A blog can be liked', function() {
        cy.contains('View details').click()
        cy.contains('Like').click()
        cy.contains('Likes: 1')
      })

      it('A blog can be deleted by the user who added it', function() {
        cy.contains('View details').click()
        cy.contains('Delete blog').click()
        cy.get('#blog').should('not.exist')
      })
    })
  })
})