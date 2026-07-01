import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {

  return (
    <div>

      <Sidebar />

      <div
        style={{
          marginLeft: "250px",
        }}
      >

        <Navbar />

        <div className="p-4">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default Layout;