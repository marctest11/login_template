function calculateEffectiveInstallment(loanAmount, annualInterestRate, totalMonths) {
    // คำนวณอัตราดอกเบี้ยต่อเดือน
    const monthlyInterestRate = annualInterestRate / 100 / 12;

    // คำนวณค่างวดตามสูตร
    const installment = loanAmount * monthlyInterestRate /
        (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));

    return installment;
}

// ตัวอย่างการใช้งาน
const loanAmount = 45000; // ยอดจัดไฟแนนซ์ (บาท)
const annualInterestRate = 23; // อัตราดอกเบี้ยต่อปี (%)
const totalMonths = 36; // ระยะเวลาผ่อนชำระ (เดือน)

const installment = calculateEffectiveInstallment(loanAmount, annualInterestRate, totalMonths);
console.log(`ค่างวดต่อเดือน: ${installment.toFixed(2)} บาท`);


let loan= "100"

loan = parseFloat(loan)
 
console.log(f_loan)