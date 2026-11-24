import { ReactNode } from "react";
import z from "zod";
import { loginFormSchema, signUpFormSchema } from "./zodschema";

export type LayoutProps = Readonly<{
  children: ReactNode;
}>;

export type StudentLoginSchemaType = z.infer<typeof loginFormSchema>;

export type StudentSignupSchemaType = z.infer<typeof signUpFormSchema>;
