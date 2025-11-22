"use client";
import AuthForm from "@/components/forms/AuthForm";
import { signUpWithCredentails } from "@/lib/actions/auth.action";
import { SignUpSchema } from "@/lib/validation";

export default function SignUp() {
  return (
    <AuthForm
      schema={SignUpSchema}
      defaultValues={{
        firstName: "",
        secondName: "",
        thirdName: "",
        lastName: "",
        nationalNo: "",
        dateOfBirth: "",
        gendor: "",
        address: "",
        nationality: "",
        city: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
      }}
      onSubmit={signUpWithCredentails}
      formType="SIGN_UP"
    />
  );
}
