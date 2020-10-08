let jsonCaller = function (meathod, url, callback) {
  let xhr = new XMLHttpRequest()

  xhr.onload = function () {
    if (this.status === 200) {
      try {
        let responsObj = JSON.parse(this.responseText)
        callback(responsObj)
      }
      catch {
        console.warn('JSON not parsed')
      }
    }
    else {
      console.warn('JSON not found')
    }
  }

  xhr.open(meathod, url)
  xhr.send()
}

let storeObjects = function (key, value) {
  let existingValue = JSON.parse(localStorage.getItem(key))
  existingValue.push(value)
  let newValue = JSON.stringify(existingValue)
  localStorage.setItem(key, newValue) 
}



let retreiveObjects = function (key, callback) {
  let storedValue = JSON.parse(localStorage.getItem(key))
  callback(storedValue)
}

let utils = { jsonCaller, storeObjects, retrieveObjects: retreiveObjects }
export default utils

