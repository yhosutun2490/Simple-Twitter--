import Swal from "sweetalert2";

//成功訊息的樣式
export const ToastSuccess = Swal.mixin({
  color: "#000000",
  icon: "success",
  iconColor: "#82C43C",
  toast: "top",
  showConfirmButton: false,
  timer: 1000,
  position: "top-right",
})

// 失敗訊息的樣式
export const ToastFail = Swal.mixin({
  color: "#000000",
  icon: "error",
  iconColor: "#FC5A5A",
  toast: "true",
  width: "30%",
  showConfirmButton: false,
  timer: 1000,
  position: "top-right",
})