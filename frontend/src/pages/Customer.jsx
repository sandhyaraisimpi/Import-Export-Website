import { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import {
  Search,
  MapPin,
  Building2,
  Download,
  Plus,
  X,
} from "lucide-react";

export default function Customer() {

  /* ------------------ STATES ------------------ */

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;


  /* ------------------ DATA ------------------ */

  const customers = [
    {
      id: 1,
      name: "Global Logistics Ltd",
      location: "Hamburg, Germany",
      type: "VIP",
      lastInquiry: "2h ago",
      volume: "$2.4M",
      shipments: 12,
      leadTime: "14 Days",
      risk: "Low",
    },
    {
      id: 2,
      name: "Pacific Trading Co.",
      location: "Tokyo, Japan",
      type: "Standard",
      lastInquiry: "Dec 12",
      volume: "$1.2M",
      shipments: 8,
      leadTime: "10 Days",
      risk: "Medium",
    },
    {
      id: 3,
      name: "Atlas Import Export",
      location: "Morocco",
      type: "Active",
      lastInquiry: "Dec 10",
      volume: "$800K",
      shipments: 5,
      leadTime: "18 Days",
      risk: "Low",
    },
    {
      id: 4,
      name: "Summit Textiles",
      location: "Mumbai, India",
      type: "Standard",
      lastInquiry: "Nov 28",
      volume: "$640K",
      shipments: 6,
      leadTime: "12 Days",
      risk: "Low",
    },
    {
      id: 5,
      name: "Euro Freight",
      location: "France",
      type: "VIP",
      lastInquiry: "Nov 25",
      volume: "$3M",
      shipments: 15,
      leadTime: "9 Days",
      risk: "Low",
    },
    {
      id: 6,
      name: "Asia Cargo",
      location: "Singapore",
      type: "Active",
      lastInquiry: "Nov 22",
      volume: "$900K",
      shipments: 7,
      leadTime: "13 Days",
      risk: "Medium",
    },
  ];


  /* ------------------ PAGINATION ------------------ */

  const totalPages = Math.ceil(customers.length / customersPerPage);

  const startIndex = (currentPage - 1) * customersPerPage;
  const currentCustomers = customers.slice(
    startIndex,
    startIndex + customersPerPage
  );


  /* ------------------ FUNCTIONS ------------------ */

  const openPopup = (customer) => {
    setSelectedCustomer(customer);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };


  /* ------------------ UI ------------------ */

  return (
    <AdminLayout>

      <div className="bg-gray-50 min-h-screen">

        {/* HEADER */}
        <div className="bg-white p-5 border-b flex justify-between items-center">

          <div>

            <h1 className="text-xl font-bold">
              Customer History
            </h1>

            <p className="text-sm text-gray-500">
              Business Entities
            </p>

          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus size={18} />
            Add Customer
          </button>

        </div>


        {/* SEARCH */}
        <div className="p-5">

          <div className="relative max-w-md">

            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              className="w-full border rounded-lg py-2 pl-10"
              placeholder="Search customers..."
            />

          </div>

        </div>


        {/* CUSTOMER TABLE */}
        <div className="px-5">

          <div className="bg-white rounded-xl border overflow-hidden">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr className="text-left text-sm text-gray-600">

                  <th className="p-3">Customer</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Last Inquiry</th>

                </tr>

              </thead>

              <tbody>

                {currentCustomers.map((customer) => (

                  <tr
                    key={customer.id}
                    onClick={() => openPopup(customer)}
                    className="border-t hover:bg-blue-50 cursor-pointer"
                  >

                    <td className="p-3 font-medium">
                      {customer.name}
                    </td>

                    <td className="p-3">
                      {customer.location}
                    </td>

                    <td className="p-3">
                      {customer.type}
                    </td>

                    <td className="p-3 text-gray-500">
                      {customer.lastInquiry}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>


        {/* PAGINATION */}
        <div className="flex justify-between items-center p-5">

          <button
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded border ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Previous
          </button>


          <div className="flex gap-2">

            {[...Array(totalPages)].map((_, index) => {

              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "border hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}

          </div>


          <button
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded border ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Next
          </button>

        </div>


        {/* CUSTOMER POPUP */}
        {isPopupOpen && selectedCustomer && (

          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white w-[600px] rounded-xl shadow-lg">

              {/* HEADER */}
              <div className="flex justify-between items-center border-b p-4">

                <div className="flex items-center gap-3">

                  <div className="bg-blue-100 p-3 rounded">

                    <Building2 className="text-blue-600" />

                  </div>

                  <div>

                    <h2 className="font-bold text-lg">
                      {selectedCustomer.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {selectedCustomer.location}
                    </p>

                  </div>

                </div>


                <button onClick={closePopup}>

                  <X />

                </button>

              </div>


              {/* BODY */}
              <div className="p-5 grid grid-cols-2 gap-4">

                <Stat
                  title="Total Volume"
                  value={selectedCustomer.volume}
                />

                <Stat
                  title="Shipments"
                  value={selectedCustomer.shipments}
                />

                <Stat
                  title="Lead Time"
                  value={selectedCustomer.leadTime}
                />

                <Stat
                  title="Risk Level"
                  value={selectedCustomer.risk}
                />

              </div>


              {/* FOOTER */}
              <div className="border-t p-4 flex justify-end gap-2">

                <button className="border px-4 py-2 rounded">
                  <Download size={16} />
                </button>

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  New Inquiry
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </AdminLayout>
  );
}


/* STAT CARD */

function Stat({ title, value }) {

  return (
    <div className="border rounded-lg p-3">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="font-bold text-lg">
        {value}
      </p>

    </div>
  );
}