describe('HomeLayout E2E', () => {
  beforeEach(() => {
    cy.intercept('GET', '/v1/public/characters?ts=*&apikey=*', {
      statusCode: 200,
      body: {
        data: {
          results: [
            {
              id: 1,
              name: "Spider-Man",
              thumbnail: { path: "/assets/images/spiderman", extension: "jpg" }
            },
            {
              id: 2,
              name: "Iron Man",
              thumbnail: { path: "/assets/images/ironman", extension: "jpg" }
            }
          ]
        }
      }
    }).as('getCharacters');

    cy.intercept('GET', '/api/favorites', {
      statusCode: 200,
      body: [1],
    }).as('getFavorites');

    cy.visit('http://localhost:3000/');
  });

  it('renders loader while loading', () => {
    cy.intercept('GET', '/v1/public/characters?ts=*&apikey=*', {
      delay: 1000,
      body: [],
    }).as('loadingCharacters');

    cy.visit('http://localhost:3000/');
    cy.get('[role="status"]').should('exist');
  });

  it('show characters', () => {
    cy.get('li').contains("Spider-Man").should('exist');
    cy.get('li').contains("Iron Man").should('exist');
  });

  it('filters characters based on search term', () => {
    cy.get('input[type="text"]').type('Spider');

    cy.get('li').contains("Spider-Man").should('exist');
    cy.get('li').contains("Iron Man").should('not.exist');
  });
});