import utils from './utils.js'
import tableFn from "./table.js"

let paraHeight
let headerObj, contentObj


/*--------------- Home page content loading section ---------------*/
const para = document.querySelector('#blog-paragraph')
const imageArea = document.querySelector('.image-area')

utils.jsonCaller('get', 'resources/json/homepage.json', function (object) {
  para.textContent = object.content
  // let headerObj = object.table
  headerObj = object.table

  const image = document.createElement('img')
  image.src = object.image
  image.className += 'content-img'
  imageArea.appendChild(image)

  paraResize()
  loadTable(headerObj)
})


4
/*--------------- Table loading section ---------------*/

function loadTable(headerObj) {

  if (headerObj) {  // Checks whether a tale exist
    let tableContainer = document.querySelector(".bottom-section")
    const table = tableContainer.appendChild(document.createElement("table"))
    table.appendChild(document.createElement("thead"))
    table.appendChild(document.createElement("tbody"))

    // Table header loading
    tableFn.tableHeadLoader(headerObj)

    // Table content loading
    utils.jsonCaller("get", "resources/json/vacancies.json", function (object) {
      contentObj = object
      tableFn.tableBodyLoader(contentObj)
    })

  }
}

/*--------------- Paragraph resize and read more section ---------------*/
const readMoreBtn = document.querySelector('.read-more')
const readLessBtn = document.querySelector('.read-less')


function paraResize() {
  paraHeight = para.offsetHeight
  if (paraHeight > 197) {
    readLess()
  } else {
    para.style.height = 'auto'
    readMoreBtn.style.display = 'none'
    readLessBtn.style.display = 'none'
  }
}

// Read less__
readLessBtn.addEventListener('click', function () {
  para.style.height = '197px'
  readMoreBtn.style.display = 'block'
  readLessBtn.style.display = 'none'
})

function readLess() {
  para.style.height = '197px'
  readMoreBtn.style.display = 'block'
  readLessBtn.style.display = 'none'
}


// Read more__
readMoreBtn.addEventListener('click', function () {
  para.style.height = 'auto'
  readMoreBtn.style.display = 'none'
  readLessBtn.style.display = 'block'
})
















