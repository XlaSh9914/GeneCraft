import { Navbar } from "../components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col relative">
      {/* Full-Height Animated Background */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-50 to-purple-50 animate-gradient" />
      </div>
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
