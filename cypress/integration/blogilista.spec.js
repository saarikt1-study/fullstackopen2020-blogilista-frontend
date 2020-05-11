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
        cy.createBlog({ 
          title: 'Another Cypress Title', 
          author: 'Another Cypress author',
          url: 'Another Cypress url',
          likes: 5
         })
      })

      it('A blog can be liked', function() {
        cy.contains('View details').click()
        cy.contains('Like').click()
        cy.contains('Likes: 6')
      })

      it('A blog can be deleted by the user who added it', function() {
        cy.contains('View details').click()
        cy.contains('Delete blog').click()
        cy.get('#blog').should('not.exist')
      })
    })

    describe.only('Multiple blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ 
          title: 'Worst Cypress Title', 
          author: 'Another Cypress author',
          url: 'Another Cypress url',
          likes: 5
         })
         cy.createBlog({ 
           title: 'Best Cypress Title', 
           author: 'Another Cypress author',
           url: 'Another Cypress url',
           likes: 15
          })
        cy.createBlog({ 
          title: 'Still another Cypress Title', 
          author: 'Another Cypress author',
          url: 'Another Cypress url',
          likes: 10
         })
      })

      it('Blogs are ordered by likes, descending', function() {
        cy.get('[id="blog"]').then((blogs) => {
          cy.wrap(blogs[0]).contains('Likes: 15')
          cy.wrap(blogs[1]).contains('Likes: 10')
          cy.wrap(blogs[2]).contains('Likes: 5')
        })
      })
    })
  })
})