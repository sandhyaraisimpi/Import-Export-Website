import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between">
      <h2 className="font-semibold text-gray-700">
        Import Export Admin
      </h2>

      <button
        onClick={logout}
        className="text-red-600 font-medium"
      >
        Logout
      </button>
    </header>
  );
}
