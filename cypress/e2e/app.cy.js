import axios from 'axios'
const { expect } = require('chai')

describe('Portfolio page', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('successfully loads', () => {
		cy.visit('/')
	})

	it('contains navigation buttons', () => {
		cy.get('.menu').contains('about me')
		cy.get('.menu').contains('projects')
		cy.get('.menu').contains('certificates')
	})

	it('navigates to subpages correctly', () => {
		cy.contains('about me').click()
		cy.url().should('include', '/index.html')
        cy.visit('/')
        cy.wait(1000)
		cy.contains('projects').click()
		cy.url().should('include', '/projects.html')
        cy.visit('/')
        cy.wait(1000)
		cy.contains('certificates').click()
		cy.url().should('include', '/certificates.html')
        cy.visit('/')
        cy.wait(1000)
	})

	it('displays author information correctly', () => {
		cy.get('[data-id="myName"]').should('contain', 'Agata Białoskórska')
		cy.get('[data-id="pHi"]').should('contain', 'Hi there!')
		cy.get('.myImg').should('have.attr', 'alt', 'My Photo')
	})

	it('links to correct contact pages', () => {
		cy.get('.contact .mail').should(
			'have.attr',
			'href',
			'mailto:abialoskorska@icloud.com'
		)
		cy.get('.contact .linkedin').should(
			'have.attr',
			'href',
			'https://www.linkedin.com/in/agata-bia%C5%82osk%C3%B3rska-b77b73134'
		)
		cy.get('.contact .github').should(
			'have.attr',
			'href',
			'https://github.com/AgataBialoskorska'
		)
	})

	it('accepts cookie policy', () => {
        cy.get('.cookie-alert').should('be.visible')
        cy.getCookie('cookie-accepted').should('not.exist');
		cy.get('.cookie-accept-button').click()
		cy.get('.cookie-alert').should('not.be.visible')
	})
})

describe('Projects page', () => {
	beforeEach(() => {
		cy.visit('/projects.html')
	})

	it('allows the user to navigate', () => {
		cy.contains('about me').click()
		cy.url().should('include', '/index.html')
        cy.visit('/projects.html')
        cy.wait(1000)
		cy.contains('certificates').click()
		cy.url().should('include', '/certificates.html')
        cy.visit('/projects.html')
        cy.wait(1000)
	})

	it('displays "Hello World" project', () => {
		cy.contains('.hello.apis .header', 'Here is "Hello World"')
		cy.get('.hello.apis .gameBtn').should(
			'have.attr',
			'href',
			'https://github.com/AgataBialoskorska/hello-world'
		)
	})

	it('displays "Weather API" project', () => {
		cy.contains(
			'.weatherApi.apis .header',
			'Here is a random city and its weather'
		)
		cy.get('.weatherApi.apis .dataWeatherBox').should('be.visible')
	})

	it('displays "Hangman" project', () => {
		cy.contains('.hangman.apis .header', 'Here is a game Hangman')
		cy.get('.hangman.apis .gameBtn').should(
			'have.attr',
			'href',
			'./projects/hangman.html'
		)
	})

	it('displays "Disney API" project', () => {
		cy.contains(
			'.disneyApi.apis .header',
			'Here is a random character from Disney movie.'
		)
		cy.get('.disneyApi.apis .disneyDes').should('be.visible')
	})
})

describe('API endpoint test Disney', () => {
	it('should return a 200 status code for DisneyAPI', async () => {
		const response = await axios.get('https://api.disneyapi.dev/character')
		expect(response.status).to.equal(200)
	})
})

describe('Certificates Page', () => {
	beforeEach(() => {
		cy.visit('/certificates.html')
	})

	it('displays the certificates page correctly', () => {
		cy.get('h1').should('contain', 'my certificates')
		cy.get('.certs').should('have.length', 4)
	})

	it('allows the user to navigate', () => {
		cy.contains('about me').click()
		cy.url().should('include', '/index.html')
        cy.visit('/certificates.html')
        cy.wait(1000)
		cy.contains('projects').click()
		cy.url().should('include', '/projects.html')
        cy.visit('/certificates.html')
        cy.wait(1000)
	})
})

describe('Hangman game', () => {
	beforeEach(() => {
		cy.visit('/projects/hangman.html')
	})

	it('successfully loads', () => {
		cy.visit('/projects/hangman.html')
	})

	it('allows the user to navigate', () => {
		cy.contains('about me').click()
		cy.url().should('include', '/index.html')
	    cy.visit('/projects/hangman.html')
	    cy.wait(2000)
		cy.contains('projects').click()
	    cy.url().should('include', '/projects.html')
	    cy.visit('/projects/hangman.html')
	    cy.wait(2000)
	    cy.contains('certificates').click()
	    cy.url().should('include', '/certificates.html')
	    cy.visit('/projects/hangman.html')
	    cy.wait(2000)
	})

	it('loads the page correctly', () => {
		cy.title().should('contain', 'Game')
		cy.get('img').should('be.visible')
		cy.get('h1').should('contain', 'HANGMAN')
	})

	it('displays the hangman game', () => {
		cy.get('.hangman img').should('have.attr', 'src').and('contain', 's0.jpg')
		cy.get('.password').should('not.have.text')
	    cy.get('.alphabet').should('not.have.class', 'hide')
	    cy.get('.result').should('have.class', 'hide')
	    cy.get('.reset').should('have.class', 'hide')
	})

	it('allows the user to guess a letter', () => {
		const numLetters = Cypress.$('p.letter').length
		const randomIndex = Math.floor(Math.random() * numLetters)
		cy.get('p.letter')
			.eq(randomIndex)
			.trigger('click')
			.should('have.attr', 'clicked', 'true')
	})

	it('the guessed letter appears in the password', () => {
	    let letter
	    let initialPassword

	    cy.get('.password')
	      .then($password => {
	        initialPassword = $password.text()
	      })

	    cy.get('p.letter')
	      .should('have.length.gt', 0)
	      .each($letter => {
	        if (!$letter.hasClass('guessed')) {
	          letter = $letter.text()

	          $letter.click()
	          cy.get('.password').should($password => {
	            const passwordChars = $password.text().split('')
	            const initialPasswordChars = initialPassword.split('')
	            for (let i = 0; i < passwordChars.length; i++) {
	              if (passwordChars[i] === letter) {
	                expect(initialPasswordChars[i]).to.equal('-')
	              } else {
	                expect(initialPasswordChars[i]).to.equal(passwordChars[i])
	              }
	            }
	          })
	          return false
	        }
	      })
	  })

	it('the notguessed letter changes the picture', () => {
		let imgSrc = ''
		cy.get('.hangman img')
			.invoke('attr', 'src')
			.then(src => {
				imgSrc = src
			})

		cy.get('.letter').each($letter => {
			if ($letter.hasClass('notguessed')) {
				$letter.click()

				cy.get('.hangman img').should($img => {
					const currentSrc = $img.attr('src')
					expect(currentSrc).not.to.equal(imgSrc)
					imgSrc = currentSrc
				})
			}
		})
	})

    // it('change displays after successful attempts', () => {
    //         let trying = 0;
    //         cy.get('.letter').each(($letter) => {
    //           $letter.click();
    //           if ($letter.hasClass('guessed')) {
    //             trying++;
    //           }
    //           if (trying === 26) {
    //             cy.get('.alphabet').should('have.class', 'hide');
    //             cy.get('.result').should('not.have.class', 'hide');
    //             cy.get('.reset').should('not.have.class', 'hide');
    //             return false;
    //           }
    //         });
    //       });

    it('change displays after 9 unsuccessful attempts', () => {
        let trying = 0;
        cy.get('.letter').each(($letter) => {
          $letter.click();
          if ($letter.hasClass('notguessed')) {
            trying++;
          }
          if (trying === 9) {
            cy.get('.alphabet').should('have.class', 'hide');
            cy.get('.result').should('not.have.class', 'hide');
            cy.get('.reset').should('not.have.class', 'hide');
            return false;
          }
        });
      });
})
