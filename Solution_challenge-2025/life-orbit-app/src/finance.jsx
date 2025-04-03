import Header from "./header";
import Footer from "./footer";

function Finance() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold">Finance Page</h1>
        <p className="text-gray-700">Welcome to the Finance category.</p>

        {/* Courses */}
        <div className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Available Courses</h2>

          {/* ATM Course */}
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="text-gray-700 font-medium">ATM</p>
            <p className="text-gray-600 text-sm mt-2">
              Learn how to use Automated Teller Machines (ATMs) safely, withdraw and deposit money, 
              check balances, and understand transaction limits.
            </p>
          </div>

          {/* Cheque Writing Course */}
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="text-gray-700 font-medium">Cheque Writing</p>
            <p className="text-gray-600 text-sm mt-2">
              Understand how to write a cheque properly, avoid mistakes, endorse cheques, and learn about clearing processes in banks.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Finance;
