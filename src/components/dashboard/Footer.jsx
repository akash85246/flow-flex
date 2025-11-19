export default function Footer() {
  return (
    <>
      <footer className="text-right text-sm md:text-lg text-primary p-2 md:p-5 -z-[10]">
       {new Date().getFullYear()} Flow Flex. All rights reserved.
      </footer>

      {/* temp remove in end */}
      <div className="bg-primary text-white p-4">Primary BG</div>
      <div className="bg-secondary text-white p-4">Secondary BG</div>
      <div className="bg-tertiary text-white p-4">Tertiary BG</div>
      <div className="bg-fourth text-white p-4">Fourth BG</div>
    </>
  );
}
