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

// // Handle login
// const handleLogin = async (event) => {
//   event.preventDefault();
//   const eid = event.target.querySelector('input[name="eid"]').value;
//   const password = event.target.querySelector('input[name="password"]').value;

//   if (eid === "11111" && password === "password") {
//     let calculatorTemplate = "";
//     try {
//       const response = await fetch(
//         "https://marctest11.github.io/login_template/page/cal_pmt.html"
//       );

//       // const response = await fetch("../page/cal_pmt.html");
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const templateText = await response.text();
//       const tempContainer = document.createElement("div");
//       tempContainer.innerHTML = templateText;
//       calculatorTemplate = tempContainer.querySelector("#calculator-template");
//     } catch (error) {
//       console.error("เกิดข้อผิดพลาดในการโหลดเทมเพลต:", error);
//     }

//     if (calculatorTemplate) {
//       mainContent.innerHTML = "";
//       mainContent.appendChild(calculatorTemplate.content.cloneNode(true));

//       const rangeInput = document.getElementById("installmentMonths");
//       const monthValue = document.getElementById("monthValue");

//       const loanTypeSelect = document.getElementById("loanType");

//       const interestRateInput = document.getElementById("interestRate");

//       if (rangeInput && monthValue) {
//         monthValue.textContent = rangeInput.value;
//         rangeInput.addEventListener("input", () => {
//           monthValue.textContent = rangeInput.value;
//         });
//       }

//       loanTypeSelect.addEventListener("change", () => {
//         if (loanTypeSelect.value === "1") {
//           interestRateInput.value = 23;
//         } else if (loanTypeSelect.value === "2") {
//           interestRateInput.value = 24;
//         } else {
//           interestRateInput.value = interestRateInput;
//         }
//       });
//       setupCalculator();
//     } else {
//       console.error("ไม่สามารถเรียกหน้านี้ได้");
//     }
//     setupCalculator();
//   } else {
//     alert("Eid หรือ รหัสผ่านไม่ถูกต้อง");
//   }
// };

// let calculatorInitialized = false;

// const setupCalculator = () => {
//   if (calculatorInitialized) return;
//   const numberFormat = (value) =>
//     new Intl.NumberFormat("th-TH", {
//       style: "decimal",
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(value);

//   const calculateNF = (amount, months, rate, vat, down) => {
//     // console.log(down);
//     const vatMultiplier = 1 + vat / 100;

//     if (down !== 0) {
//       amount = amount - down;
//       // console.log(amount);
//     }
//     // console.log(`amt ${amount}`);
//     const installmentWithVat = parseInt(
//       amount / ((1 - 1 / Math.pow(1 + rate, months)) / rate)
//     );
//     // console.log(rate);
//     // console.log(vatMultiplier);
//     // console.log(installmentWithVat);
//     const loanNoVat = amount / vatMultiplier;
//     const installmentNoVat = parseFloat(
//       (installmentWithVat / vatMultiplier).toFixed(2)
//     );
//     const vatAmount = installmentWithVat - installmentNoVat;
//     const customerLoan = installmentWithVat * months;
//     const feeLoan = customerLoan - amount;

//     return {
//       InstallmentWithVat: numberFormat(installmentWithVat),
//       LoanNoVat: numberFormat(loanNoVat),
//       InstallmentNoVat: numberFormat(installmentNoVat),
//       Vat: numberFormat(vatAmount),
//       CustomerLoan: numberFormat(customerLoan),
//       FeeLoan: numberFormat(feeLoan),
//       Down: numberFormat(down),
//     };
//   };

//   document.getElementById("irrForm").addEventListener("submit", (e) => {
//     e.preventDefault();

//     const nfAmount = parseFloat(document.getElementById("nfAmount").value);
//     const installmentMonths = parseInt(
//       document.getElementById("installmentMonths").value
//     );

//     const loanType = document.getElementById("loanType").value;
//     const ratecustom = document.getElementById("interestRate").value;
//     const down = document.getElementById("downPayment").value;

//     // console.log(`down ${down}`);

//     if (!loanType) {
//       alert("Please select a loan type.");
//       return;
//     }

//     let loanData;
//     let textloan;
//     if (loanType === "1" && ratecustom === "23") {
//       loanData = { Name: "Loan", InRate: 23 / 12 / 100, Vat: 7 };
//       textloan = "ยอดกู้ไม่รวม VAT: ";
//     } else if (loanType === "2" && ratecustom === "24") {
//       loanData = { Name: "P-loan", InRate: 24 / 12 / 100, Vat: 0 };
//       textloan = "ยอดกู้รวม VAT: ";
//     } else {
//       loanData = { Name: "Custom", InRate: ratecustom / 12 / 100, Vat: 0 };
//       textloan = "ยอดกู้ไม่รวม VAT: ";
//     }

//     const results = calculateNF(
//       nfAmount,
//       installmentMonths,
//       loanData.InRate,
//       loanData.Vat,
//       down
//     );

//     document.getElementById("loanTypeResult").textContent = loanData.Name;
//     document.getElementById("installmentWithVat").textContent =
//       results.InstallmentWithVat;
//     document.getElementById("loanNoVat").textContent =
//       textloan + results.LoanNoVat;
//     document.getElementById("installmentNoVat").textContent =
//       results.InstallmentNoVat;
//     document.getElementById("vat").textContent = results.Vat;
//     document.getElementById("customerLoan").textContent = results.CustomerLoan;
//     document.getElementById("feeLoan").textContent = results.FeeLoan;
//     document.getElementById("payDown").textContent = results.Down;

//     document.getElementById("results").style.display = "block";
//   });

//   calculatorInitialized = true;
// };

// // template calculator  loaded
// document.addEventListener("DOMContentLoaded", () => {
//   const calculatorTemplate = document.querySelector("#calculator-template");
//   const mainContent = document.querySelector(".main-content");

//   if (calculatorTemplate) {
//     mainContent.innerHTML = "";
//     mainContent.appendChild(calculatorTemplate.content.cloneNode(true));
//     setupCalculator();
//   }
// });

// Load login form

const loadLoginForm = async (container) => {
  try {
    // const response = await fetch("../page/login.html");
    const response = await fetch(
      "https://marctest11.github.io/login_template/page/login.html"
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
      form.addEventListener("submit", (event) => handleLogin(event, mainContent));
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
        document.querySelector(".header h1").textContent = headerText;

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
      const headerText = e.target.getAttribute("data-header");
      const template = document.querySelector(`#${menuType}`);

      if (template) {
        document.querySelector(".header h1").textContent = headerText;
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
    document.querySelector(".header h1").textContent = "S11 P_SG";
    loadWelcomeTemplate();
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
