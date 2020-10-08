import utils from './utils.js'

window.onload = (event) => {
  var obj;

  menuLoader();
  welcomeText();
  searchFilter();
  mobileMenuDropdown()

  function welcomeText() {
    var welcomeTextBox = document.querySelector(".welcome-text");
    var logoutBtn = document.querySelector(".logout");

    welcomeTextBox.textContent = `Hi ${localStorage.getItem("loggedin")}`;
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("loggedin");
      location.href = "/login.html";
    });
  }

  function menuLoader() {
    const menuList = document.querySelector("#nav-menus");
    const header = document.querySelector("#page-heading");

    utils.jsonCaller("get", "resources/json/menu.json", function (menuObj) {
      obj = menuObj;
      for (let menu of menuObj) {
        let menuElements = createMenu(menu.label, menu.link, menu.status);
        menuList.appendChild(menuElements);
        createHeading(menu);
      }
    });

    // Event handling of menu
    menuList.addEventListener("click", function (evt) {
      let status = evt.target.getAttribute("data-status");

      if (status == "true") {
        window.location.assign(evt.target.getAttribute("data-link"));
      } else {
        window.location.assign("/404.html");
      }
    });

    // Function for creating menu elements
    function createMenu(content, link, status) {
      const menuElement = document.createElement("li");
      const menuLink = document.createElement("a");
      menuLink.href = "#";
      menuLink.setAttribute("data-link", link);
      menuLink.setAttribute("data-status", status);
      menuLink.className += "menu-link";
      menuLink.textContent = content;
      menuElement.appendChild(menuLink);
      return menuElement;
    }

    // Function for setting heading
    function createHeading(input) {
      let currentPath = location.pathname;
      if (currentPath == input.link) {
        header.textContent = input.label;
      }
    }
  }

  // Blog post section
  let postLists = document.querySelector(".posts");
  utils.jsonCaller("get", "resources/json/blogpost.json", function (blogObj) {
    for (let blog of blogObj) {
      let blogPost = createPost(blog.tittle, blog.image);
      postLists.appendChild(blogPost);
    }
  });

  function createPost(tittle, imgLink) {
    const postElement = document.createElement("li");
    const postLink = document.createElement("a");

    const postLinkDiv = document.createElement("div");
    postLinkDiv.className += "post-image-div";

    const postText = document.createElement("p");
    postText.className += "post-info";
    postText.textContent = tittle;

    const postImg = document.createElement("img");
    postImg.src = imgLink;

    postLinkDiv.appendChild(postText);
    postLinkDiv.appendChild(postImg);
    postLink.appendChild(postLinkDiv);
    postElement.appendChild(postLink);

    return postElement;
  }

  // Search filter
  function searchFilter() {
    const searchBar = document.querySelector("#search");
    const mainPara = document.querySelector("#blog-paragraph");
    let backupContent = mainPara.textContent;
    // const mainPara = document.querySelector(".content")
    searchBar.addEventListener("keyup", function () {
      let value = searchBar.value;
      let content = mainPara.textContent;
      if (content.indexOf(value) != -1) {
        mainPara.innerHTML = content.replaceAll(
          value,
          `<span id="highlight">${value}</span>`
        );
      } else {
        mainPara.innerHTML = content;
      }
    });

    searchBar.addEventListener("search", function (e) {
      mainPara.textContent = backupContent;
    });
  }

  // Drop down menu in mobile view
  function mobileMenuDropdown() {
    const dropDownButton = document.querySelector(".drop-down-button");
    dropDownButton.addEventListener("click", function () {
      const navigation = document.querySelector(".navigation");
      if (navigation.style.display === "none") {
        navigation.style.display = "block";
      } else {
        navigation.style.display = "none";
      }
    });
  }
}



