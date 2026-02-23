import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import {
  Search,
  Plus,
  Download,
  Users,
  UserCheck,
  UserX,
  MoreVertical,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

export default function Customer() {

  const navigate = useNavigate();

  /* ---------------- STATE ---------------- */

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Global Logistics Ltd",
      email: "contact@global.com",
      company: "Global Logistics Ltd",
      country: "Germany",
      inquiries: 142,
      status: "Active",
      lastLogin: "Oct 24, 2023",
      volume: "$2.4M",
      shipments: 12,
    },
    {
      id: 2,
      name: "Pacific Trading Co.",
      email: "info@pacific.com",
      company: "Pacific Trading Co.",
      country: "Japan",
      inquiries: 89,
      status: "Active",
      lastLogin: "Oct 23, 2023",
      volume: "$1.2M",
      shipments: 8,
    },
    {
      id: 3,
      name: "Atlas Import Export",
      email: "atlas@mail.com",
      company: "Atlas Import Export",
      country: "Morocco",
      inquiries: 210,
      status: "Inactive",
      lastLogin: "Sep 12, 2023",
      volume: "$800K",
      shipments: 5,
    },
    {
      id: 4,
      name: "TransGlobal Inc.",
      email: "info@transglobal.com",
      company: "TransGlobal Inc.",
      country: "USA",
      inquiries: 95,
      status: "Active",
      lastLogin: "Oct 24, 2023",
      volume: "$1.8M",
      shipments: 7,
    },
    {
      id: 5,
      name: "EuroTrade Partners",
      email: "info@eurotrade.com",
      company: "EuroTrade Partners",
      country: "France",
      inquiries: 178,
      status: "Active",
      lastLogin: "Oct 22, 2023",
      volume: "$3.1M",
      shipments: 15,
    },
    {
      id: 6,
      name: "Sahara Exports",
      email: "info@saharaexports.com",
      company: "Sahara Exports",
      country: "Morocco",
      inquiries: 120,
      status: "Inactive",
      lastLogin: "Sep 30, 2023",
      volume: "$950K",
      shipments: 6,
    }
  ]);

  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 5;

  /* ---------------- FILTER LOGIC ---------------- */

  const countries = ["All", ...new Set(customers.map(c => c.country))];

  const filteredCustomers = useMemo(() => {

    return customers.filter(customer => {

      const searchMatch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.company.toLowerCase().includes(search.toLowerCase());

      const countryMatch =
        countryFilter === "All" || customer.country === countryFilter;

      const statusMatch =
        statusFilter === "All" || customer.status === statusFilter;

      return searchMatch && countryMatch && statusMatch;

    });

  }, [customers, search, countryFilter, statusFilter]);

  /* ---------------- PAGINATION ---------------- */

  const totalPages = Math.ceil(filteredCustomers.length / perPage);

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  /* ---------------- STATS ---------------- */

  const totalCustomers = customers.length;

  const activeCustomers =
    customers.filter(c => c.status === "Active").length;

  const inactiveCustomers =
    customers.filter(c => c.status === "Inactive").length;

  /* ---------------- FUNCTIONS ---------------- */

  const openPopup = (customer) => {

    setSelectedCustomer(customer);

    setPopupOpen(true);

  };

  const deleteCustomer = (id) => {

    if (!window.confirm("Delete customer?")) return;

    setCustomers(prev => prev.filter(c => c.id !== id));

  };

  const editCustomer = (customer) => {

    const newName = prompt("Enter new name", customer.name);

    if (!newName) return;

    setCustomers(prev =>
      prev.map(c =>
        c.id === customer.id
          ? { ...c, name: newName }
          : c
      )
    );

  };

  /* ---------------- UI ---------------- */

  return (

    <AdminLayout>



        {/* HEADER */}

        <div className="flex justify-between mb-6">

          <div>
            <h1 className="text-2xl font-bold">
              Customer Management
            </h1>
            <p className="text-gray-500">
              Manage global buyers
            </p>
          </div>
          <div className="flex gap-2">
            <button className="border px-4 py-2 rounded-lg flex gap-2">
              <Download size={16}/>
              Export
            </button>
            {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2">
              <Plus size={16}/>
              View Customers
            </button> */}

          </div>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <Stat title="Total Customers" value={totalCustomers}/>

          <Stat title="Active Customers" value={activeCustomers}/>

          <Stat title="Inactive Customers" value={inactiveCustomers}/>

        </div>

        {/* FILTERS */}

        <div className="bg-white border rounded-lg p-4 mb-4 flex gap-3 flex-wrap">

          <div className="relative">

            <Search className="absolute left-3 top-3 text-gray-400" size={18}/>

            <input
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder="Search customers..."
              className="border pl-10 pr-4 py-2 rounded-lg"
            />

          </div>

          <select
            value={countryFilter}
            onChange={(e)=>setCountryFilter(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >

            {countries.map(c => (
              <option key={c}>{c}</option>
            ))}

          </select>

          <select
            value={statusFilter}
            onChange={(e)=>setStatusFilter(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >

            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>

          </select>

        </div>

        {/* TABLE */}

        <div className="bg-white border rounded-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="p-3 text-left">Customer</th>

                <th className="p-3 text-left">Company</th>

                <th className="p-3 text-center">Country</th>

                <th className="p-3 text-center">Inquiries</th>

                <th className="p-3 text-center">Status</th>

                <th className="p-3 text-center">Last Login</th>

                <th className="p-3 text-center">Action</th>

              </tr>

            </thead>

            <tbody>

              {paginatedCustomers.map(customer => (

                <tr key={customer.id} className="border-t hover:bg-gray-50">

                  <td
                    className="p-3 cursor-pointer"
                    onClick={()=>openPopup(customer)}
                  >

                    <div className="font-medium">
                      {customer.name}
                    </div>

                    <div className="text-sm text-gray-500">
                      {customer.email}
                    </div>

                  </td>

                  <td className="p-3">
                    {customer.company}
                  </td>

                  <td className="p-3 text-center">
                    {customer.country}
                  </td>

                  <td className="p-3 text-center">
                    {customer.inquiries}
                  </td>

                  <td className="p-3 text-center">

                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}>

                      {customer.status}

                    </span>

                  </td>

                  <td className="p-3 text-center">
                    {customer.lastLogin}
                  </td>

                  <td className="p-3 text-center relative">

                    <button
                      onClick={()=>setDropdownOpen(
                        dropdownOpen === customer.id ? null : customer.id
                      )}
                    >

                      <MoreVertical size={18}/>

                    </button>

                    {dropdownOpen === customer.id && (

                      <div className="absolute right-10 bg-white border rounded shadow">
                        <button
  onClick={() => navigate(`/customers/${customer.id}`)}
  className="flex gap-2 p-2 hover:bg-gray-100 w-full"
  >
    <Users size={16}/>
    View
  </button>
                        <button
                          onClick={()=>editCustomer(customer)}
                          className="flex gap-2 p-2 hover:bg-gray-100 w-full"
                        >

                          <Pencil size={16}/>

                          Edit

                        </button>

                        <button
                          onClick={()=>deleteCustomer(customer.id)}
                          className="flex gap-2 p-2 hover:bg-gray-100 text-red-600 w-full"
                        >

                          <Trash2 size={16}/>

                          Delete

                        </button>

                      </div>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* PAGINATION CENTER */}

        <div className="flex justify-center mt-6 gap-2">

          {[...Array(totalPages)].map((_, i) => (

            <button
              key={i}
              onClick={()=>setCurrentPage(i+1)}
              className={`px-3 py-1 rounded border ${
                currentPage === i+1
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
            >
              {i+1}
            </button>
          ))}
        </div>
      {/* POPUP */}

      {popupOpen && selectedCustomer && (

        <Popup
          customer={selectedCustomer}
          close={()=>setPopupOpen(false)}
        />

      )}

    </AdminLayout>

  );

}


/* STAT CARD */

function Stat({title,value}){

  return(

    <div className="bg-white border rounded-lg p-4">

      <div className="text-gray-500 text-sm">
        {title}
      </div>

      <div className="text-xl font-bold">
        {value}
      </div>

    </div>

  );

}


/* POPUP */

function Popup({customer,close}){

  return(

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-6 rounded-lg w-[400px]">

        <div className="flex justify-between mb-4">

          <h2 className="font-bold">
            {customer.name}
          </h2>

          <button onClick={close}>
            <X/>
          </button>

        </div>

        <div className="space-y-2 text-sm">

          <div>Email: {customer.email}</div>

          <div>Company: {customer.company}</div>

          <div>Country: {customer.country}</div>

          <div>Volume: {customer.volume}</div>

          <div>Shipments: {customer.shipments}</div>

        </div>

      </div>

    </div>

  );

}