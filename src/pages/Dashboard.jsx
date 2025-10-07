import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Home from "../components/dashboard/Home";
import Boards from "../components/dashboard/Boards";
import Projects from "../components/dashboard/Projects";
import Members from "../components/dashboard/Members";
import Settings from "../components/dashboard/Settings";
import Billing from "../components/dashboard/Billing";
import Templates from "../components/dashboard/Templates";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");

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
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
    </div>
  );
}