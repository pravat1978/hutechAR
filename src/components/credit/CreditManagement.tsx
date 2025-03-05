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
import { Progress } from "@/components/ui/progress";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CreditCard,
  DollarSign,
  Download,
  Filter,
  Plus,
  Search,
  Shield,
  User,
} from "lucide-react";
import CreditAlerts from "../dashboard/CreditAlerts";

interface CreditManagementProps {
  title?: string;
}

const CreditManagement = ({
  title = "Credit Management",
}: CreditManagementProps) => {
  const [activeTab, setActiveTab] = useState("customers");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreditDialog, setShowCreditDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  // Mock data for customers
  const customers = [
    {
      id: "1",
      name: "Acme Corporation",
      creditLimit: 50000,
      currentBalance: 45000,
      availableCredit: 5000,
      utilizationPercentage: 90,
      riskLevel: "high",
      paymentTerms: "Net 30",
      creditScore: 680,
      lastReview: "2023-05-15",
    },
    {
      id: "2",
      name: "Globex Industries",
      creditLimit: 25000,
      currentBalance: 20000,
      availableCredit: 5000,
      utilizationPercentage: 80,
      riskLevel: "medium",
      paymentTerms: "Net 30",
      creditScore: 720,
      lastReview: "2023-06-01",
    },
    {
      id: "3",
      name: "Wayne Enterprises",
      creditLimit: 100000,
      currentBalance: 85000,
      availableCredit: 15000,
      utilizationPercentage: 85,
      riskLevel: "medium",
      paymentTerms: "Net 45",
      creditScore: 750,
      lastReview: "2023-04-20",
    },
    {
      id: "4",
      name: "Stark Industries",
      creditLimit: 75000,
      currentBalance: 72000,
      availableCredit: 3000,
      utilizationPercentage: 96,
      riskLevel: "high",
      paymentTerms: "Net 30",
      creditScore: 690,
      lastReview: "2023-06-10",
    },
    {
      id: "5",
      name: "LexCorp",
      creditLimit: 60000,
      currentBalance: 35000,
      availableCredit: 25000,
      utilizationPercentage: 58,
      riskLevel: "low",
      paymentTerms: "Net 30",
      creditScore: 780,
      lastReview: "2023-05-05",
    },
  ];

  // Mock data for credit applications
  const creditApplications = [
    {
      id: "1",
      customer: "Oscorp",
      requestedAmount: 30000,
      requestDate: "2023-06-15",
      status: "pending",
      creditScore: 710,
      annualRevenue: "$2.5M",
      yearsInBusiness: 8,
    },
    {
      id: "2",
      customer: "Daily Bugle",
      requestedAmount: 15000,
      requestDate: "2023-06-12",
      status: "approved",
      creditScore: 760,
      annualRevenue: "$1.2M",
      yearsInBusiness: 15,
    },
    {
      id: "3",
      customer: "Umbrella Corporation",
      requestedAmount: 50000,
      requestDate: "2023-06-10",
      status: "rejected",
      creditScore: 620,
      annualRevenue: "$5.8M",
      yearsInBusiness: 12,
    },
  ];

  // Mock data for overdue invoices eligible for credit
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
      eligibleForCredit: true,
      creditOptions: [
        { type: "extension", term: "30 days", fee: 425.0, feePercentage: 5 },
        { type: "installment", term: "3 months", fee: 170.0, feePercentage: 2 },
      ],
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
      eligibleForCredit: true,
      creditOptions: [
        { type: "extension", term: "30 days", fee: 93.76, feePercentage: 5 },
        { type: "installment", term: "3 months", fee: 37.51, feePercentage: 2 },
      ],
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
      eligibleForCredit: false,
      creditOptions: [],
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

  // Get risk badge variant
  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "secondary";
      case "medium":
        return "default";
      case "high":
        return "destructive";
      default:
        return "outline";
    }
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "secondary";
      case "pending":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  // Get utilization color
  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-amber-500";
    return "bg-green-500";
  };

  const handleOfferCredit = (invoiceId: string) => {
    setShowCreditDialog(true);
    setSelectedCustomer(
      overdueInvoices.find((inv) => inv.id === invoiceId)?.customer || null,
    );
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex space-x-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers"
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
            New Credit Application
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Credit Management */}
        <div className="lg:col-span-2">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle>Credit Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                  <TabsTrigger value="applications">
                    Credit Applications
                  </TabsTrigger>
                  <TabsTrigger value="overdue">Overdue Invoices</TabsTrigger>
                </TabsList>

                <TabsContent value="customers" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Credit Limit</TableHead>
                        <TableHead>Current Balance</TableHead>
                        <TableHead>Available Credit</TableHead>
                        <TableHead>Utilization</TableHead>
                        <TableHead>Risk Level</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">
                            {customer.name}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(customer.creditLimit)}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(customer.currentBalance)}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(customer.availableCredit)}
                          </TableCell>
                          <TableCell>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${getUtilizationColor(customer.utilizationPercentage)}`}
                                style={{
                                  width: `${customer.utilizationPercentage}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-xs">
                              {customer.utilizationPercentage}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={getRiskBadgeVariant(customer.riskLevel)}
                            >
                              {customer.riskLevel === "high" && (
                                <AlertCircle className="h-3 w-3 mr-1" />
                              )}
                              {customer.riskLevel.charAt(0).toUpperCase() +
                                customer.riskLevel.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8"
                              >
                                <Shield className="h-3 w-3 mr-1" /> Adjust Limit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8"
                              >
                                <User className="h-3 w-3 mr-1" /> Details
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="applications" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Requested Amount</TableHead>
                        <TableHead>Request Date</TableHead>
                        <TableHead>Credit Score</TableHead>
                        <TableHead>Annual Revenue</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {creditApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell className="font-medium">
                            {application.customer}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(application.requestedAmount)}
                          </TableCell>
                          <TableCell>
                            {formatDate(application.requestDate)}
                          </TableCell>
                          <TableCell>{application.creditScore}</TableCell>
                          <TableCell>{application.annualRevenue}</TableCell>
                          <TableCell>
                            <Badge
                              variant={getStatusBadgeVariant(
                                application.status,
                              )}
                            >
                              {application.status.charAt(0).toUpperCase() +
                                application.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8"
                              >
                                <ArrowRight className="h-3 w-3 mr-1" /> Review
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8"
                              >
                                <Download className="h-3 w-3 mr-1" /> Documents
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="overdue" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Days Overdue</TableHead>
                        <TableHead>Credit Eligible</TableHead>
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
                          <TableCell className="text-red-600 font-medium">
                            {invoice.daysOverdue} days
                          </TableCell>
                          <TableCell>
                            {invoice.eligibleForCredit ? (
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-800"
                              >
                                <Check className="h-3 w-3 mr-1" /> Eligible
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-red-100 text-red-800"
                              >
                                <AlertCircle className="h-3 w-3 mr-1" /> Not
                                Eligible
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8"
                              disabled={!invoice.eligibleForCredit}
                              onClick={() => handleOfferCredit(invoice.id)}
                            >
                              <CreditCard className="h-3 w-3 mr-1" /> Offer
                              Credit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Credit Scoring Card */}
          <Card className="bg-white mt-6">
            <CardHeader className="pb-2">
              <CardTitle>Credit Scoring System</CardTitle>
              <CardDescription>
                Automated risk assessment for customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Payment History (40%)</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>On-time Payments</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Average Days Late</span>
                      <span>12 days</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Financial Stability (35%)</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Years in Business</span>
                      <span>8 years</span>
                    </div>
                    <Progress value={70} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Annual Revenue</span>
                      <span>$2.5M</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Credit Utilization (25%)</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Utilization</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Credit Mix</span>
                      <span>Good</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 border rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Overall Credit Score</h3>
                    <p className="text-sm text-gray-500">
                      Based on payment history, financial stability, and credit
                      utilization
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">720</div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      Good
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Credit Alerts */}
        <div>
          <CreditAlerts />

          <Card className="bg-white mt-6">
            <CardHeader className="pb-2">
              <CardTitle>Credit Terms</CardTitle>
              <CardDescription>
                Standard credit options for customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Standard Terms</h3>
                      <p className="text-sm text-gray-500">
                        Net 30 days from invoice date
                      </p>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                </div>

                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Extended Terms</h3>
                      <p className="text-sm text-gray-500">
                        Net 45-60 days, 2% fee
                      </p>
                    </div>
                    <Badge variant="outline">Premium</Badge>
                  </div>
                </div>

                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Payment Plans</h3>
                      <p className="text-sm text-gray-500">
                        3-6 monthly installments, 3-5% fee
                      </p>
                    </div>
                    <Badge variant="outline">Custom</Badge>
                  </div>
                </div>

                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Early Payment Discount</h3>
                      <p className="text-sm text-gray-500">
                        2/10 Net 30 (2% discount if paid within 10 days)
                      </p>
                    </div>
                    <Badge variant="secondary">Incentive</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Credit Offer Dialog */}
      <Dialog open={showCreditDialog} onOpenChange={setShowCreditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Offer Credit Options</DialogTitle>
            <DialogDescription>
              Provide credit options for overdue invoice payment
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Customer:</p>
                <p className="text-sm text-gray-500">{selectedCustomer}</p>
              </div>
              <div>
                <p className="font-medium">Invoice:</p>
                <p className="text-sm text-gray-500">INV-003</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Amount Due:</p>
                <p className="text-sm text-gray-500">$8,500.00</p>
              </div>
              <div>
                <p className="font-medium">Days Overdue:</p>
                <p className="text-sm text-red-500">45 days</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-medium">Credit Options</h4>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="extension"
                  name="creditOption"
                  className="h-4 w-4"
                />
                <label htmlFor="extension" className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">30-Day Extension</span>
                    <span className="text-sm text-gray-500">
                      5% fee ($425.00)
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    New due date: July 15, 2023
                  </p>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="installment"
                  name="creditOption"
                  className="h-4 w-4"
                />
                <label htmlFor="installment" className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">3-Month Payment Plan</span>
                    <span className="text-sm text-gray-500">
                      2% fee ($170.00)
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    $2,890.00 per month for 3 months
                  </p>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="custom"
                  name="creditOption"
                  className="h-4 w-4"
                />
                <label htmlFor="custom" className="flex-1">
                  <span className="font-medium">Custom Option</span>
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Additional Notes</label>
              <Textarea
                placeholder="Add any specific terms or conditions"
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreditDialog(false)}
            >
              Cancel
            </Button>
            <Button className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Send Credit Offer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreditManagement;
