/// <reference types="cypress" />
import tm from '../../fixtures/test-data.json';

const active_url = Cypress.env('ACTIVE_URL');  // read README.md for correct initialization

Cypress.on('uncaught:exception', (err, runnable) => {
  console.log(err)
  return false
})

context('Music Player Validation', () => {
  let spyWinConsoleLog;

  before(() => {
    cy.visit(active_url)
  });

  beforeEach(() => {
    cy.window().then((win) => {
      spyWinConsoleLog = cy.spy(win.console, 'log')
    })
  })

  afterEach(() => {
    expect(spyWinConsoleLog).to.not.be.called;
  })

  it('Can verify page gets loaded', () => {
    cy.request({
      url: active_url,
      followRedirect: false, // turn off following redirects
    }).then((resp) => {
      // redirect status code is 200
      expect(resp.status).to.eq(302)
    })
      .as('DOM content loaded successfully')
  })
  it('Can verify playlist tab exist', () => {
    cy.get('.tab-btn.active')
      .contains(`${tm.playlist}`)
  })
  it('Can verify recently played songs tab exist', () => {
    cy.get('.tab-btn')
      .eq(1)
      .contains(`${tm.recentlyPlayed}`)
  })
  it('Can verify playlist tab consists of N no of songs', () => {
    cy.get('#playlist')
      .then(item => {
        const songs = item[0].children.length;

        cy.log(`Playlist tab consists of ${songs} songs`)
        if (songs >= `${tm.capacity}`) {
          cy.log('List of Songs have been displayed in playlist tab')
        }
      })
  })
  it('Can play song and verify song gets played and updated in recently played songs', () => {
    cy.get('#playlist li')
      .first()
      .then(item => {
        const src = item[0].getAttribute('data-src');
        const value = item[0].innerText;

        cy.get(item[0])
          .click()

        cy.request({
          url: src,
          followRedirect: false,
        }).then((resp) => {
          expect(resp.status).to.eq(200)
        })
          .as('Song got played successfully')

        cy.get('.tab-btn')
          .eq(1)
          .click()

        cy.get('#recentlyPlayed li')
          .first()
          .then(item => {
            const recents = item[0].innerText;

            expect(`${value}`).to.eq(`${recents}`)
          })
      })
  })
})
