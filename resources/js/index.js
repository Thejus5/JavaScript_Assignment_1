
if (supports_local_storage()) {
  location.href = "/login.html"
}
else {
  popup()
}

// Check for local storage support
function supports_local_storage() {
  try {
    return "localStorage" in window && window["localStorage"] !== null 
  } catch (e) {
    return false 
  }
}

// Make the popup
function popup() {
  let popupCard = document.querySelector(".index-popup") 
  popupCard.classList.toggle('active')
}