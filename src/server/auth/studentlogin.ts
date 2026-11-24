"use server";

import { auth } from "@/lib/auth";
import { StudentLoginSchemaType } from "@/lib/types";
import { headers } from "next/headers";

const studentlogin = async ({
  password,
  studentId,
}: StudentLoginSchemaType) => {
  try {
    await auth.api.signInUsername({
      body: {
        username: studentId,
        password,
      },
      headers: await headers(),
    });

    return {
      isSuccess: true,
      message: "Login Successful",
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      message: "The login information you entered is incorrect.",
    };
  }
};

export default studentlogin;
