/// <reference types="cypress" />
/// <reference types="cypress-testing-library" />

describe('home page renders', () => {
  it('should render the page', () => {
    cy.visit('/')
      .getByText(/groups/i)
      .click()
    cy.getAllByText('meetup').should('have.length', 4)
  })

  it('should have one hackathon page', () => {
    cy.visit('/groups/')
    cy.getAllByText('hackathon').should('have.length', 1)
  })

  it('should have 3 items in the nav', () => {
    cy.visit('/')
    cy.get('nav')
      .get('ul')
      .find('li')
      .should('have.length', 4)
  })

  it('should have new events that are less than 6 weeks from now', () => {
    let sixWeeks = Cypress.moment().add(6, 'weeks')

    cy.visit('/')
    cy.get('time').each(function(val) {
      let date = val.text()
      let eventTime = Cypress.moment(date, 'dddd, MMMM Do, YYYY')
      assert.isAtLeast(sixWeeks.diff(eventTime), 0)
    })
  })
})
