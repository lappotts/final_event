import React from "react";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="p-10 flex flex-col items-center justify-center align middle min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome to The Event Center!!</h1>

      <RegisterForm />
    </div>
  );
}
