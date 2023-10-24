const hangmanImg = document.querySelector('.hangman img')
const hangmanPass = document.querySelector('.password')
const hangmanAlph = document.querySelector('.alphabet')
const result = document.querySelector('.result')
const resetBtn = document.querySelector('.reset')
const backBtn = document.querySelector('.backBtn')
const gitHangmanBtn = document.querySelector('.gitHangmanBtn')

const passArr = [
	'Practice makes perfect',
	'East or west, home is best',
	'A friend in need is a friend indeed',
	'Where there is a will, there is a way',
	'Time heals all wounds',
	'Better late than never',
	'Easier said than done',
	'Speech is silver, silence is golden',
	'Better an open enemy than a false friend',
	'Every man has his faults',
]
const pass = passArr[Math.floor(Math.random() * passArr.length)].toUpperCase()
let passLength = pass.length
let trying = 0
const yesSound = new Audio('/projects/hangman/yes.wav')
const noSound = new Audio('/projects/hangman/no.wav')
let passSecret = ''
for (let i = 0; i < passLength; i++) {
	if (pass.charAt(i) == ' ') {
		passSecret = passSecret + ' '
	} else if (pass.charAt(i) == ',') {
		passSecret = passSecret + ','
	} else {
		passSecret = passSecret + '-'
	}
}
const getPass = () => {
	hangmanPass.innerHTML = passSecret
}
const alphFun = () => {
	for (let i = 0; i < 26; i++) {
		const item = String.fromCharCode(65 + i)
		const letter = document.createElement('p')
		letter.classList.add('letter', `no${i}`)
		letter.textContent = item
		letter.addEventListener('click', () => check(item, letter))
		hangmanAlph.appendChild(letter)
	}
	getPass()
}
alphFun()

const pushLetter = (str, index, char) => {
	if (index > str.length - 1) return str.toString()
	else return str.substring(0, index) + char + str.substring(index + 1)
}
const check = letter => {
	if (passSecret.includes(letter)) {
		return
	}
	let guess = false

	for (let i = 0; i < passLength; i++) {
		if (pass[i] === letter) {
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
		hangmanImg.src = `img/s${trying}.jpg`
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

resetBtn.addEventListener('click', () => location.reload())
backBtn.addEventListener('click', () => history.back())
gitHangmanBtn.addEventListener(
	'click',
	() =>
		(window.location.href =
			'https://github.com/AgataBialoskorska/my-portfolio/tree/master/projects/hangman')
)
