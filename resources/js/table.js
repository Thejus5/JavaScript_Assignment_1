let tableHeads
let tableContent
/*------------------- Table Header loading fn -------------------*/

let tableHeadLoader = function (headerList) {
  if (headerList) {  // Checks whether a table exists.
    tableHeads = headerList
    let headRow = document.createElement("tr")

    for (let headValue of headerList) {
      let headElement = document.createElement("th")

      // Adding text content and data attribute to 'th' element
      headElement.textContent = headValue.title
      headElement.setAttribute("data-type", headValue.type)
      headElement.setAttribute("data-sortable", headValue.sortable)
      headElement.id = headValue.id

      // Adding up and down arrows
      if (headValue.sortable == true) {

        let upArrow = document.createElement('i')
        upArrow.className = `${headValue.id} up Arrow`

        let downArrow = document.createElement('i')
        downArrow.className = `${headValue.id} down Arrow`;

        headElement.appendChild(upArrow)
        headElement.appendChild(downArrow)
      }

      headRow.appendChild(headElement)
    }

    // Insert tr into thead
    let tableHead = document.querySelector('thead')
    tableHead.appendChild(headRow)

    bindEventListener(tableHead)

  }
}

/*------------------- Event listener for table headers loading fn -*/
function bindEventListener(tableHead) {

  tableHead.addEventListener("click", function (e) {
    let header = e.target
    let clickedId = header.id
    console.log(header)
    filterIconClick(header, function (newHeader,newContentList) {
      header = newHeader;
      // determine current clicked header sort class name
      let nextOrder;
      if (!header.className || header.className == "asc") {
        nextOrder = "des";
      } else {
        nextOrder = "asc";
      }

      // reset all header sort classnames
      clearHeaderSortClass();
      header.className = nextOrder;

      // Table body (re)loading
      redraw(newContentList);
    });
  })
}

//Filters out click on header icon
function filterIconClick(header,callback){
  if (!header.dataset.sortable) {
    console.log(header.classList[0]);
    let realHeader = document.querySelector(`#${header.classList[0]}`);
    header = realHeader
    console.log(realHeader)
  }

  tableSort(header,function(newContentList){
      callback(header,newContentList);
  })
}


/*------------------- Table content loading fn -------------------*/

let tableBodyLoader = function (contentList) {
  if (contentList) {  // Checks if any content present
    tableContent = contentList
    for (let contentValue of contentList) {
      let rowElement = document.createElement("tr")

      for (let headerValue of tableHeads) {
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
      let tableBody = document.querySelector('tbody')
      tableBody.appendChild(rowElement)
    }
  }
  else {
    // Fallback fn here.......................................
  }
}

// Re creating table body upon click__
function redraw(newContentList) {
  document.querySelector("tbody").remove()
  let table = document.querySelector('table')
  table.appendChild(document.createElement('tbody'))
  tableBodyLoader(newContentList)
}

/*------------------- Table sorting fn ------------------------*/

let tableSort = function (header, callback) {

    if (header.dataset.sortable == "true") {
      let newContentList;
      const isNumber = header.dataset.type == "number"; // Checks if datatype is number or string

      if (!header.className || header.className == "asc") {
        newContentList = sortData(tableContent, header.id, isNumber);
        // newContentList = 'check'
      } else if (header.className == "des") {
        newContentList = reverseData(tableContent, header.id, isNumber);
        // newContentList = 'try'
      }

      callback(newContentList);
    } else {
      console.log("Not Sortable");
    }

}

// Ascending sort__
function sortData(tableData, key, isNumber) {
  const sortNumber = function (a, b) {
    return a[key] - b[key]
  }
  const sortString = function (a, b) {
    if (a[key] > b[key]) return 1
    else if (a[key] < b[key]) return -1
    else return 0
  }
  const newData = tableData.sort(isNumber ? sortNumber : sortString)
  return newData
}

// Descending sort__
function reverseData(tableData, key, isNumber) {
  const sortNumber = function (a, b) {
    return a[key] - b[key]
  }
  const sortString = function (a, b) {
    if (a[key] > b[key]) return 1
    else if (a[key] < b[key]) return -1
    else return 0
  }
  const newData = tableData.reverse(isNumber ? sortNumber : sortString)
  return newData
}


function clearHeaderSortClass() {
  const allHeaders = document.querySelectorAll("th")
  for (let th of allHeaders) {
    th.className = ""
  }
}



let tableFn = { tableHeadLoader, tableBodyLoader, tableSort }
export default tableFn