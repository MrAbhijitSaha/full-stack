"use server";

import { auth } from "@/lib/auth";
import { StudentSignupSchemaType } from "@/lib/types";
import { headers } from "next/headers";

const studentsignup = async ({
  studentName,
  email,
  password,
  studentId,
}: StudentSignupSchemaType) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name: studentName,
        email: email,
        username: studentId,
        password: password,
      },
      headers: await headers(),
    });
    return {
      isSuccess: true,
      message: "signup Successful",
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      message: "The signup information you entered is incorrect.",
    };
  }
};

export default studentsignup;
