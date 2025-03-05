import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Bell,
  Search,
  Settings,
  LogOut,
  User,
  HelpCircle,
  MessageSquare,
  Menu,
} from "lucide-react";

interface HeaderProps {
  companyName?: string;
  userAvatar?: string;
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  onSearch?: (query: string) => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
  onMenuToggle?: () => void;
}

const Header = ({
  companyName = "Invoice Management System",
  userAvatar = "",
  userName = "John Doe",
  userRole = "Administrator",
  notificationCount = 3,
  onSearch = () => {},
  onNotificationsClick = () => {},
  onProfileClick = () => {},
  onSettingsClick = () => {},
  onLogoutClick = () => {},
  onMenuToggle = () => {},
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 px-4 flex items-center justify-between sticky top-0 z-10">
      {/* Left section - Logo and mobile menu */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary hidden md:block">
            {companyName}
          </h1>
          <h1 className="text-xl font-bold text-primary md:hidden">IMS</h1>
        </div>
      </div>

      {/* Middle section - Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <form onSubmit={handleSearchSubmit} className="w-full relative">
          <Input
            type="search"
            placeholder="Search invoices, customers, or documents..."
            className="w-full pl-10"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </form>
      </div>

      {/* Right section - Notifications and Profile */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={onNotificationsClick}
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {notificationCount}
            </Badge>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10 ml-2"
            >
              <Avatar>
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt={userName} />
                ) : (
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center p-2">
              <Avatar className="h-8 w-8 mr-2">
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt={userName} />
                ) : (
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{userName}</span>
                <span className="text-xs text-muted-foreground">
                  {userRole}
                </span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onProfileClick}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSettingsClick}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              Feedback
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onLogoutClick}
              className="text-red-500 focus:text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
