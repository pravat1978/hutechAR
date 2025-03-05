import React, { useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import Header from "./dashboard/Header";
import SummaryCards from "./dashboard/SummaryCards";
import RecentInvoices from "./dashboard/RecentInvoices";
import CashflowChart from "./dashboard/CashflowChart";
import CollectionActivity from "./dashboard/CollectionActivity";
import CreditAlerts from "./dashboard/CreditAlerts";
import AccountsReceivableModule from "./accounts-receivable/AccountsReceivableModule";

const Home = () => {
  const [activePath, setActivePath] = useState("/");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleNavigate = (path: string) => {
    setActivePath(path);
    setShowMobileMenu(false);
  };

  const handleViewInvoice = (id: string) => {
    console.log(`View invoice ${id}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - hidden on mobile, shown on larger screens */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${showMobileMenu ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <Sidebar activePath={activePath} onNavigate={handleNavigate} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onMenuToggle={() => setShowMobileMenu(!showMobileMenu)}
          onSearch={(query) => console.log(`Search: ${query}`)}
          onNotificationsClick={() => console.log("Notifications clicked")}
          onProfileClick={() => console.log("Profile clicked")}
          onSettingsClick={() => console.log("Settings clicked")}
          onLogoutClick={() => console.log("Logout clicked")}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activePath === "/" && (
            <div className="space-y-6">
              <SummaryCards />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RecentInvoices onViewInvoice={handleViewInvoice} />
                <CashflowChart />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CollectionActivity />
                <CreditAlerts />
              </div>
            </div>
          )}

          {activePath === "/accounts-receivable" && (
            <AccountsReceivableModule />
          )}

          {activePath === "/collections" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h1 className="text-2xl font-bold mb-6">Collections Tracker</h1>
              <p className="text-gray-500">
                Collections Tracker module content will be displayed here.
              </p>
            </div>
          )}

          {activePath === "/credit" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h1 className="text-2xl font-bold mb-6">Credit Management</h1>
              <p className="text-gray-500">
                Credit Management module content will be displayed here.
              </p>
            </div>
          )}

          {activePath === "/analytics" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
              <p className="text-gray-500">
                Analytics Dashboard module content will be displayed here.
              </p>
            </div>
          )}

          {activePath === "/integrations" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h1 className="text-2xl font-bold mb-6">Integration Hub</h1>
              <p className="text-gray-500">
                Integration Hub module content will be displayed here.
              </p>
            </div>
          )}

          {activePath === "/team" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h1 className="text-2xl font-bold mb-6">Team Management</h1>
              <p className="text-gray-500">
                Team Management module content will be displayed here.
              </p>
            </div>
          )}

          {activePath === "/settings" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h1 className="text-2xl font-bold mb-6">Settings</h1>
              <p className="text-gray-500">
                Settings module content will be displayed here.
              </p>
            </div>
          )}

          {activePath === "/help" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h1 className="text-2xl font-bold mb-6">Help & Support</h1>
              <p className="text-gray-500">
                Help & Support module content will be displayed here.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Overlay for mobile menu */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}
    </div>
  );
};

export default Home;
