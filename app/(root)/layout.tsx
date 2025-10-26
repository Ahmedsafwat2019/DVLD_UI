import Footer from "@/components/Footer";
import Navbar from "@/components/navigation/Navbar";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="bg-background ">
      <Navbar />

      {children}

      <Footer />
    </main>
  );
};

export default RootLayout;
