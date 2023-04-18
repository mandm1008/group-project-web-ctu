function formvalidate() {
    var frm = document.forms['dangnhap'];
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
    if (frm.password.value.length < 8) {
        alert("Password phải có 8 ký tự.\nVui lòng nhập lại!");
        frm.password.focus();
        return false;
    }
    return true;
}