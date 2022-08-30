import { toast, ToastOptions } from "react-toastify";

const defaultToastConfix: Partial<ToastOptions> = {
  pauseOnHover: true,
  draggable: true,
  position: "bottom-center",
  closeOnClick: false,
  theme: "dark",
};

export const calculateTime = (message: string) =>
  message.length * 50 > 3000 ? message.length * 50 : 3000;

export const toastSuccess = (message: string, options?: ToastOptions) => {
  toast(message, {
    ...options,
    type: "success",
    autoClose: calculateTime(message),
    ...defaultToastConfix,
  });
};

export const toastError = (message: string, options?: ToastOptions) => {
  toast(message, {
    ...options,
    type: "error",
    autoClose: calculateTime(message),
    ...defaultToastConfix,
  });
};

export const toastWarning = (message: string, options?: ToastOptions) => {
  toast(message, {
    ...options,
    type: "warning",
    autoClose: calculateTime(message),
    ...defaultToastConfix,
  });
};

export const Info = (message: string, options?: ToastOptions) => {
  toast(message, {
    ...options,
    type: "info",
    autoClose: calculateTime(message),
    ...defaultToastConfix,
  });
};
