import Header from "./header";
import Footer from "./footer";

function Health() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold">Health & Wellness Page</h1>
        <p className="text-gray-700">Welcome to the Health & Wellness category.</p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Health;
