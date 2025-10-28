import Hero from "@/components/Hero";
import About from "./(pages)/about/page";

export default function Home() {
  return (
    <main className="bg-background">
      <Hero />
      <About />
    </main>
  );
}
