import { LuLogOut } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();
const navigate=useNavigate()

  const handleLogout = () => {
    sessionStorage.setItem("token", "")
    sessionStorage.setItem("existingUser", "")
    navigate("/")
    window.location.reload();

  }
  const menuItems = [
    { name: "Dashboard", path: "/admin-home" },
    { name: "Users", path: "/admin-users" },
    { name: "Events", path: "/admin-events" },
    { name: "Bookings", path: "/admin-bookings" },
    // { name: "Settings", path: "/admin-settings" },
  ];

  return (
    <aside className="w-64 bg-[#F8F9FC] border-r border-gray-200 p-6 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Happin Admin</h2>

      <ul className="space-y-3">
        {menuItems.map((item, i) => (
          <Link key={i} to={item.path}>
            <li
              className={`p-3 rounded-lg cursor-pointer ${location.pathname === item.path
                  ? "bg-purple-100 text-purple-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              {item.name}
            </li>
          </Link>
        ))}
        <li onClick={handleLogout} className={`flex p-3 rounded-lg cursor-pointer text-purple-700 font-semibold`}>
          <LuLogOut className="mt-1.5" />    Logout
        </li>
      </ul>
    </aside>
  );
}
