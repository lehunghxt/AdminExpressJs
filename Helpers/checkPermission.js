class CheckUserPerMission{
    constructor(listRole){
        this._listRole = listRole;
    }
    //#region QUẢN LÝ THÀNH VIÊN
        Xemdanhsachthanhvien = () => {
            return this._listRole.includes('Xemdanhsachthanhvien');
        }
        Themthanhvien = () => {
            return this._listRole.includes('Themthanhvien');
        }
        Suathanhvien = () =>{
            return this._listRole.includes('Suathanhvien');
        }
        Xoathanhvien = () =>{
            return this._listRole.includes('Xoathanhvien');
        }
    //#endregion

    //#region QUẢN LÝ BÀI VIẾT
        Xemdanhsachbaiviet = () =>{
            return this._listRole.includes('Xemdanhsachbaiviet');
        }
        Thembaiviet = () =>{
            return this._listRole.includes('Thembaiviet');
        }
        Suabaiviet = () =>{
            return this._listRole.includes('Suabaiviet');
        }
        Xoabaiviet = () =>{
            return this._listRole.includes('Xoabaiviet');
        }
        Xoanhieubaiviet = () =>{
            return this._listRole.includes('Xoanhieubaiviet');
        }
    //#endregion
    
    //#region QUẢN LÝ LOẠI TÀI KHOẢN
        Xemdanhsachloaitaikhoan = () =>{
            return this._listRole.includes('Xemdanhsachloaitaikhoan');
        }
        Themloaitaikhoan = () =>{
            return this._listRole.includes('Themloaitaikhoan');
        }
        Sualoaitaikhoan = () =>{
            return this._listRole.includes('Sualoaitaikhoan');
        }
        Xoaloaitaikhoan = () =>{
            return this._listRole.includes('Xoaloaitaikhoan');
        }
    //#endregion
    
    //#region Quản lý quyền
        //Xem danh sách quyền
        Xemdanhsachquyen = () => {
            return this._listRole.includes('Xemdanhsachquyen');
        }
        //Thêm quyền
        Themquyen = () => {
            return this._listRole.includes('Themquyen');
        }
        //Sửa quyền
        Suaquyen = () => {
            return this._listRole.includes('Suaquyen');
        }
        //Xóa quyền
        Xoaquyen = () => {
            return this._listRole.includes('Xoaquyen');
        }
    //#endregion

    //#region Quản lý nhóm quyền
        //Xem danh sách nhóm quyền
        Xemdanhsachnhomquyen = () => {
            return this._listRole.includes('Xemdanhsachnhomquyen');
        }
        //Cập nhập nhóm quyền
        Capnhapnhomquyen = () => {
            return this._listRole.includes('Capnhapnhomquyen');
        }
    //#endregion
}
module.exports = CheckUserPerMission;