import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  FileText,
  Clock,
  CreditCard,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Users,
  Link,
} from "lucide-react";

interface SidebarProps {
  className?: string;
  activePath?: string;
  onNavigate?: (path: string) => void;
}

const Sidebar = ({
  className,
  activePath = "/",
  onNavigate = () => {},
}: SidebarProps) => {
  const mainNavItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/",
    },
    {
      title: "Accounts Receivable",
      icon: <FileText className="h-5 w-5" />,
      path: "/accounts-receivable",
    },
    {
      title: "Collections Tracker",
      icon: <Clock className="h-5 w-5" />,
      path: "/collections",
    },
    {
      title: "Credit Management",
      icon: <CreditCard className="h-5 w-5" />,
      path: "/credit",
    },
    {
      title: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      path: "/analytics",
    },
    {
      title: "Integration Hub",
      icon: <Link className="h-5 w-5" />,
      path: "/integrations",
    },
  ];

  const secondaryNavItems = [
    {
      title: "Team",
      icon: <Users className="h-5 w-5" />,
      path: "/team",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
    },
    {
      title: "Help & Support",
      icon: <HelpCircle className="h-5 w-5" />,
      path: "/help",
    },
  ];

  return (
    <div
      className={cn(
        "flex h-full w-[280px] flex-col bg-white border-r border-gray-200",
        className,
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-lg">InvoiceFlow</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-6 px-4">
        <nav className="flex flex-col gap-1">
          {mainNavItems.map((item) => (
            <TooltipProvider key={item.path}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activePath === item.path ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 px-3 py-2 h-10",
                      activePath === item.path ? "font-medium" : "font-normal",
                    )}
                    onClick={() => onNavigate(item.path)}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{item.title}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>

        <div className="mt-8">
          <h3 className="mb-2 px-4 text-xs font-semibold uppercase text-gray-500">
            Settings
          </h3>
          <nav className="flex flex-col gap-1">
            {secondaryNavItems.map((item) => (
              <TooltipProvider key={item.path}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activePath === item.path ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 px-3 py-2 h-10",
                        activePath === item.path
                          ? "font-medium"
                          : "font-normal",
                      )}
                      onClick={() => onNavigate(item.path)}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3 px-2 py-3">
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=finance" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium">John Doe</p>
            <p className="truncate text-xs text-gray-500">john@example.com</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Log out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
