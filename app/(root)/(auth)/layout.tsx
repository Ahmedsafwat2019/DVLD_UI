import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      {children}
    </main>
  );
};

export default AuthLayout;
