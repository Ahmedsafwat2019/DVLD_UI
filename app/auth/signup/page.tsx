import Link from "next/link";
import { Metadata } from "next";
import SignupForm from "@/components/Auth/SignUp/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign Up Page for Startup Nextjs Template",
  // other metadata
};

const SignupPage = async () => {
  /*
  const response = await fetch("http://localhost:5240/api/Cities/Get")
  const Json = await response.json();
  */
  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <SignupForm></SignupForm>
      </section>
    </>
  );
};
export default SignupPage;
