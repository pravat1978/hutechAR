import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Filter,
  Plus,
  Search,
  UserPlus,
  Mail,
  Shield,
  Trash2,
  Edit,
  MoreHorizontal,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TeamManagementProps {
  title?: string;
}

const TeamManagement = ({ title = "Team Management" }: TeamManagementProps) => {
  const [activeTab, setActiveTab] = useState("members");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);

  // Mock data for team members
  const teamMembers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Administrator",
      department: "Finance",
      status: "active",
      lastActive: "Today at 10:30 AM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Accounts Manager",
      department: "Finance",
      status: "active",
      lastActive: "Today at 09:15 AM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Collections Specialist",
      department: "Collections",
      status: "active",
      lastActive: "Yesterday at 04:30 PM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      role: "Credit Analyst",
      department: "Credit",
      status: "inactive",
      lastActive: "2 weeks ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    },
    {
      id: "5",
      name: "Robert Wilson",
      email: "robert@example.com",
      role: "Financial Analyst",
      department: "Analytics",
      status: "active",
      lastActive: "Today at 11:45 AM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
    },
  ];

  // Mock data for roles
  const roles = [
    {
      id: "1",
      name: "Administrator",
      description: "Full access to all system features and settings",
      members: 1,
      permissions: [
        "Create",
        "Read",
        "Update",
        "Delete",
        "Manage Users",
        "System Settings",
      ],
    },
    {
      id: "2",
      name: "Accounts Manager",
      description: "Manage invoices, payments, and customer accounts",
      members: 2,
      permissions: ["Create", "Read", "Update", "Limited Delete"],
    },
    {
      id: "3",
      name: "Collections Specialist",
      description: "Handle overdue accounts and payment follow-ups",
      members: 3,
      permissions: ["Read", "Update Collections", "Send Reminders"],
    },
    {
      id: "4",
      name: "Credit Analyst",
      description:
        "Evaluate customer credit applications and set credit limits",
      members: 2,
      permissions: ["Read", "Update Credit", "Credit Approvals"],
    },
    {
      id: "5",
      name: "Financial Analyst",
      description: "Access to reporting and analytics features",
      members: 1,
      permissions: ["Read", "Export Reports"],
    },
  ];

  // Mock data for departments
  const departments = [
    { id: "1", name: "Finance", members: 3 },
    { id: "2", name: "Collections", members: 3 },
    { id: "3", name: "Credit", members: 2 },
    { id: "4", name: "Analytics", members: 1 },
    { id: "5", name: "Customer Service", members: 0 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Active
          </Badge>
        );
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex space-x-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search team members"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button
            className="flex items-center gap-2"
            onClick={() => setShowAddUserDialog(true)}
          >
            <UserPlus className="h-4 w-4" />
            Add Team Member
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={member.avatar}
                              alt={member.name}
                            />
                            <AvatarFallback>
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{member.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell>{member.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" />
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <Card key={role.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{role.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {role.description}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      {role.members} {role.members === 1 ? "member" : "members"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Permissions:</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, index) => (
                        <Badge key={index} variant="secondary">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3 mr-1" /> Edit Role
                  </Button>
                  <Button variant="outline" size="sm">
                    <User className="h-3 w-3 mr-1" /> Assign Members
                  </Button>
                </div>
              </Card>
            ))}
            <Card className="flex flex-col items-center justify-center p-6 border-dashed border-2 border-gray-200 bg-gray-50">
              <Plus className="h-8 w-8 text-gray-400 mb-2" />
              <h3 className="text-lg font-medium mb-1">Create New Role</h3>
              <p className="text-sm text-gray-500 text-center mb-4">
                Define custom roles with specific permissions
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Role
              </Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {departments.map((department) => (
              <Card key={department.id}>
                <CardHeader>
                  <CardTitle>{department.name}</CardTitle>
                  <CardDescription>
                    {department.members}{" "}
                    {department.members === 1 ? "member" : "members"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Team Lead</p>
                      {department.members > 0 ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${department.name}`}
                            />
                            <AvatarFallback>
                              {department.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            {department.name === "Finance"
                              ? "John Doe"
                              : department.name === "Collections"
                                ? "Michael Brown"
                                : department.name === "Credit"
                                  ? "Emily Davis"
                                  : department.name === "Analytics"
                                    ? "Robert Wilson"
                                    : "Not assigned"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">
                          Not assigned
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <User className="h-3 w-3 mr-1" /> View Members
                  </Button>
                </div>
              </Card>
            ))}
            <Card className="flex flex-col items-center justify-center p-6 border-dashed border-2 border-gray-200 bg-gray-50">
              <Plus className="h-8 w-8 text-gray-400 mb-2" />
              <h3 className="text-lg font-medium mb-1">Add Department</h3>
              <p className="text-sm text-gray-500 text-center mb-4">
                Create a new department for your organization
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Department
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>
              Add a new member to your team and assign their role and
              permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </label>
                <Input id="firstName" placeholder="Enter first name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </label>
                <Input id="lastName" placeholder="Enter last name" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <Select>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="department" className="text-sm font-medium">
                Department
              </label>
              <Select>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddUserDialog(false)}
            >
              Cancel
            </Button>
            <Button>Add Member</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamManagement;
