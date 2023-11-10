const imgLinks = document.querySelectorAll('.certs img')
let popup = null;
let currentImgUrl = '';

const createPopup = imgUrl => {
  popup = document.createElement('div')
  popup.className = 'popup'
  popup.style.opacity = '0';

  const img = document.createElement('img')
  img.src = imgUrl

  const closeBtn = document.createElement('button')
  closeBtn.innerHTML = '<i class="far fa-times-circle"></i>'
  closeBtn.className = 'closeBtn'

  popup.appendChild(closeBtn)
  popup.appendChild(img)
  document.body.appendChild(popup)

  setTimeout(() => {
    popup.style.opacity = '1';
    popup.style.transition = 'opacity, ease-out 0.7s ';
  }, 0);

  closeBtn.addEventListener('click', () => {
    popup.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(popup);
      popup = null;
    }, 250);
  });
}

const checkExistPopup = imgUrl => {
  if (popup) {
    document.body.removeChild(popup)
    createPopup(imgUrl)
  } else {
    createPopup(imgUrl)
  }
}

imgLinks.forEach(img => {
  img.addEventListener('click', () => {
      checkExistPopup(img.src)
  })
})

