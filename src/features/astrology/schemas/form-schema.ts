import * as z from "zod/v4";

export const step1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  gender: z.string().min(1, "Please select your gender"),
});

export const step2Schema = z.object({
  day: z
    .string()
    .min(1, "Day is required")
    .refine(
      (val) => parseInt(val) >= 1 && parseInt(val) <= 31,
      "Day must be between 1 and 31"
    ),
  month: z
    .string()
    .min(1, "Month is required")
    .refine(
      (val) => parseInt(val) >= 1 && parseInt(val) <= 12,
      "Month must be between 1 and 12"
    ),
  year: z
    .string()
    .min(1, "Year is required")
    .refine(
      (val) => parseInt(val) >= 1900 && parseInt(val) <= 2030,
      "Year must be between 1900 and 2030"
    ),
  hour: z
    .string()
    .min(1, "Hour is required")
    .refine(
      (val) => parseInt(val) >= 0 && parseInt(val) <= 23,
      "Hour must be between 0 and 23"
    ),
  min: z
    .string()
    .min(1, "Minutes are required")
    .refine(
      (val) => parseInt(val) >= 0 && parseInt(val) <= 59,
      "Minutes must be between 0 and 59"
    ),
  place: z.string().min(3, "Place must be at least 3 characters"),
});

export const formSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
});

export type FormData = z.infer<typeof formSchema>;
