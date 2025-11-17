import NewLocalLicenceForm from "@/components/forms/NewLocalLicenceForm";
// import NewLocalLicenceForm from "@/components/Licence/NewLocalLicenceForm";

const NewLocalLicencePage = () => {
  return (
    <>
      <section className="pb-12 pt-20 md:pb-16 lg:pb-20 lg:pt-24 flex justify-center">
        <div className="container flex justify-center items-center lg:min-w-3xl">
          <NewLocalLicenceForm />
        </div>
      </section>
    </>
  );
};
export default NewLocalLicencePage;
