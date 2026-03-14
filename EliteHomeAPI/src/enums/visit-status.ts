export const visitStatus = {
  INTEREST: "INTEREST",
  CONFIRMED: "CONFIRMED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type VisitStatus = (typeof visitStatus)[keyof typeof visitStatus];
