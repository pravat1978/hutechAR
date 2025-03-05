import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

interface RecentInvoicesProps {
  invoices?: Invoice[];
  onViewInvoice?: (id: string) => void;
}

const RecentInvoices = ({
  invoices = [
    {
      id: "1",
      invoiceNumber: "INV-001",
      customer: "Acme Corporation",
      amount: 1250.0,
      dueDate: "2023-05-31",
      status: "paid",
    },
    {
      id: "2",
      invoiceNumber: "INV-002",
      customer: "Globex Industries",
      amount: 3750.5,
      dueDate: "2023-06-09",
      status: "pending",
    },
    {
      id: "3",
      invoiceNumber: "INV-003",
      customer: "Stark Enterprises",
      amount: 8500.0,
      dueDate: "2023-05-15",
      status: "overdue",
    },
    {
      id: "4",
      invoiceNumber: "INV-004",
      customer: "Wayne Industries",
      amount: 4200.75,
      dueDate: "2023-06-19",
      status: "pending",
    },
  ],
  onViewInvoice = (id) => console.log(`View invoice ${id}`),
}: RecentInvoicesProps) => {
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
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Invoices</CardTitle>
        <Button variant="outline" size="sm" className="h-8">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">
                  {invoice.invoiceNumber}
                </TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{formatCurrency(invoice.amount)}</TableCell>
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
                      <DropdownMenuItem
                        onClick={() => onViewInvoice(invoice.id)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
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
  );
};

export default RecentInvoices;
