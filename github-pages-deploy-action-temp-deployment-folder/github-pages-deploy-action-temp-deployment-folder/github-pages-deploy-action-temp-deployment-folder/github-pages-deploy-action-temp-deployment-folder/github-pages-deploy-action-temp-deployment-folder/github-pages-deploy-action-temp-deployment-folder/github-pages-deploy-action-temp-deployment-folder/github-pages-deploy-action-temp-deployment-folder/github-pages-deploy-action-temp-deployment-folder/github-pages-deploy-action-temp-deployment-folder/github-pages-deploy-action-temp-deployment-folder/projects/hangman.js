const hangman = document.querySelector('.hangman')
const hangmanImg = document.querySelector('.hangman img')
const hangmanPass = document.querySelector('.password')
const hangmanAlph = document.querySelector('.alphabet')
const result = document.querySelector('.result')
const resetBtn = document.querySelector('.reset')

let passArr = [
	'Practice makes perfect',
	'East or west home is best',
	'A friend in need is a friend indeed',
	'Where there is a will there is a way',
	'Time heals all wounds'
]
const pass = passArr[Math.floor(Math.random() * passArr.length)].toUpperCase()
let passLength = pass.length
let trying = 0
let yesSound = new Audio('./hangman/yes.wav')
let noSound = new Audio('./hangman/no.wav')
let passSecret = ''
let letter

for (let i = 0; i < passLength; i++) {
	if (pass.charAt(i) == ' ') {
		passSecret = passSecret + ' '
	} else {
		passSecret = passSecret + '-'
	}
}

const getPass = () => {
	hangmanPass.innerHTML = passSecret
}
const alphFun = () => {
	for (let i = 0; i < 26; i++) {
		let item = String.fromCharCode(65 + i)
		letter = document.createElement('p')
		letter.classList.add('letter', `no${i}`)
		letter.textContent = item
		letter.addEventListener('click', () => check(item, letter))
		hangmanAlph.appendChild(letter)
	}
	getPass()
}
alphFun()

function pushLetter(str, index, char) {
	if (index > str.length - 1) return str.toString()
	else return str.substring(0, index) + char + str.substring(index + 1)
}
function check(letter) {
	let guess

	for (let i = 0; i < passLength; i++) {
		if (pass.charAt(i) === letter) {
			passSecret = pushLetter(passSecret, i, letter)
			guess = true
		}
	}

	const letterElement = document.querySelector(
		`.letter.no${letter.charCodeAt(0) - 65}`
	)

	if (letterElement.getAttribute('clicked') === 'true') {
		return
	}
	letterElement.setAttribute('clicked', 'true')

	if (guess) {
		yesSound.play()
		letterElement.classList.add('guessed')
		getPass()
	} else {
		noSound.play()
		letterElement.classList.add('notguessed')

		trying++
		const picture = 'img/s' + trying + '.jpg'
		hangmanImg.src = `./hangman/${picture}`
	}

	//wygrana
	if (pass === passSecret) {
		result.classList.remove('hide')
		hangmanAlph.classList.add('hide')
		result.classList.add('won')
		result.textContent = 'You WON!'
		resetBtn.classList.remove('hide')

	}
	//przegrana
	if (trying >= 9) {
		result.classList.remove('hide')
		hangmanAlph.classList.add('hide')
		result.classList.add('loose')
		result.textContent = 'You LOSE!'
		hangmanPass.textContent = pass
		resetBtn.classList.remove('hide')
	}
}
resetBtn.addEventListener('click', function() {
	location.reload();
  });