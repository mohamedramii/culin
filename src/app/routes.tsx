import { createBrowserRouter, Outlet } from "react-router";
import { CulinNavbar } from "./components/CulinNavbar";
import { CustomCursor } from "./components/CustomCursor";
import { Home } from "./pages/Home";
import { PortfolioPage } from "./pages/PortfolioPage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ProcessPage } from "./pages/ProcessPage";
import { ContactPage } from "./pages/ContactPage";

function Root() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ scrollBehavior: "smooth", cursor: "none" }}
    >
      <CustomCursor />
      <CulinNavbar />
      <Outlet />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      // { path: "portfolio", Component: PortfolioPage },
      // { path: "about", Component: AboutPage },
      // { path: "services", Component: ServicesPage },
      // { path: "process", Component: ProcessPage },
      // { path: "contact", Component: ContactPage },
    ],
  },
]);
