import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  CreditCard,
  Globe,
  Lock,
  Mail,
  Save,
  User,
  Building,
  Palette,
  Database,
  FileText,
} from "lucide-react";

interface SettingsPageProps {
  title?: string;
}

const SettingsPage = ({ title = "Settings" }: SettingsPageProps) => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <Card className="md:row-span-2">
          <CardContent className="p-4">
            <Tabs
              orientation="vertical"
              value={activeTab}
              onValueChange={setActiveTab}
              className="h-full w-full"
            >
              <TabsList className="flex flex-col items-start h-auto w-full bg-transparent p-0 space-y-1">
                <TabsTrigger
                  value="account"
                  className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
                >
                  <User className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger
                  value="company"
                  className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
                >
                  <Building className="h-4 w-4 mr-2" />
                  Company Profile
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="billing"
                  className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing & Plans
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger
                  value="data"
                  className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Data Management
                </TabsTrigger>
                <TabsTrigger
                  value="invoices"
                  className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Invoice Settings
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <TabsContent value="account" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Manage your personal account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=john" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="(555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="america_new_york">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america_new_york">
                            Eastern Time (ET)
                          </SelectItem>
                          <SelectItem value="america_chicago">
                            Central Time (CT)
                          </SelectItem>
                          <SelectItem value="america_denver">
                            Mountain Time (MT)
                          </SelectItem>
                          <SelectItem value="america_los_angeles">
                            Pacific Time (PT)
                          </SelectItem>
                          <SelectItem value="etc_utc">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="company" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
                <CardDescription>
                  Manage your company information and branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="h-24 w-24 bg-gray-100 rounded-md flex items-center justify-center">
                      <Building className="h-12 w-12 text-gray-400" />
                    </div>
                    <Button variant="outline" size="sm">
                      Upload Logo
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" defaultValue="Acme Corporation" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Select defaultValue="technology">
                          <SelectTrigger id="industry">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">
                              Technology
                            </SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="healthcare">
                              Healthcare
                            </SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="manufacturing">
                              Manufacturing
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="size">Company Size</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger id="size">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">
                              1-50 employees
                            </SelectItem>
                            <SelectItem value="medium">
                              51-200 employees
                            </SelectItem>
                            <SelectItem value="large">
                              201-1000 employees
                            </SelectItem>
                            <SelectItem value="enterprise">
                              1000+ employees
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        defaultValue="https://acme.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        defaultValue="123 Business Ave, Suite 400, San Francisco, CA 94107"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email_invoices">Invoice Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about invoice status changes
                        </p>
                      </div>
                      <Switch id="email_invoices" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email_payments">
                          Payment Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when payments are received or due
                        </p>
                      </div>
                      <Switch id="email_payments" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email_reminders">
                          Payment Reminders
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive reminders about upcoming and overdue payments
                        </p>
                      </div>
                      <Switch id="email_reminders" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email_reports">Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive weekly summary reports of your financial
                          activity
                        </p>
                      </div>
                      <Switch id="email_reports" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">System Notifications</h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="system_alerts">Critical Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Important system notifications and security alerts
                        </p>
                      </div>
                      <Switch id="system_alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="system_updates">Product Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Stay informed about new features and improvements
                        </p>
                      </div>
                      <Switch id="system_updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="system_tips">Tips & Tutorials</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive helpful tips and tutorials to get the most out
                          of the system
                        </p>
                      </div>
                      <Switch id="system_tips" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" /> Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
                <CardDescription>
                  Manage your subscription plan and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Current Plan</h3>
                  <div className="bg-gray-50 border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Business Pro Plan</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          $49.99/month, billed annually
                        </p>
                        <div className="flex items-center mt-2">
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            Active
                          </Badge>
                          <span className="text-xs text-gray-500 ml-2">
                            Renews on Oct 15, 2023
                          </span>
                        </div>
                      </div>
                      <Button variant="outline">Change Plan</Button>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Users</span>
                        <span>10 of 15</span>
                      </div>
                      <Progress value={66} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Storage</span>
                        <span>5GB of 50GB</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Payment Methods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-xs text-gray-500">
                            Expires 12/2024
                          </p>
                        </div>
                      </div>
                      <Badge>Default</Badge>
                    </div>
                    <Button variant="outline" className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" /> Add Payment Method
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Billing History</h3>
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Invoice
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm">Sep 15, 2023</td>
                          <td className="px-4 py-3 text-sm">
                            Business Pro Plan (Annual)
                          </td>
                          <td className="px-4 py-3 text-sm">$599.88</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800"
                            >
                              Paid
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <FileText className="h-3 w-3 mr-1" /> PDF
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">Aug 15, 2023</td>
                          <td className="px-4 py-3 text-sm">
                            Additional User Licenses (3)
                          </td>
                          <td className="px-4 py-3 text-sm">$30.00</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800"
                            >
                              Paid
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <FileText className="h-3 w-3 mr-1" /> PDF
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and authentication methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current_password">Current Password</Label>
                      <Input id="current_password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new_password">New Password</Label>
                      <Input id="new_password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm_password">
                        Confirm New Password
                      </Label>
                      <Input id="confirm_password" type="password" />
                    </div>
                    <Button>
                      <Lock className="h-4 w-4 mr-2" /> Update Password
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">
                    Two-Factor Authentication
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="twofa">Enable 2FA</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch id="twofa" />
                  </div>
                  <Button variant="outline" disabled>
                    Set Up Two-Factor Authentication
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Session Management</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-xs text-gray-500">
                          Windows 10 • Chrome • San Francisco, CA
                        </p>
                        <p className="text-xs text-gray-500">
                          Started: Today at 10:30 AM
                        </p>
                      </div>
                      <Badge>Active Now</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Mobile App</p>
                        <p className="text-xs text-gray-500">
                          iOS 15 • iPhone • New York, NY
                        </p>
                        <p className="text-xs text-gray-500">
                          Last active: Yesterday at 4:30 PM
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Log Out All Other Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize the look and feel of your interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-3 cursor-pointer bg-white ring-2 ring-primary">
                      <div className="h-20 bg-white border rounded-md mb-2"></div>
                      <p className="text-sm font-medium text-center">Light</p>
                    </div>
                    <div className="border rounded-md p-3 cursor-pointer">
                      <div className="h-20 bg-gray-900 border rounded-md mb-2"></div>
                      <p className="text-sm font-medium text-center">Dark</p>
                    </div>
                    <div className="border rounded-md p-3 cursor-pointer">
                      <div className="h-20 bg-gradient-to-b from-white to-gray-900 border rounded-md mb-2"></div>
                      <p className="text-sm font-medium text-center">System</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Accent Color</h3>
                  <div className="grid grid-cols-6 gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-500 cursor-pointer ring-2 ring-offset-2 ring-primary"></div>
                    <div className="h-10 w-10 rounded-full bg-green-500 cursor-pointer"></div>
                    <div className="h-10 w-10 rounded-full bg-purple-500 cursor-pointer"></div>
                    <div className="h-10 w-10 rounded-full bg-red-500 cursor-pointer"></div>
                    <div className="h-10 w-10 rounded-full bg-amber-500 cursor-pointer"></div>
                    <div className="h-10 w-10 rounded-full bg-slate-800 cursor-pointer"></div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Display Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="compact_mode">Compact Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Reduce spacing and padding in the interface
                        </p>
                      </div>
                      <Switch id="compact_mode" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="animations">Interface Animations</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable animations for a more dynamic experience
                        </p>
                      </div>
                      <Switch id="animations" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sidebar_collapsed">
                          Collapsed Sidebar by Default
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Start with a collapsed sidebar for more screen space
                        </p>
                      </div>
                      <Switch id="sidebar_collapsed" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" /> Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Manage your data, imports, exports, and backups
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Import Data</h3>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <Database className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <h4 className="text-sm font-medium mb-1">
                      Drag and drop files or click to upload
                    </h4>
                    <p className="text-xs text-gray-500 mb-4">
                      Support for CSV, Excel, and QuickBooks files
                    </p>
                    <Button variant="outline">Select Files</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Export Data</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Invoice Data</p>
                        <p className="text-xs text-gray-500">
                          Export all invoice data and transaction history
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Export
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Customer Data</p>
                        <p className="text-xs text-gray-500">
                          Export customer information and payment history
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Export
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Financial Reports</p>
                        <p className="text-xs text-gray-500">
                          Export financial reports and analytics data
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Export
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Data Retention</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto_backup">Automatic Backups</Label>
                        <p className="text-sm text-muted-foreground">
                          Create regular backups of your data
                        </p>
                      </div>
                      <Switch id="auto_backup" defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backup_frequency">Backup Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="backup_frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline">Create Manual Backup</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Settings</CardTitle>
                <CardDescription>
                  Configure your invoice templates and default settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">
                    Default Invoice Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="payment_terms">
                        Default Payment Terms
                      </Label>
                      <Select defaultValue="net30">
                        <SelectTrigger id="payment_terms">
                          <SelectValue placeholder="Select terms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="net15">Net 15</SelectItem>
                          <SelectItem value="net30">Net 30</SelectItem>
                          <SelectItem value="net45">Net 45</SelectItem>
                          <SelectItem value="net60">Net 60</SelectItem>
                          <SelectItem value="due_receipt">
                            Due on Receipt
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invoice_numbering">
                        Invoice Numbering Format
                      </Label>
                      <Input
                        id="invoice_numbering"
                        defaultValue="INV-{YEAR}-{NUMBER}"
                      />
                      <p className="text-xs text-gray-500">
                        Use {"{YEAR}"}, {"{MONTH}"}, {"{NUMBER}"} as
                        placeholders
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="default_currency">Default Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger id="default_currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD - US Dollar</SelectItem>
                          <SelectItem value="eur">EUR - Euro</SelectItem>
                          <SelectItem value="gbp">
                            GBP - British Pound
                          </SelectItem>
                          <SelectItem value="cad">
                            CAD - Canadian Dollar
                          </SelectItem>
                          <SelectItem value="aud">
                            AUD - Australian Dollar
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tax_rate">Default Tax Rate (%)</Label>
                      <Input id="tax_rate" type="number" defaultValue="7.5" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Invoice Template</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-3 cursor-pointer ring-2 ring-primary">
                      <div className="h-40 bg-white border rounded-md mb-2 flex items-center justify-center">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-center">
                        Standard
                      </p>
                    </div>
                    <div className="border rounded-md p-3 cursor-pointer">
                      <div className="h-40 bg-white border rounded-md mb-2 flex items-center justify-center">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-center">
                        Professional
                      </p>
                    </div>
                    <div className="border rounded-md p-3 cursor-pointer">
                      <div className="h-40 bg-white border rounded-md mb-2 flex items-center justify-center">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-center">Minimal</p>
                    </div>
                  </div>
                  <Button variant="outline">Customize Template</Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Settings</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="email_subject">
                        Default Email Subject
                      </Label>
                      <Input
                        id="email_subject"
                        defaultValue="Invoice {INVOICE_NUMBER} from {COMPANY_NAME}"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email_body">Default Email Body</Label>
                      <Textarea
                        id="email_body"
                        rows={4}
                        defaultValue="Dear {CUSTOMER_NAME},\n\nPlease find attached invoice {INVOICE_NUMBER} for {INVOICE_AMOUNT}.\n\nPayment is due by {DUE_DATE}.\n\nThank you for your business!\n\nRegards,\n{COMPANY_NAME}"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="attach_pdf">Attach PDF</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically attach PDF invoice to emails
                        </p>
                      </div>
                      <Switch id="attach_pdf" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" /> Save Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
