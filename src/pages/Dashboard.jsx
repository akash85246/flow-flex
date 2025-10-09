import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Home from "../components/dashboard/Home";
import Boards from "../components/dashboard/Boards";
import Projects from "../components/dashboard/Projects";
import Members from "../components/dashboard/Members";
import Settings from "../components/dashboard/Settings";
import Billing from "../components/dashboard/Billing";
import Templates from "../components/dashboard/Templates";
import Organizations from "../components/organization/Organizations";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const activeTab = useSelector((state) => state.organization.activeTab);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "boards":
        return <Boards />;
    case "templates":
        return <Templates/>;
      case "projects":
        return <Projects />;
      case "members":
        return <Members />;
      case "settings":
        return <Settings />;
      case "billing":
        return <Billing />;
      case "organizations":
        return <Organizations />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} />

      {/* Main content */}
      <section  className="flex-1  overflow-y-auto max-w-9xl mx-auto">{renderContent()}</section>
    </div>
  );
}