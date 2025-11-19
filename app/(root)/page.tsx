import Hero from "@/components/Hero";
import About from "./(pages)/about/page";
import { api } from "@/lib/api";

export default function Home() {
  async function getPersons() {
    const res = await api.persons.getById(
      "68dfdf1e-6ec4-4260-016c-08de02c69919"
    );
    console.log(res);
  }

  getPersons();

  return (
    <main className="bg-background">
      <Hero />
      <About />
    </main>
  );
}
