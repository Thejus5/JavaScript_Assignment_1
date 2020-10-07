import utils from './utils.js'

// All input fields
let passwordInput = document.querySelector('#password')  // password field
let firstnameInput = document.querySelector('#firstname')  // First name field
let lastnameInput = document.querySelector('#lastname') // Last name field
let dateofbirthInput = document.querySelector('#dob') // date of birth field
// dateofbirthInput.defaultValue = '2014-02-09'
let dropdown = document.querySelector('select')  // Gender field
let terms = document.querySelector('#termsAndConditions') // Terms and conditions
let termsError = document.querySelector('#termsError')  // Terms and conditions error field

let forValidation = document.querySelectorAll('.validate')  // Fields for validation
let registerBtn = document.querySelector('#register-button')  // Register button

let isValid = true


// Click event of register button
registerBtn.addEventListener('click', function () {
  isValid = true
  validateFields(forValidation)

  if (isValid) {
    let confirmField = document.querySelector(`#${passwordInput.id}-confirm`) 
    if (confirmPassword(passwordInput)) {
      if (terms.checked) {
        clearError(confirmField) 
        let user = {
          firstname: firstnameInput.value,
          lastname: lastnameInput.value,
          dob: dateofbirthInput.value,
          gender: dropdown.value,
          password: passwordInput.value
        }

        utils.storeObjects('users', user)
        popup()
      } else {
        termsError.style.display = "block"
      }
    }
    else {
      setError(confirmField, 'Passwords does not match.') 
      isValid = true 
    }

  } else {
    console.log('Not Valid') 
    isValid = true 
  }

})


// General validation of required fields
function validateFields(fields) {

  for (let field of fields) {
    validate(field)
  }
}

function validate(field) {

  if (field.required && field.value.length == 0) {
    setError(field, `${field.name} cannot be blank.`) 
  }
  else {
    if (field.name == 'First name' || field.name == 'Last name') {
      validateName(field) 
    }
    else if (field.name == 'Password') {
      validatePassword(field)
    }
    else if (field.name == 'password-confirm') {
      confirmPassword(field)
    }
    else if (field.name == 'Date of birth') {
      validateDate(field)
    }
  }
}

// Validate name
function validateName(input) {
  if (input.value.length < input.minLength) {
    setError(input, `${input.name} is too short.`) 
    return false 
  } else {
    if (!isName(input.value)) {
      setError(input, 'Name is invalid!') 
      return false 
    } else {
      clearError(input) 
      return true 
    }
  }
}

// Validate password
function validatePassword(input) {
  if (input.value.length < input.minLength) {
    setError(input, `${input.name} is too short.`)
    return false
  }
  else {
    if (!isPass(input.value)) {
      setError(
        input,
        'password should contain at least one number and one special character'
      ) 
      return false 
    }
    else {
      clearError(input) 
      return true 
    }
  }
}

// Confirm password
function confirmPassword(input) {
  let secondPass = document.querySelector(`#${input.id}-confirm`) 
  if (input.value == secondPass.value) {
    return true
  }
  else {
    return false
  }
}

// Dob validation
function validateDate(input) {
  let d = new Date() 

  let dateInput = input.value.split("-")
  let userYear = parseInt(dateInput[0])
  let userMonth = parseInt(dateInput[1])
  let userDay = parseInt(dateInput[2])

  if (userYear > d.getFullYear()) {
    setError(input, "You are not born yet!")
  }
  else if (userYear == d.getFullYear()) {
    if (userMonth > d.getMonth() + 1 || userMonth > `0${d.getMonth() + 1}`) {
      setError(input, "You are not born yet!") 
    }
    else if (userMonth == d.getMonth() + 1 || userMonth == `0${d.getMonth() + 1}`) {
      if (userDay >= d.getDate() || userDay >= `0${d.getDate()}`) {
        setError(input, "You are not born yet!") 
      }
      else {
        clearError(input)
      }
    }
    else {
      clearError(input)
    }
  }
  else {
    clearError(input)
  }

}



// Name validation using regular expressions (Checks whether it contains only alphabets)
function isName(name) {
  return /^[A-Za-z\s]+$/.test(name)
}

function isPass(password) {
  return /^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password) 
  // Supposed to see if the password contains numbers, strings, and spl. chars
}

dateofbirthInput.addEventListener('focus', function () {
  this.type = 'date'
})

dateofbirthInput.addEventListener("blur", function () {
  this.type = 'text'
}) 

// Setting the error
function setError(input, msg) {
  const errorField = document.querySelector(`.${input.id}-error`)
  input.style.border = '1px solid #ff0033'
  errorField.textContent = msg
  isValid = false
}

// Clearing errors
function clearError(input) {
  const fieldError = document.querySelector(`.${input.id}-error`)
  input.style.border = '1px solid #2ecc71'
  fieldError.textContent = ''
}


// Validate on blur
for (let each of forValidation) {
  each.addEventListener('blur', function (e) {
    validate(e.target) 
  }) 
}

// Clear error on keydown
const form = document.querySelector('form')
form.addEventListener('keydown', function (e) {
  clearError(e.target)
})

// Creates a user and stores to localStorage
function createUser(firstname, lastname, dob, gender, password) {
  let userObj = {
    firstname: firstname,
    lastname: lastname,
    dob: dob,
    gender: gender,
    password: password
  }

  console.log(userObj) 
  utils.storeObjects('users', userObj)
}

// Make the popup
function popup() {
  let body = document.querySelector('.register-body')
  let popupCard = document.querySelector('.popup')

  body.classList.toggle('blur')
  popupCard.classList.toggle('active')
  disableScroll()
}

function disableScroll() {
  // Get the current page scroll position
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop 
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  // if any scroll is attempted, set this to the previous value
  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop) 
  }
}

termsError.addEventListener('change', function (e) {
  if (termsError.checked) {
    termsError.style.display = "none"
    console.log("check")
  }
  else {
    termsError.style.display = "block"
    console.log("not check")
  }
})