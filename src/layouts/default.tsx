import { Navbar } from "../components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <Navbar />
      <main className="flex-grow relative z-10">{children}</main>
      <footer className="w-full flex items-center justify-center py-3">
        <span className="text-default-600">
          Bioinformatics Project Genecraft
        </span>
      </footer>
    </div>
  );
}
