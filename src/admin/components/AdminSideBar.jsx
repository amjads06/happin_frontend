import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();


  const menuItems = [
    { name: "Dashboard", path: "/admin-home" },
    { name: "Users", path: "/admin-users" },
    { name: "Events", path: "/admin-events" },
    { name: "Bookings", path: "/admin-bookings" },
    { name: "Payments", path: "/admin-payments" },
    { name: "Settings", path: "/admin-settings" },
  ];

  return (
    <aside className="w-64 bg-[#F8F9FC] border-r border-gray-200 p-6 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Happin Admin</h2>

      <ul className="space-y-3">
        {menuItems.map((item, i) => (
          <Link key={i} to={item.path}>
            <li
              className={`p-3 rounded-lg cursor-pointer ${
                location.pathname === item.path
                  ? "bg-purple-100 text-purple-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
}
