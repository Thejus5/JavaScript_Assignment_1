
/*------------------- Table Header loading fn -------------------*/

let tableHeadLoader = function (headerList, order, callback) {
  if (headerList) {  // Checks whether a table exists.
    let headRow = document.createElement("tr") 

    for (let headValue of headerList) {
      let headElement = document.createElement("th")

      // Check the table sorting direction and add class name accordingly.
      if (order == "asc") {
        headElement.className += "asc"
      } else {
        headElement.className += "des"
      }

      // Adding text content and data attribute to 'th' element
      headElement.textContent = headValue.tittle 
      headElement.setAttribute("data-type", headValue.type) 
      headElement.setAttribute("data-sortable", headValue.sortable) 
      headElement.id = headValue.id 

      // Adding up and down arrows
      if (headValue.sortable == true) {

        let upArrow = document.createElement('i')
        upArrow.className = `${headValue.id}UpArrow up Arrow` 

        let downArrow = document.createElement('i')
        downArrow.className = `${headValue.id}DownArrow down Arrow` 

        headElement.appendChild(upArrow)
        headElement.appendChild(downArrow) 
      }

      headRow.appendChild(headElement) 
    }

    callback(headRow) 

  }
}


/*------------------- Table content loading fn -------------------*/

let tableBodyLoader = function (tableBody, headerList, contentList) {
  if (contentList) {  // Checks if any content present


    for (let contentValue of contentList) {
      let rowElement = document.createElement("tr")

      for (let headerValue of headerList) {
        let columnElement = document.createElement("td") 
        let key = headerValue.id 
        let cellValue = contentValue[key] 

        if (headerValue.type == "link") {
          let link = document.createElement("a") 
          link.href = cellValue 
          link.textContent = "Link" 
          columnElement.appendChild(link) 
        } else if (headerValue.type == "button") {
          if (contentValue.status == "open") {
            let btn = document.createElement("button") 
            btn.textContent = "Apply Now" 
            btn.onclick = function (e) {
              alert("Applies Successfully") 
            } 
            columnElement.appendChild(btn) 
          } else {
            columnElement.textContent = " - " 
          }
        } else if (headerValue.type == "number" || headerValue.type == "date") {
          columnElement.style.textAlign = "right" 
          columnElement.textContent = cellValue 
          columnElement.className = key 
        } else {
          columnElement.textContent = cellValue 
          columnElement.className = key 
        }

        rowElement.appendChild(columnElement) 
      }
      tableBody.appendChild(rowElement) 
    }
  }
  else {
    // Fallback fn here.......................................
  }
}


/*------------------- Table sorting fn ------------------------*/

let tableSort = function (header, contentList, callback) {

  // See if the data is sortable number
  if (
    header.dataset["sortable"] == "true" &&
    header.dataset["type"] == "number"
  ) {
    let element = document.querySelectorAll(`.${header.id}`) 
    let valueList = [] 

    for (let each of element) {
      valueList.push(parseInt(each.textContent)) 
    }

    if (header.className == "asc") {
      var nextOrder = "des" 
      valueList.sort((a, b) => a - b) 
      var newContentList = newContentCreator(valueList, contentList, header.id, nextOrder) 
      callback(newContentList, nextOrder) 

    } else {
      var nextOrder = "asc" 
      valueList.reverse((a, b) => a - b) 
      var newContentList = newContentCreator(valueList, contentList, header.id, nextOrder) 
      callback(newContentList, nextOrder) 
    }
  }
  // See if the data is sortable strings
  else if (
    header.dataset["sortable"] == "true" &&
    header.dataset["type"] == "string"
  ) {
    let element = document.querySelectorAll(`.${header.id}`) 
    let valueList = [] 

    for (let each of element) {
      valueList.push(each.textContent) 
    }

    if (header.className == "asc") {
      var nextOrder = "des" 
      valueList.sort() 
      var newContentList = newContentCreator(valueList, contentList, header.id, nextOrder) 
      callback(newContentList, nextOrder) 
    } else {
      var nextOrder = "asc" 
      valueList.reverse() 
      var newContentList = newContentCreator(valueList, contentList, header.id, nextOrder) 
      callback(newContentList, nextOrder) 
    }
  }
  // See if the data is sortable date (string type)
  else if (
    header.dataset["sortable"] == "true" &&
    header.dataset["type"] == "date"
  ) {
    let element = document.querySelectorAll(`.${header.id}`) 
    let valueList = [] 

    for (let each of element) {
      valueList.push(each.textContent) 
    }

    if (header.className == "asc") {
      var nextOrder = "des" 
      valueList.sort() 
      var newContentList = newContentCreator(valueList, contentList, header.id, nextOrder) 
      callback(newContentList, nextOrder) 
    } else {
      let nextOrder = "asc" 
      valueList.reverse() 
      var newContentList = newContentCreator(valueList, contentList, header.id, nextOrder) 
      callback(newContentList, nextOrder) 
    }

  } else {
    console.log("Not sortable") 
  }
}



// New table according to sort
function newContentCreator(valueList, contentList, key, nextOrder) {
  let tableBody = document.querySelector("tbody") 
  let tableHeader = document.querySelector("thead") 

  let newContentObj = [] 

  for (let values of valueList) {
    for (let content of contentList) {
      if (values == content[key]) {
        newContentObj.push(content) 
      }
    }
  }
  removeChildNode(tableBody) 
  removeChildNode(tableHeader) 
  return newContentObj 
}

// Remove table content
function removeChildNode(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}



let tableFn = { tableHeadLoader, tableBodyLoader, tableSort } 
export default tableFn