/**
 * Enhanced toast utility that wraps sonner's toast
 * and plays a notification sound on success/error/info toasts.
 */
import { toast as sonnerToast } from "sonner";
import { playNotificationSound } from "./notification-sound";

type ToastOptions = Parameters<typeof sonnerToast>[1];

/**
 * Wraps sonner toast with notification sound.
 * The sound plays for success, error, and info toasts.
 */
export const toastWithSound = {
  success: (message: string, options?: ToastOptions) => {
    playNotificationSound();
    return sonnerToast.success(message, options);
  },
  error: (message: string, options?: ToastOptions) => {
    playNotificationSound();
    return sonnerToast.error(message, options);
  },
  info: (message: string, options?: ToastOptions) => {
    playNotificationSound();
    return sonnerToast.info(message, options);
  },
  warning: (message: string, options?: ToastOptions) => {
    playNotificationSound();
    return sonnerToast.warning(message, options);
  },
  // Pass-through for plain toast (no sound)
  message: (message: string, options?: ToastOptions) => {
    return sonnerToast(message, options);
  },
};
