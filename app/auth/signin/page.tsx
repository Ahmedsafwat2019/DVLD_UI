import Link from "next/link";
import SignInForm from "@/components/Auth/Components/SignIn/SignInForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign In Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign In Page for Startup Nextjs Template",
  // other metadata
};
const SigninPage = () => {
  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <SignInForm></SignInForm>
      </section>
    </>
  );
};
export default SigninPage;
