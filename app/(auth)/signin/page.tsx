"use client";

import AuthForm from "@/components/forms/AuthForm";
import { signInWithCredentails } from "@/lib/actions/auth.action";
import { signInSchema } from "@/lib/validation";

export default function SignIn() {
  return (
    <AuthForm
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInWithCredentails}
      formType="SIGN_IN"
    />
  );
}
