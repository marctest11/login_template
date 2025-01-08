const collapseToggle = document.querySelector(".collapse-toggle");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-content");

// Toggle sidebar
collapseToggle.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

// Enhanced Submenu Toggle
document.querySelectorAll(".has-submenu").forEach((item) => {
  item.addEventListener("click", (e) => {
    if (!sidebar.classList.contains("collapsed")) {
      const submenu = item.querySelector(".submenu");
      submenu.classList.toggle("active");
    } else {
      const submenu = item.querySelector(".submenu");
      submenu.classList.toggle("active");
    }
  });
});

// Auto collapse on small screens
function handleResize() {
  if (window.innerWidth < 768) {
    sidebar.classList.add("collapsed");
  } else {
    if (sidebar.classList.contains("collapsed")) {
      sidebar.classList.remove("collapsed");
    }
  }
}

// Initial check and listen for resize
handleResize();
window.addEventListener("resize", handleResize);

// เพิ่ม Event Listener ให้กับเมนูย่อย
document
  .querySelector(".menu-item:first-child")
  .addEventListener("click", () => {
    document.querySelector(".header h1").textContent = "S11 P_SG";

    const welcomeTemplate = document.querySelector("#welcome-template");

    mainContent.innerHTML = "";
    mainContent.appendChild(welcomeTemplate.content.cloneNode(true));
  });

document.querySelectorAll(".submenu li").forEach((submenuItem) => {
  submenuItem.addEventListener("click", (e) => {
    const menuType = e.target.getAttribute("data-menu");
    const template = document.querySelector(`#${menuType}`);
    const headerText =
      e.target.getAttribute("data-header") || e.target.textContent.trim();

    document.querySelector(".header h1").textContent = `${headerText}`;

    if (template) {
      mainContent.innerHTML = "";
      mainContent.appendChild(template.content.cloneNode(true));

      // เพิ่ม event listener ให้กับทุกปุ่มที่มี class load-template
      const loadTemplateButtons =
        mainContent.querySelectorAll(".load-template");
      loadTemplateButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const templateId = e.target.getAttribute("data-target");
          const buttonText =
            e.target.getAttribute("data-header") || e.target.textContent.trim();

          const nextTemplate = document.querySelector(`#${templateId}`);

          if (nextTemplate) {
            document.querySelector(".header h1").textContent = `${buttonText}`;

            mainContent.innerHTML = "";
            mainContent.appendChild(nextTemplate.content.cloneNode(true));
          } else {
            console.warn(`Template with ID '${templateId}' not found.`);
          }
        });
      });
    } else {
      console.warn(`Template with ID '${menuType}' not found.`);
    }
  });
});
