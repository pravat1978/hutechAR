import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Send, Trash, Download } from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

interface InvoiceTableProps {
  invoices?: Invoice[];
  onViewInvoice?: (id: string) => void;
  onEditInvoice?: (id: string) => void;
  onDeleteInvoice?: (id: string) => void;
  onSendReminder?: (id: string) => void;
  onDownloadInvoice?: (id: string) => void;
}

const InvoiceTable = ({
  invoices = [
    {
      id: "1",
      invoiceNumber: "INV-001",
      customer: "Acme Corporation",
      amount: 1250.0,
      issueDate: "2023-05-01",
      dueDate: "2023-05-31",
      status: "paid",
    },
    {
      id: "2",
      invoiceNumber: "INV-002",
      customer: "Globex Industries",
      amount: 3750.5,
      issueDate: "2023-05-10",
      dueDate: "2023-06-09",
      status: "pending",
    },
    {
      id: "3",
      invoiceNumber: "INV-003",
      customer: "Stark Enterprises",
      amount: 8500.0,
      issueDate: "2023-04-15",
      dueDate: "2023-05-15",
      status: "overdue",
    },
    {
      id: "4",
      invoiceNumber: "INV-004",
      customer: "Wayne Industries",
      amount: 4200.75,
      issueDate: "2023-05-20",
      dueDate: "2023-06-19",
      status: "pending",
    },
    {
      id: "5",
      invoiceNumber: "INV-005",
      customer: "Oscorp",
      amount: 1875.25,
      issueDate: "2023-04-01",
      dueDate: "2023-05-01",
      status: "overdue",
    },
  ],
  onViewInvoice = (id) => console.log(`View invoice ${id}`),
  onEditInvoice = (id) => console.log(`Edit invoice ${id}`),
  onDeleteInvoice = (id) => console.log(`Delete invoice ${id}`),
  onSendReminder = (id) => console.log(`Send reminder for invoice ${id}`),
  onDownloadInvoice = (id) => console.log(`Download invoice ${id}`),
}: InvoiceTableProps) => {
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedInvoices.length === invoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(invoices.map((invoice) => invoice.id));
    }
  };

  const toggleSelectInvoice = (id: string) => {
    if (selectedInvoices.includes(id)) {
      setSelectedInvoices(
        selectedInvoices.filter((invoiceId) => invoiceId !== id),
      );
    } else {
      setSelectedInvoices([...selectedInvoices, id]);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "overdue":
        return "destructive";
      default:
        return "outline";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full bg-white rounded-md shadow">
      <div className="p-4 flex justify-between items-center border-b">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={
              selectedInvoices.length === invoices.length && invoices.length > 0
            }
            onCheckedChange={toggleSelectAll}
          />
          <span className="text-sm font-medium">
            {selectedInvoices.length} selected
          </span>
        </div>
        <div className="flex space-x-2">
          {selectedInvoices.length > 0 && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => console.log("Bulk action")}
              >
                Bulk Actions
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => console.log("Delete selected")}
              >
                Delete Selected
              </Button>
            </>
          )}
        </div>
      </div>
      <Table>
        <TableCaption>A list of your invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={
                  selectedInvoices.length === invoices.length &&
                  invoices.length > 0
                }
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>Invoice #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                <Checkbox
                  checked={selectedInvoices.includes(invoice.id)}
                  onCheckedChange={() => toggleSelectInvoice(invoice.id)}
                />
              </TableCell>
              <TableCell className="font-medium">
                {invoice.invoiceNumber}
              </TableCell>
              <TableCell>{invoice.customer}</TableCell>
              <TableCell>{formatCurrency(invoice.amount)}</TableCell>
              <TableCell>{formatDate(invoice.issueDate)}</TableCell>
              <TableCell>{formatDate(invoice.dueDate)}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(invoice.status)}>
                  {invoice.status.charAt(0).toUpperCase() +
                    invoice.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewInvoice(invoice.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditInvoice(invoice.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onSendReminder(invoice.id)}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Reminder
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDownloadInvoice(invoice.id)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDeleteInvoice(invoice.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-4 border-t flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {invoices.length} invoices
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" disabled>
            Previous
          </Button>
          <Button size="sm" variant="outline" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
