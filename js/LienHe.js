function checkEmail() {
    var email = document.getElementById("email").value;
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      alert("Đăng ký thành công");
    } else {
      alert("Email không hợp lệ");
    }
  }

  function validateForm() {
    var name = document.forms["myform"]["name"].value;
    var email = document.forms["myform"]["email"].value;

    if (name == "" || email == "") {
      alert("vui lòng điền đầy đủ thông tin.");
      return false;
    }

    var email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email_pattern.test(email)) {
      alert("Địa chỉ email không hợp lệ.");
      return false;
    }
    alert("Đã gửi liên hệ!");
    return true;
  }