import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        style={{
          marginLeft:
            window.innerWidth > 768
              ? sidebarOpen
                ? "250px"
                : "80px"
              : "0",
          transition: "0.3s",
        }}
      >
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;