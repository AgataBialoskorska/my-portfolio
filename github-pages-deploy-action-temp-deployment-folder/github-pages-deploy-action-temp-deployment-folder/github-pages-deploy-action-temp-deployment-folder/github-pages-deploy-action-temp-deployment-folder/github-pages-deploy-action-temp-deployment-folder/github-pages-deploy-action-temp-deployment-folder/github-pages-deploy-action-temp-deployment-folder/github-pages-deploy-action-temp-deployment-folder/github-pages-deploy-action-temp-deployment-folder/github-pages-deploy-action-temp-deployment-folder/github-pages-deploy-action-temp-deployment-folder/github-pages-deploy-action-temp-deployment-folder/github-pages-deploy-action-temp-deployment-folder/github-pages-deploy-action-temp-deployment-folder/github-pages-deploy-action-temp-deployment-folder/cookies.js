function showCookieAlert() {
    const cookieAlert = document.querySelector('.cookie-alert');
    cookieAlert.style.display = 'block';
  }
  
  function hideCookieAlert() {
    const cookieAlert = document.querySelector('.cookie-alert');
    cookieAlert.style.display = 'none';
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const cookieAccepted = localStorage.getItem('cookie-accepted');
    if (!cookieAccepted) {
      showCookieAlert();
    }
  });
  
  const acceptCookies = () => {
    localStorage.setItem('cookie-accepted', true);
    hideCookieAlert();
  };