import z from "zod";

export const loginFormSchema = z.object({
  studentId: z
    .string()
    .min(4, {
      error: "The Student Id  isn't Valid",
    })
    .max(32, {
      error: "The Student Id  isn't Valid",
    }),

  password: z
    .string()
    .min(4, {
      error: "The password  is incorrect.",
    })
    .max(128, {
      error: "The password  is incorrect.",
    }),
});

export const signUpFormSchema = z.object({
  studentName: z
    .string()
    .min(3, { error: "Please enter a valid name" })
    .max(32, { error: "Please enter a valid name" }),

  studentId: z
    .string()
    .min(4, {
      error: "The Student Id  isn't Valid",
    })
    .max(32, {
      error: "The Student Id  isn't Valid",
    }),

  email: z.email({ error: "Invalid Email Id" }),

  password: z
    .string()
    .min(4, {
      error: "The password  is incorrect.",
    })
    .max(128, {
      error: "The password  is incorrect.",
    }),
});
