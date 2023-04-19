function formvalidate() {
    var frm = document.forms['dangky'];
    //điều kiện tên tài khoản
    if (frm.tentk.value.length == 0) {
        alert("Bạn chưa nhập tên đăng nhập.\nVui lòng nhập lại!");
        frm.tentk.focus();
        return false;
    }
    var tentkReg = /^([a-zA-Z][a-zA-Z0-9_\.\-]{8,30})/;
    if (tentkReg.test(frm.tentk.value) == false) {
        alert("Tên tài khoản phải bắt dầu bằng chữ cái và có ít nhất 8 ký tự.\nVui lòng nhập lại!");
        frm.tentk.focus();
        return false;
    }
    //điều kiện mật khẩu 
    if (frm.password.value.length == 0) {
        alert("Bạn chưa nhập password.\nVui lòng nhập lại!");
        frm.password.focus();
        return false;
    }
    var passwordReg = /^([a-zA-Z0-9_\.\-]{8,})/;
    if (passwordReg.test(frm.password.value) == false) {
        alert("Password phải có 8 ký tự.\nVui lòng nhập lại!");
        frm.password.focus();
        return false;
    }
    //điều kiện nhập lại mật khẩu (so sánh vs password)
    if (frm.re_password.value.length == 0) {
        alert("Bạn chưa nhập lại password.\nVui lòng nhập lại!");
        frm.re_password.focus();
        return false;
    }
    var re_passwordReg = /^([a-zA-Z0-9_\.\-]{8,})/;
    if (re_passwordReg.test(frm.re_password.value) == false) {
        alert("Password phải có 8 ký tự.\nVui lòng nhập lại!");
        frm.re_password.focus();
        return false;
    }
    if (frm.re_password.value != frm.password.value) {
        alert("Mật khẩu nhập lại sai.\nVui lòng nhập lại!");
        frm.re_password.focus();
        return false;
    }
    //điều kiện họ tên
    if (frm.hoten.value.length == 0) {
        alert("Bạn chưa nhập họ tên.\nVui lòng nhập lại!");
        frm.hoten.focus();
        return false;
    }
    var hotenReg = /^([a-zA-Z])/;
    if (hotenReg.test(frm.hoten.value) == false) {
        alert("Họ tên không hợp lệ.\nVui lòng nhập lại!");
        frm.hoten.focus();
        return false;
    }
    //điều kiện email
    if (frm.email.value.length == 0) {
        alert("Bạn chưa nhập email.\nVui lòng nhập lại!");
        frm.email.focus();
        return false;
    }
    var emailReg = /^([a-zA-Z0-9_\.\-])+\@([a-zA-Z0-9\-])+\.([a-zA-Z]{2,4})$/;
    if (emailReg.test(frm.email.value) == false) {
        alert("Email không hợp lệ.\nVui lòng nhập lại!\nExample@gmail.com");
        frm.email.focus();
        return false;
    }
    //điều kiện số điện thoại
    if (frm.sdt.value.length == 0) {
        alert("Bạn chưa nhập số điện thoại.\nVui lòng nhập lại!");
        frm.sdt.focus();
        return false;
    }
    var sdtReg = /^[0][0-9]{10,12}$/;
    if (sdtReg.test(frm.sdt.value) == false) {
        alert("Số điện thoại không hợp lệ.\nVui lòng nhập lại!");
        frm.sdt.focus();
        return false;
    }
    //điều kiện địa chỉ
    if (frm.dchi.value.length == 0) {
        alert("Bạn chưa nhập địa chỉ.\nVui lòng nhập lại!");
        frm.dchi.focus();
        return false;
    }

    userHandler.register(
        frm.tentk.value,
        frm.email.value,
        frm.password.value,
        frm.hoten.value,
        frm.sdt.value,
        frm.Ngsinh,
        frm.dchi.value
    )
    window.location.href = "./DangNhap.html"
    return false
}
