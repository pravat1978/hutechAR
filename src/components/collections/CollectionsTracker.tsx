import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Calendar,
  Clock,
  Filter,
  Mail,
  Phone,
  Plus,
  Search,
} from "lucide-react";
import CollectionActivity from "../dashboard/CollectionActivity";

interface CollectionsTrackerProps {
  title?: string;
}

const CollectionsTracker = ({
  title = "Collections Tracker",
}: CollectionsTrackerProps) => {
  const [activeTab, setActiveTab] = useState("overdue");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for overdue invoices
  const overdueInvoices = [
    {
      id: "1",
      invoiceNumber: "INV-003",
      customer: "Stark Enterprises",
      amount: 8500.0,
      issueDate: "2023-04-15",
      dueDate: "2023-05-15",
      status: "overdue",
      daysOverdue: 45,
      contactName: "Tony Stark",
      contactEmail: "tony@stark.com",
      contactPhone: "(555) 123-4567",
      lastContact: "2023-06-01",
      notes: "Customer promised payment by end of month",
    },
    {
      id: "2",
      invoiceNumber: "INV-005",
      customer: "Oscorp",
      amount: 1875.25,
      issueDate: "2023-04-01",
      dueDate: "2023-05-01",
      status: "overdue",
      daysOverdue: 59,
      contactName: "Norman Osborn",
      contactEmail: "norman@oscorp.com",
      contactPhone: "(555) 987-6543",
      lastContact: "2023-05-20",
      notes: "Disputing charges, escalated to management",
    },
    {
      id: "3",
      invoiceNumber: "INV-007",
      customer: "LexCorp",
      amount: 12350.75,
      issueDate: "2023-03-10",
      dueDate: "2023-04-10",
      status: "overdue",
      daysOverdue: 80,
      contactName: "Lex Luthor",
      contactEmail: "lex@lexcorp.com",
      contactPhone: "(555) 555-5555",
      lastContact: "2023-05-15",
      notes: "Cash flow issues, negotiating payment plan",
    },
  ];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get severity class based on days overdue
  const getOverdueSeverity = (days: number) => {
    if (days > 60) return "text-red-600 font-bold";
    if (days > 30) return "text-amber-600 font-semibold";
    return "text-yellow-600";
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex space-x-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer or invoice"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Follow-up
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Overdue Invoices */}
        <div className="lg:col-span-2">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle>Overdue Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="overdue">All Overdue</TabsTrigger>
                  <TabsTrigger value="critical">
                    Critical (60+ days)
                  </TabsTrigger>
                  <TabsTrigger value="followup">Needs Follow-up</TabsTrigger>
                </TabsList>

                <TabsContent value="overdue" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Days Overdue</TableHead>
                        <TableHead>Last Contact</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {overdueInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">
                            {invoice.invoiceNumber}
                          </TableCell>
                          <TableCell>{invoice.customer}</TableCell>
                          <TableCell>
                            {formatCurrency(invoice.amount)}
                          </TableCell>
                          <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                          <TableCell
                            className={getOverdueSeverity(invoice.daysOverdue)}
                          >
                            {invoice.daysOverdue} days
                          </TableCell>
                          <TableCell>
                            {formatDate(invoice.lastContact)}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                              >
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                              >
                                <Calendar className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="critical">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Days Overdue</TableHead>
                        <TableHead>Last Contact</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {overdueInvoices
                        .filter((invoice) => invoice.daysOverdue >= 60)
                        .map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">
                              {invoice.invoiceNumber}
                            </TableCell>
                            <TableCell>{invoice.customer}</TableCell>
                            <TableCell>
                              {formatCurrency(invoice.amount)}
                            </TableCell>
                            <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                            <TableCell className="text-red-600 font-bold">
                              {invoice.daysOverdue} days
                            </TableCell>
                            <TableCell>
                              {formatDate(invoice.lastContact)}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                >
                                  <Mail className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                >
                                  <Phone className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                >
                                  <Calendar className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="followup">
                  <div className="flex flex-col items-center justify-center py-12">
                    <Clock className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Follow-ups Scheduled
                    </h3>
                    <p className="text-gray-500 mb-4 text-center max-w-md">
                      You don't have any follow-ups scheduled for today. Create
                      a new follow-up to get started.
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" /> Schedule Follow-up
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Customer Details Card */}
          <Card className="bg-white mt-6">
            <CardHeader className="pb-2">
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Stark Enterprises</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Contact: Tony Stark
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Email: tony@stark.com
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Phone: (555) 123-4567
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-1">
                      Payment History
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Average Days to Pay: 32</Badge>
                      <Badge variant="outline">
                        Total Outstanding: $15,750
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Notes</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Customer promised payment by end of month. Follow up on June
                    30th if payment not received.
                  </p>
                  <h4 className="text-sm font-medium mb-2">Credit Options</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border rounded-md">
                      <div>
                        <p className="font-medium">30-Day Extension</p>
                        <p className="text-xs text-gray-500">
                          5% fee ($425.00)
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Offer
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded-md">
                      <div>
                        <p className="font-medium">Payment Plan</p>
                        <p className="text-xs text-gray-500">
                          3 installments, 2% fee
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Offer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Activity */}
        <div>
          <CollectionActivity />
        </div>
      </div>
    </div>
  );
};

export default CollectionsTracker;
