import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/user/sidebar";
import Header from "../../components/user/Header";

export default function InquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

   
  const inquiries = [
    {
      id: "1",
      product: "Industrial Drill Machine",
      quantity: 10,
      message: "Need bulk order pricing details.",
      date: "20 Feb 2026",
      status: "New",
      image: "https://images.unsplash.com/photo-1581092918484-8313f22a0fbb?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: "2",
      product: "Steel Pipes",
      quantity: 200,
      message: "Looking for export quality pipes.",
      date: "18 Feb 2026",
      status: "In Progress",
      image: "https://images.unsplash.com/photo-1581093458791-9d2f1a9e6b8b?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: "3",
      product: "Safety Helmets",
      quantity: 150,
      message: "Need ISI certified helmets.",
      date: "15 Feb 2026",
      status: "Contacted",
      image: "https://images.unsplash.com/photo-1581091012184-5c59d8f3c1e4?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: "4",
      product: "Hydraulic Pump",
      quantity: 5,
      message: "Urgent requirement for export.",
      date: "10 Feb 2026",
      status: "Closed",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: "5",
      product: "Packaging Boxes",
      quantity: 1000,
      message: "Need bulk pricing.",
      date: "08 Feb 2026",
      status: "New",
      image: "https://images.unsplash.com/photo-1600891963935-9eacb75f04c6?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: "6",
      product: "Aluminium Sheets",
      quantity: 300,
      message: "Need 2mm thickness sheets.",
      date: "05 Feb 2026",
      status: "In Progress",
      image: "https://images.unsplash.com/photo-1581091870627-3d5c8d1f6b29?auto=format&fit=crop&w=600&q=60",
    },
  ];

  const inquiry = inquiries.find((item) => item.id === id);

  const getStatusStyle = (status) => {
    switch (status) {
      case "New":
        return "bg-yellow-100 text-yellow-600";
      case "Contacted":
        return "bg-blue-100 text-blue-600";
      case "In Progress":
        return "bg-purple-100 text-purple-600";
      case "Closed":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (!inquiry) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <div className="p-8">
            <h2 className="text-xl font-bold">Inquiry Not Found</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Header />

        <div className="p-8 min-h-screen bg-gray-50">
          <button
            onClick={() => navigate("/user/inquiries")}
            className="mb-6 px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
          >
            ← Back
          </button>

          <div className="bg-white shadow-2xl rounded-3xl p-8 grid md:grid-cols-2 gap-10">

            {/* Image */}
            <div>
              <img
                src={inquiry.image}
                alt={inquiry.product}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-5">

              <h2 className="text-3xl font-bold">
                {inquiry.product}
              </h2>

              <div>
                <p className="font-semibold">Quantity:</p>
                <p>{inquiry.quantity}</p>
              </div>

              <div>
                <p className="font-semibold">Message Sent:</p>
                <p className="text-gray-600">
                  {inquiry.message}
                </p>
              </div>

              <div>
                <p className="font-semibold">Inquiry Date:</p>
                <p>{inquiry.date}</p>
              </div>

              <div>
                <p className="font-semibold mb-2">Current Status:</p>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(inquiry.status)}`}
                >
                  {inquiry.status}
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}