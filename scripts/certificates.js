const content = document.querySelector('#certificates')
const getImg = document.querySelectorAll('.certs img')
const getAlt = Array.from(getImg).map(img => img.alt)
const getUrl = Array.from(getImg).map(img => img.src)
let popup = null
let img = null
let alt = null
let currentImgIndex = 0

const createPopup = () => {
	popup = document.createElement('div')
	popup.className = 'popup'
	popup.style.opacity = '0'
	content.style.display = 'none'

	img = document.createElement('img')
	img.src = getUrl[currentImgIndex]

	const closeBtn = document.createElement('button')
	closeBtn.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
	closeBtn.className = 'closeBtn'

	const prevBtn = document.createElement('button')
	prevBtn.innerHTML = '<i class="fa-solid fa-circle-chevron-left"></i>'
	prevBtn.className = 'prevBtn'

	const nextBtn = document.createElement('button')
	nextBtn.innerHTML = '<i class="fa-solid fa-circle-chevron-right"></i>'
	nextBtn.className = 'nextBtn'

	alt = document.createElement('p')
	alt.textContent = getAlt[currentImgIndex]
	alt.className = 'alt'

	popup.appendChild(closeBtn)
	popup.appendChild(img)
	popup.appendChild(prevBtn)
	popup.appendChild(nextBtn)
	popup.appendChild(alt)
	document.body.appendChild(popup)

	setTimeout(() => {
		popup.style.opacity = '1'
		popup.style.transition = 'opacity, ease-out 0.7s '
	}, 0)

	closeBtn.addEventListener('click', () => {
		popup.style.opacity = '0'
		setTimeout(() => {
			document.body.removeChild(popup)
			popup = null
			content.style.display = 'revert'
		}, 250)
	})

	const changeImage = () => {
		img.style.opacity = '0'
		setTimeout(() => {
			img.src = getUrl[currentImgIndex]
			alt.textContent = getAlt[currentImgIndex]
			img.style.opacity = '1'
		}, 150)
	}

	prevBtn.addEventListener('click', () => {
		currentImgIndex = (currentImgIndex - 1 + getImg.length) % getImg.length
		changeImage()
	})

	nextBtn.addEventListener('click', () => {
		currentImgIndex = (currentImgIndex + 1) % getImg.length
		changeImage()
	})
}

const checkExistPopup = imgUrl => {
	if (popup) {
		document.body.removeChild(popup)
		createPopup(imgUrl)
	} else {
		createPopup(imgUrl)
	}
}

getImg.forEach((img, index) => {
	img.addEventListener('click', () => {
		currentImgIndex = index
		checkExistPopup(img.src)
	})
})
