import React, { useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import Header from "./dashboard/Header";
import SummaryCards from "./dashboard/SummaryCards";
import RecentInvoices from "./dashboard/RecentInvoices";
import CashflowChart from "./dashboard/CashflowChart";
import CollectionActivity from "./dashboard/CollectionActivity";
import CreditAlerts from "./dashboard/CreditAlerts";
import AccountsReceivableModule from "./accounts-receivable/AccountsReceivableModule";
import CollectionsTracker from "./collections/CollectionsTracker";
import CreditManagement from "./credit/CreditManagement";
import AnalyticsDashboard from "./analytics/AnalyticsDashboard";
import IntegrationHub from "./integrations/IntegrationHub";
import TeamManagement from "./team/TeamManagement";
import SettingsPage from "./settings/SettingsPage";
import HelpSupport from "./help/HelpSupport";

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

          {activePath === "/collections" && <CollectionsTracker />}

          {activePath === "/credit" && <CreditManagement />}

          {activePath === "/analytics" && <AnalyticsDashboard />}

          {activePath === "/integrations" && <IntegrationHub />}

          {activePath === "/team" && <TeamManagement />}

          {activePath === "/settings" && <SettingsPage />}

          {activePath === "/help" && <HelpSupport />}
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
