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

