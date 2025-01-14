import { handleLogin } from "./login.js";

const collapseToggle = document.querySelector(".collapse-toggle");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-content");

// Toggle sidebar
collapseToggle.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

// Submenu toggle
const setupSubmenuToggle = () => {
  document.querySelectorAll(".has-submenu").forEach((item) => {
    item.addEventListener("click", (e) => {
      const submenu = item.querySelector(".submenu");
      submenu.classList.toggle("active");
    });
  });
};

// Handle window resize
const handleResize = () => {
  if (window.innerWidth < 768) {
    sidebar.classList.add("collapsed");
  } else {
    sidebar.classList.remove("collapsed");
  }
};

// Load welcome template
const loadWelcomeTemplate = () => {
  const welcomeTemplate = document.querySelector("#welcome-template");
  mainContent.innerHTML = "";
  mainContent.appendChild(welcomeTemplate.content.cloneNode(true));
};

// Load login form

const loadLoginForm = async (container) => {
  try {
    // const response = await fetch("../../main/page/login.html");
    const response = await fetch(
      "https://marctest11.github.io/login_template/main/page/login.html"
    );
    // console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const htmlText = await response.text();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlText;

    const loginFormTemplate = tempDiv.querySelector("#login-form-template");

    if (loginFormTemplate && container) {
      const loginFormClone = loginFormTemplate.content.cloneNode(true);
      const form = loginFormClone.querySelector(".login-form");
      // form.addEventListener("submit", handleLogin);
      form.addEventListener("submit", (event) =>
        handleLogin(event, mainContent)
      );
      container.appendChild(loginFormClone);
    }
  } catch (error) {
    console.error("Error loading login form:", error);
  }
};

// template loading buttons
const setupLoadTemplateButtons = () => {
  const buttons = document.querySelectorAll(".load-template");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const templateId = e.target.getAttribute("data-target");
      const headerText = e.target.getAttribute("data-header");
      const template = document.querySelector(`#${templateId}`);

      if (template) {
        // Update header
        // document.querySelector(".header h1").textContent = headerText;

        mainContent.innerHTML = "";
        const content = template.content.cloneNode(true);
        mainContent.appendChild(content);

        const h2 = mainContent.querySelector(".text-menu h2");
        if (h2) {
          h2.textContent = headerText;
        }

        const loginPlaceholder =
          mainContent.querySelector("#login-placeholder");
        if (loginPlaceholder) {
          loadLoginForm(loginPlaceholder);
        }

        setupLoadTemplateButtons();
      }
    });
  });
};

//submenu listeners
const setupSubmenuListeners = () => {
  document.querySelectorAll(".submenu li").forEach((item) => {
    item.addEventListener("click", (e) => {
      const menuType = e.target.getAttribute("data-menu");

      const template = document.querySelector(`#${menuType}`);

      if (template) {
        // document.querySelector(".header h1").textContent = headerText;
        mainContent.innerHTML = "";
        mainContent.appendChild(template.content.cloneNode(true));
        setupLoadTemplateButtons();
      }
    });
  });
};

// Home menu click handler
document
  .querySelector(".menu-item:first-child")
  .addEventListener("click", () => {
    // document.querySelector(".header h1").textContent = "S11 P_SG";
    loadWelcomeTemplate();
  });

document.querySelector(".menu-item.logout").addEventListener("click", () => {
  window.location.href = "../index.html";
});

// everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  handleResize();
  setupSubmenuToggle();
  setupSubmenuListeners();
  setupLoadTemplateButtons();
  loadWelcomeTemplate();

  window.addEventListener("resize", handleResize);
});
