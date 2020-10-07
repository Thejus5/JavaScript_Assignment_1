import utils from "./utils.js"
import tableFn from "./table.js"

// Global variables
let contentObj, headerObj

/*--------------- Services page content loading section ---------------*/
utils.jsonCaller("get", "resources/json/services.json", function (object) {
  headerObj = object.table
  loadTable(headerObj)
})


/*--------------- Table loading section ---------------*/
let tableHeader = document.querySelector("thead")
let tableBody = document.querySelector("tbody")
function loadTable(headerObj) {
  if (headerObj) {
    // Checks whether a tale exist
    let tableContainer = document.querySelector(".bottom-section")
    const table = tableContainer.appendChild(document.createElement("table"))
    table.appendChild(document.createElement("thead"))
    table.appendChild(document.createElement("tbody"))

    // Table header loading
    tableFn.tableHeadLoader(headerObj)

    // Table content loading
    utils.jsonCaller("get", "resources/json/offices.json", function (object) {
      contentObj = object
      tableFn.tableBodyLoader(contentObj)
    })
  }
}


// Event listener for sorting
// tableHeader.addEventListener("click", function (e) {
//   let header = e.target 
//   let clickedId = header.id
//   tableFn.tableSort(header, contentObj, function (newContentList, nextOrder) {
//     // Table header (re)loading
//     tableFn.tableHeadLoader(headerObj, nextOrder, function (headRow) {
//       tableHeader.appendChild(headRow) 

//       // Hide icons based on sort order
//       let upArrow = document.querySelector(`.${clickedId}UpArrow`)
//       let downArrow = document.querySelector(`.${clickedId}DownArrow`) 
//       if (nextOrder == 'asc') {
//         upArrow.style.visibility = 'hidden'
//         downArrow.style.visibility = "visible" 
//       }
//       else {
//         upArrow.style.visibility = "visible" 
//         downArrow.style.visibility = "hidden" 
//       }
//     }) 

//     // Table body (re)loading
//     tableFn.tableBodyLoader(tableBody, headerObj, newContentList) 
//   }) 
// }) 

