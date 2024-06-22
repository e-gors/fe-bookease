import { toast } from "react-toastify";

export default function ToastNotification(status, message, options) {
  if (status === "success") {
    return toast.success(message, options);
  }
  return toast.error(message, options);
}
