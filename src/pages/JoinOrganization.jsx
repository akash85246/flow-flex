import JoinOrganizationImage from "../assets/organization/illustrations/joinOrganization.svg";
export default function JoinOrganization() {
  return (
    <section className="flex-1 grid grid-cols-1 md:grid-cols-2">
      <div className="bg-tertiary text-white flex-col p-16 pb-40 md:p-8 lg:p-12 relative">
        <div className="flex flex-col items-center justify-center max-w-3xl m-auto sticky top-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium md:mb-6 text-center">
            Join Organization
          </h1>

          <img
            src={JoinOrganizationImage}
            alt="Join Organization"
            className="max-w-xs md:max-w-sm lg:max-w-md absolute md:relative -bottom-80 md:bottom-0"
          />

          <p className="text-lg md:text-xl lg:text-2xl font-light mt-4 text-center">
            Join an existing organization using an invite link to start
            collaborating with your team.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-centre h-full p-4 pt-40 pb-10 md:py-8 lg:py-10  ">
      
      </div>
    </section>
  );
}
