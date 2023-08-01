/// <reference types="cypress" />
import tm from '../../fixtures/test-data.json';

const active_url = Cypress.env('ACTIVE_URL');  // read README.md for correct initialization

Cypress.on('uncaught:exception', (err, runnable) => {
  console.error('Uncaught Exception:', err.message);

  console.error(err.stack);
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
      // redirect status code is 302
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
  it('Can Verify pause button', () => {
    cy.get('.pauseBtn')
      .should('exist')

    cy.get('#playlist li')
      .first()
      .click()

    cy.get('#playlist li')
      .first()
      .then((element) => {
      // Wait for 2 seconds before proceeding to the next command
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(element);
          }, 2000);
        });
      })
      .then(() => {
      // Perform some actions on the element after the delay
        cy.get('.pauseBtn')
          .click()
      });
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
  it('Can play song(s1,s2,s3,s4) and verify it matches with recently played songs(s4,s3,s2)', () => {
    cy.reload();
    // Can play song 1,song 2,song 3 and song 4 from playlist tab
    // Can verify whether the songs gets updated as song 4,song 3,song 2 in recently playes songs tab
    const songList = tm.songList;
    cy.get('#playlist li').each((songItem) => {
      cy.wrap(songItem).click();
      cy.get('#playlist li')
        .first()
        .then((element) => {
          // Wait for 2 seconds before proceeding to the next command
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(element);
            }, 5000);
          });
        })
        .then(() => {
          // Perform some actions on the element after the delay
          cy.get('.pauseBtn')
            .click()
        });
    });

    cy.get('.tab-btn')
      .eq(1)
      .click()

    cy.get('#recentlyPlayed li').should('have.length.at.least', 3)

    cy.get('#recentlyPlayed li')
      .each((songItem, index) => {
        const songText = songItem.text().trim();
        cy.wrap(songText).should('equal', songList[index]);
      });
  })
})
