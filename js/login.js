import { setupCalculator } from "./cal_pmt.js";
// Handle login
export const handleLogin = async (event,mainContent) => {
    event.preventDefault();
    const eid = event.target.querySelector('input[name="eid"]').value;
    const password = event.target.querySelector('input[name="password"]').value;
  
    if (eid === "11111" && password === "password") {
      let calculatorTemplate = "";
      try {
        const response = await fetch(
          "https://marctest11.github.io/login_template/page/cal_pmt.html"
        );
  
        // const response = await fetch("../page/cal_pmt.html");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const templateText = await response.text();
        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = templateText;
        calculatorTemplate = tempContainer.querySelector("#calculator-template");
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดเทมเพลต:", error);
      }
  
      if (calculatorTemplate) {
        mainContent.innerHTML = "";
        mainContent.appendChild(calculatorTemplate.content.cloneNode(true));
  
        const rangeInput = document.getElementById("installmentMonths");
        const monthValue = document.getElementById("monthValue");
  
        const loanTypeSelect = document.getElementById("loanType");
  
        const interestRateInput = document.getElementById("interestRate");
  
        if (rangeInput && monthValue) {
          monthValue.textContent = rangeInput.value;
          rangeInput.addEventListener("input", () => {
            monthValue.textContent = rangeInput.value;
          });
        }
  
        loanTypeSelect.addEventListener("change", () => {
          if (loanTypeSelect.value === "1") {
            interestRateInput.value = 23;
          } else if (loanTypeSelect.value === "2") {
            interestRateInput.value = 24;
          } else {
            interestRateInput.value = interestRateInput;
          }
        });
        setupCalculator();
      } else {
        console.error("ไม่สามารถเรียกหน้านี้ได้");
      }
      setupCalculator();
    } else {
      alert("Eid หรือ รหัสผ่านไม่ถูกต้อง");
    }
  };