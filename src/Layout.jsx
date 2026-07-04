import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [sidebarOpen, setSidebarOpen] = useState(
    window.innerWidth >= 768
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);

      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isMobile={isMobile}
      />

      {/* Overlay */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,.4)",
            zIndex: 1040,
          }}
        />
      )}

      <div
        style={{
          marginLeft: isMobile
            ? "0"
            : sidebarOpen
            ? "250px"
            : "80px",

          transition: "all .3s ease",
        }}
      >
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isMobile={isMobile}
        />

        <div className="p-4">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default Layout;