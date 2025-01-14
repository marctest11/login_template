export const checkLogin = (event) => {
  event.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ
  const eid = document.getElementById("eid").value;
  const password = document.getElementById("password").value;

  if (eid === "admin" && password === "789admin") {
    // แสดง SweetAlert
    Swal.fire({
      icon: "success",
      title: "Login สำเร็จ!",
      text: "กรุณารอสักครู่...",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      window.location.href = "main/index.html";
    });
  } else {
    // alert('Invalid Eid or Password'); // แจ้งเตือนถ้าข้อมูลไม่ถูกต้อง
    Swal.fire({
      icon: "error",
      title: "Eid หรือ รหัสผ่านไม่ถูกต้อง",
      text: "โปรดเช็ค Eid หรือ รหัสผ่าน อีกครั้ง",
      confirmButtonText: "OK",
    });
  }
};
