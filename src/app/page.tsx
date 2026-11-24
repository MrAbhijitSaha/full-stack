import Header from "@/components/Layout/Header";
import LoginForm from "@/components/UiSections/LoginForm";
import SignupForm from "@/components/UiSections/SignupForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Starter Fullstack",
  description: "Production grade Fullstack Next.js starter template",
};

const page = () => {
  return (
    <>
      <Header />

      <main className="grid h-dvh place-items-center">
        <SignupForm />

        <LoginForm />
      </main>
    </>
  );
};

export default page;
