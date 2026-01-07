export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://tailorcraft.onrender.com/api/v1";
export const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

export const USER_ROLES = {
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
} as const;

export const BOOKING_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  DECLINED: "DECLINED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export const PAYMENT_STATUS = {
  UNPAID: "UNPAID",
  PARTIAL: "PARTIAL",
  SUCCESS: "SUCCESS",
  REFUNDED: "REFUNDED",
  PROCESSING: "PROCESSING",
  PENDING: "PENDING",
} as const;

export const DESIGN_CATEGORIES = {
  NATIVE: "NATIVE",
  CASUAL: "CASUAL",
  FORMAL: "FORMAL",
} as const;