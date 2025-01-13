let calculatorInitialized = false;

export const setupCalculator = () => {
    if (calculatorInitialized) return;
    const numberFormat = (value) =>
      new Intl.NumberFormat("th-TH", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
  
    const calculateNF = (amount, months, rate, vat, down) => {
      // console.log(down);
      const vatMultiplier = 1 + vat / 100;
  
      if (down !== 0) {
        amount = amount - down;
        // console.log(amount);
      }
      // console.log(`amt ${amount}`);
      const installmentWithVat = parseInt(
        amount / ((1 - 1 / Math.pow(1 + rate, months)) / rate)
      );
      // console.log(rate);
      // console.log(vatMultiplier);
      // console.log(installmentWithVat);
      const loanNoVat = amount / vatMultiplier;
      const installmentNoVat = parseFloat(
        (installmentWithVat / vatMultiplier).toFixed(2)
      );
      const vatAmount = installmentWithVat - installmentNoVat;
      const customerLoan = installmentWithVat * months;
      const feeLoan = customerLoan - amount;
  
      return {
        InstallmentWithVat: numberFormat(installmentWithVat),
        LoanNoVat: numberFormat(loanNoVat),
        InstallmentNoVat: numberFormat(installmentNoVat),
        Vat: numberFormat(vatAmount),
        CustomerLoan: numberFormat(customerLoan),
        FeeLoan: numberFormat(feeLoan),
        Down: numberFormat(down),
      };
    };
  
    document.getElementById("irrForm").addEventListener("submit", (e) => {
      e.preventDefault();
  
      const nfAmount = parseFloat(document.getElementById("nfAmount").value);
      const installmentMonths = parseInt(
        document.getElementById("installmentMonths").value
      );
  
      const loanType = document.getElementById("loanType").value;
      const ratecustom = document.getElementById("interestRate").value;
      const down = document.getElementById("downPayment").value;
  
      // console.log(`down ${down}`);
  
      if (!loanType) {
        alert("Please select a loan type.");
        return;
      }
  
      let loanData;
      let textloan;
      if (loanType === "1" && ratecustom === "23") {
        loanData = { Name: "Loan", InRate: 23 / 12 / 100, Vat: 7 };
        textloan = "ยอดกู้ไม่รวม VAT: ";
      } else if (loanType === "2" && ratecustom === "24") {
        loanData = { Name: "P-loan", InRate: 24 / 12 / 100, Vat: 0 };
        textloan = "ยอดกู้รวม VAT: ";
      } else {
        loanData = { Name: "Custom", InRate: ratecustom / 12 / 100, Vat: 0 };
        textloan = "ยอดกู้ไม่รวม VAT: ";
      }
  
      const results = calculateNF(
        nfAmount,
        installmentMonths,
        loanData.InRate,
        loanData.Vat,
        down
      );
  
      document.getElementById("loanTypeResult").textContent = loanData.Name;
      document.getElementById("installmentWithVat").textContent =
        results.InstallmentWithVat;
      document.getElementById("loanNoVat").textContent =
        textloan + results.LoanNoVat;
      document.getElementById("installmentNoVat").textContent =
        results.InstallmentNoVat;
      document.getElementById("vat").textContent = results.Vat;
      document.getElementById("customerLoan").textContent = results.CustomerLoan;
      document.getElementById("feeLoan").textContent = results.FeeLoan;
      document.getElementById("payDown").textContent = results.Down;
  
      document.getElementById("results").style.display = "block";
    });
  
    calculatorInitialized = true;
  };

  // template calculator  loaded
document.addEventListener("DOMContentLoaded", () => {
    const calculatorTemplate = document.querySelector("#calculator-template");
    const mainContent = document.querySelector(".main-content");
  
    if (calculatorTemplate) {
      mainContent.innerHTML = "";
      mainContent.appendChild(calculatorTemplate.content.cloneNode(true));
      setupCalculator();
    }
  });