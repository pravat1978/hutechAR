import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  CalendarIcon,
  FileText,
  DollarSign,
  Clock,
  Send,
  Printer,
  Download,
  CheckCircle,
  AlertCircle,
  MailIcon,
} from "lucide-react";

interface InvoiceDetailsProps {
  isOpen?: boolean;
  onClose?: () => void;
  invoiceId?: string;
}

const InvoiceDetails = ({
  isOpen = true,
  onClose = () => {},
  invoiceId = "INV-2023-0042",
}: InvoiceDetailsProps) => {
  const [activeTab, setActiveTab] = useState("details");

  // Mock invoice data
  const invoice = {
    id: invoiceId,
    customer: {
      name: "Acme Corporation",
      email: "billing@acmecorp.com",
      address: "123 Business Ave, Suite 400, San Francisco, CA 94107",
      contactPerson: "John Smith",
    },
    status: "pending", // pending, paid, overdue
    amount: 2450.75,
    issueDate: "2023-06-15",
    dueDate: "2023-07-15",
    items: [
      {
        description: "Web Development Services",
        quantity: 40,
        rate: 50,
        amount: 2000,
      },
      {
        description: "Domain Registration (1 year)",
        quantity: 1,
        rate: 15.75,
        amount: 15.75,
      },
      {
        description: "Premium Support Package",
        quantity: 1,
        rate: 435,
        amount: 435,
      },
    ],
    notes:
      "Payment due within 30 days. Please include invoice number with your payment.",
    paymentTerms: "Net 30",
    activities: [
      { date: "2023-06-15", action: "Invoice created", user: "Sarah Johnson" },
      {
        date: "2023-06-15",
        action: "Invoice sent to customer",
        user: "Sarah Johnson",
      },
      {
        date: "2023-06-20",
        action: "Invoice viewed by customer",
        user: "System",
      },
      { date: "2023-07-01", action: "Payment reminder sent", user: "System" },
    ],
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Paid
          </Badge>
        );
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-white">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              Invoice {invoice.id}
            </DialogTitle>
            {getStatusBadge(invoice.status)}
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="details">Invoice Details</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">{invoice.customer.name}</p>
                    <p className="text-sm text-gray-600">
                      {invoice.customer.contactPerson}
                    </p>
                    <p className="text-sm text-gray-600">
                      {invoice.customer.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      {invoice.customer.address}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Invoice Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Issue Date:</span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" /> {invoice.issueDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Due Date:</span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {invoice.dueDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Payment Terms:
                      </span>
                      <span className="text-sm font-medium">
                        {invoice.paymentTerms}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t mt-2">
                      <span className="text-sm font-medium">Total Amount:</span>
                      <span className="text-lg font-bold flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />{" "}
                        {invoice.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500">
                  Invoice Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium text-gray-500">
                          Description
                        </th>
                        <th className="text-right py-2 font-medium text-gray-500">
                          Quantity
                        </th>
                        <th className="text-right py-2 font-medium text-gray-500">
                          Rate
                        </th>
                        <th className="text-right py-2 font-medium text-gray-500">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.items.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2">{item.description}</td>
                          <td className="text-right py-2">{item.quantity}</td>
                          <td className="text-right py-2">
                            ${item.rate.toFixed(2)}
                          </td>
                          <td className="text-right py-2 font-medium">
                            ${item.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td colSpan={3} className="text-right py-2 font-medium">
                          Total:
                        </td>
                        <td className="text-right py-2 font-bold">
                          ${invoice.amount.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start">
                <div className="text-sm text-gray-600 mt-2">
                  <p className="font-medium">Notes:</p>
                  <p>{invoice.notes}</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500">
                  Activity History
                </CardTitle>
                <CardDescription>
                  Track all activities related to this invoice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoice.activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 pb-3 border-b last:border-0"
                    >
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        {activity.action.includes("created") ? (
                          <FileText className="h-4 w-4" />
                        ) : activity.action.includes("sent") ? (
                          <Send className="h-4 w-4" />
                        ) : activity.action.includes("viewed") ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <div className="flex justify-between mt-1">
                          <p className="text-xs text-gray-500">
                            By: {activity.user}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500">
                  Invoice Actions
                </CardTitle>
                <CardDescription>Manage this invoice</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Update Status</h4>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <CheckCircle className="h-4 w-4" /> Mark as Paid
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 text-red-500 hover:text-red-600"
                      >
                        <AlertCircle className="h-4 w-4" /> Mark as Overdue
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Document Actions</h4>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Printer className="h-4 w-4" /> Print Invoice
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" /> Download PDF
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Send Reminder</h4>
                    <div className="space-y-2">
                      <Input
                        placeholder="Email address"
                        defaultValue={invoice.customer.email}
                      />
                      <Textarea
                        placeholder="Add a custom message"
                        className="h-20"
                        defaultValue={`Dear ${invoice.customer.contactPerson},\n\nThis is a friendly reminder about invoice ${invoice.id} for $${invoice.amount.toFixed(2)} due on ${invoice.dueDate}.`}
                      />
                      <Button className="w-full flex items-center gap-1">
                        <MailIcon className="h-4 w-4" /> Send Reminder
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between items-center">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Printer className="h-4 w-4" /> Print
            </Button>
            <Button className="flex items-center gap-1">
              <Send className="h-4 w-4" /> Send Invoice
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceDetails;
