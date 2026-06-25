import Sidebar from "./sidebar";
import Header from "./header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="flex flex-1 flex-col min-h-screen">

        <Header />

        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}