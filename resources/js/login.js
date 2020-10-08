import utils from './utils.js'

let userValue = localStorage.getItem('users')
let loggedinUser = localStorage.getItem('loggedin')

if (loggedinUser === null) {

  if (userValue === null) {
    let value = '[]' 
    localStorage.setItem('users', value) 
    loginAction()
    // location.href = '/register.html' 
  } else {
    loginAction()
  }

}
else {
  location.href = '/home.html'
}

function loginAction() {
  let fields = document.querySelectorAll('input') 
  let loginBtn = document.querySelector('#login-button') 

  loginBtn.addEventListener('click', function () {
    utils.retrieveObjects('users', function (data) {
      let dataString = JSON.stringify(data)

      if (dataString == '[]') {
        setError('No user exist')
      }
      else {
        for (let user of data) {
          if (fields[0].value == user.firstname && fields[1].value == user.password) {
            clearError(fields[1]) 
            let nameOfUser = `${user.firstname} ${user.lastname}` 
            localStorage.setItem('loggedin', nameOfUser)
            location.href = '/home.html'
          }
          else {
            setError('Username or Password is incorrect')
            console.log('No user found')
          }
        }
      }

    }) 
  }) 
}


// Setting the error
function setError(msg) {
  const errorField = document.querySelector(".login-error") 
  errorField.textContent = msg
}


// Clearing errors
function clearError() {
  const fieldError = document.querySelector(".login-error")
  fieldError.textContent = ''
}

let inputs = document.querySelectorAll('input')
for (let each of inputs) {
  each.addEventListener('focus', function () {
    clearError()
  })
}
