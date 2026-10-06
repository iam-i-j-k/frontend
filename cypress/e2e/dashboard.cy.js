describe('Dashboard App E2E', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the dashboard and display the feed', () => {
    cy.contains('Welcome back!').should('be.visible')
    cy.contains('Your Feed').should('be.visible')
  })

  it('should navigate to the settings page and toggle preferences', () => {
    cy.contains('Settings').click()
    cy.url().should('include', '/settings')
    cy.contains('Preferences').should('be.visible')
    
    // Toggle a category
    cy.contains('Technology').click()
  })

  it('should search for content', () => {
    // Wait for the feed to load
    cy.contains('Your Feed', { timeout: 10000 })
    
    // Type in search bar
    cy.get('input[placeholder*="Search"]').type('Inception')
    
    // Content should filter
    cy.contains('Inception').should('be.visible')
  })
})
