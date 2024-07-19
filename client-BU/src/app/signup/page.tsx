"use client";

import { Form } from "@/components/form/CreateUserForm";
import { Step } from "./steps/Step";

export default function Signup() {
  return (
    <>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-4xl text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-700 from-sky-400">
          Create New Account
        </span>
      </h1>
      <Form>
        <Step />
      </Form>
    </>
  );
}
