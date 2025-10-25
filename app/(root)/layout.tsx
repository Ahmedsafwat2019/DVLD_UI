import Navbar from "@/components/navigation/Navbar";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="bg-gray-50 ">
      <Navbar />

      {children}
    </main>
  );
};

export default RootLayout;
