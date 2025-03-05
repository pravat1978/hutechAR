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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Download,
  FileText,
  Filter,
  Printer,
} from "lucide-react";

interface AnalyticsDashboardProps {
  title?: string;
}

const AnalyticsDashboard = ({
  title = "Analytics Dashboard",
}: AnalyticsDashboardProps) => {
  const [timeRange, setTimeRange] = useState("90");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for DSO (Days Sales Outstanding)
  const dsoData = [
    { month: "Jan", dso: 42 },
    { month: "Feb", dso: 38 },
    { month: "Mar", dso: 35 },
    { month: "Apr", dso: 37 },
    { month: "May", dso: 32 },
    { month: "Jun", dso: 30 },
  ];

  // Mock data for aging buckets
  const agingData = [
    { name: "Current", value: 65000 },
    { name: "1-30 Days", value: 35000 },
    { name: "31-60 Days", value: 15000 },
    { name: "61-90 Days", value: 8000 },
    { name: "90+ Days", value: 12000 },
  ];

  // Mock data for cash flow projections
  const cashFlowData = [
    { month: "Jul", inflow: 85000, outflow: 65000, net: 20000 },
    { month: "Aug", inflow: 92000, outflow: 70000, net: 22000 },
    { month: "Sep", inflow: 78000, outflow: 68000, net: 10000 },
    { month: "Oct", inflow: 95000, outflow: 72000, net: 23000 },
    { month: "Nov", inflow: 110000, outflow: 75000, net: 35000 },
    { month: "Dec", inflow: 125000, outflow: 85000, net: 40000 },
  ];

  // Mock data for top customers
  const topCustomers = [
    {
      id: "1",
      name: "Acme Corporation",
      totalBilled: 125000,
      paid: 80000,
      outstanding: 45000,
      onTimePayment: 85,
    },
    {
      id: "2",
      name: "Stark Industries",
      totalBilled: 95000,
      paid: 23000,
      outstanding: 72000,
      onTimePayment: 65,
    },
    {
      id: "3",
      name: "Wayne Enterprises",
      totalBilled: 110000,
      paid: 25000,
      outstanding: 85000,
      onTimePayment: 70,
    },
    {
      id: "4",
      name: "Globex Industries",
      totalBilled: 75000,
      paid: 55000,
      outstanding: 20000,
      onTimePayment: 90,
    },
    {
      id: "5",
      name: "LexCorp",
      totalBilled: 85000,
      paid: 50000,
      outstanding: 35000,
      onTimePayment: 75,
    },
  ];

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000"];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Last 90 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="60">Last 60 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="180">Last 6 months</SelectItem>
              <SelectItem value="365">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current DSO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32 days</div>
            <div className="flex items-center mt-1">
              <span className="flex items-center text-xs text-green-500">
                <ArrowDown className="h-3 w-3 mr-1" />5 days
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                vs last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Outstanding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$257,000</div>
            <div className="flex items-center mt-1">
              <span className="flex items-center text-xs text-red-500">
                <ArrowUp className="h-3 w-3 mr-1" />
                12%
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                vs last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Collection Effectiveness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <div className="flex items-center mt-1">
              <span className="flex items-center text-xs text-green-500">
                <ArrowUp className="h-3 w-3 mr-1" />
                3%
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                vs last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Projected Cash Inflow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125,000</div>
            <div className="flex items-center mt-1">
              <span className="flex items-center text-xs text-green-500">
                <ArrowUp className="h-3 w-3 mr-1" />
                15%
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                next 30 days
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="aging">Aging Analysis</TabsTrigger>
            <TabsTrigger value="projections">Cash Flow Projections</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DSO Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>DSO Trend</CardTitle>
                  <CardDescription>
                    Days Sales Outstanding over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={dsoData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          opacity={0.3}
                        />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <RechartsTooltip
                          formatter={(value) => [`${value} days`, "DSO"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="dso"
                          stroke="#8884d8"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Aging Buckets */}
              <Card>
                <CardHeader>
                  <CardTitle>Aging Buckets</CardTitle>
                  <CardDescription>Outstanding invoices by age</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={agingData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {agingData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(value) => [
                            formatCurrency(value as number),
                            "Amount",
                          ]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Customers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Customers by Outstanding Balance</CardTitle>
                <CardDescription>
                  Customers with highest outstanding invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Total Billed</TableHead>
                      <TableHead>Paid</TableHead>
                      <TableHead>Outstanding</TableHead>
                      <TableHead>On-Time Payment %</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">
                          {customer.name}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(customer.totalBilled)}
                        </TableCell>
                        <TableCell>{formatCurrency(customer.paid)}</TableCell>
                        <TableCell className="font-semibold">
                          {formatCurrency(customer.outstanding)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress
                              value={customer.onTimePayment}
                              className="h-2 w-24"
                            />
                            <span className="text-sm">
                              {customer.onTimePayment}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {customer.onTimePayment >= 80 ? (
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800"
                            >
                              Good
                            </Badge>
                          ) : customer.onTimePayment >= 70 ? (
                            <Badge
                              variant="outline"
                              className="bg-yellow-100 text-yellow-800"
                            >
                              Average
                            </Badge>
                          ) : (
                            <Badge variant="destructive">At Risk</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aging" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Aging Analysis</CardTitle>
                <CardDescription>
                  Breakdown of outstanding invoices by age
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={agingData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        opacity={0.3}
                      />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                      <RechartsTooltip
                        formatter={(value) => [
                          formatCurrency(value as number),
                          "Amount",
                        ]}
                      />
                      <Bar dataKey="value" fill="#8884d8">
                        {agingData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-5 gap-4 text-center">
                  {agingData.map((bucket, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <div className="text-sm font-medium">{bucket.name}</div>
                      <div className="text-lg font-bold mt-1">
                        {formatCurrency(bucket.value)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round(
                          (bucket.value /
                            agingData.reduce(
                              (sum, item) => sum + item.value,
                              0,
                            )) *
                            100,
                        )}
                        % of total
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Aging by Customer</CardTitle>
                  <CardDescription>
                    Top 5 customers with oldest invoices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Oldest Invoice</TableHead>
                        <TableHead>Days Outstanding</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Stark Industries
                        </TableCell>
                        <TableCell>INV-003</TableCell>
                        <TableCell className="text-red-600 font-semibold">
                          85 days
                        </TableCell>
                        <TableCell>$8,500</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">LexCorp</TableCell>
                        <TableCell>INV-007</TableCell>
                        <TableCell className="text-red-600 font-semibold">
                          80 days
                        </TableCell>
                        <TableCell>$12,350</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Oscorp</TableCell>
                        <TableCell>INV-005</TableCell>
                        <TableCell className="text-amber-600 font-semibold">
                          59 days
                        </TableCell>
                        <TableCell>$1,875</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Wayne Enterprises
                        </TableCell>
                        <TableCell>INV-012</TableCell>
                        <TableCell className="text-amber-600 font-semibold">
                          48 days
                        </TableCell>
                        <TableCell>$15,200</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Acme Corporation
                        </TableCell>
                        <TableCell>INV-018</TableCell>
                        <TableCell className="text-yellow-600">
                          35 days
                        </TableCell>
                        <TableCell>$5,750</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Collection Recommendations</CardTitle>
                  <CardDescription>
                    Suggested actions based on aging analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md bg-red-50">
                      <div className="flex items-start">
                        <Badge variant="destructive" className="mt-0.5 mr-2">
                          Critical
                        </Badge>
                        <div>
                          <h4 className="font-medium">
                            Escalate to Collections Agency
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            2 invoices over 90 days ($20,350)
                          </p>
                          <Button size="sm" variant="outline" className="mt-2">
                            <FileText className="h-3 w-3 mr-1" /> View Invoices
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-md bg-amber-50">
                      <div className="flex items-start">
                        <Badge variant="default" className="mt-0.5 mr-2">
                          High Priority
                        </Badge>
                        <div>
                          <h4 className="font-medium">
                            Schedule Collection Calls
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            3 invoices 60-90 days ($25,425)
                          </p>
                          <Button size="sm" variant="outline" className="mt-2">
                            <FileText className="h-3 w-3 mr-1" /> View Invoices
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-md bg-yellow-50">
                      <div className="flex items-start">
                        <Badge variant="outline" className="mt-0.5 mr-2">
                          Medium Priority
                        </Badge>
                        <div>
                          <h4 className="font-medium">Send Email Reminders</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            5 invoices 30-60 days ($35,000)
                          </p>
                          <Button size="sm" variant="outline" className="mt-2">
                            <FileText className="h-3 w-3 mr-1" /> View Invoices
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Projections</CardTitle>
                <CardDescription>
                  6-month forecast based on invoice due dates and payment
                  patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={cashFlowData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorInflow"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3b82f6"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorOutflow"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#f87171"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#f87171"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorNet"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#22c55e"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#22c55e"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        opacity={0.3}
                      />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                      <RechartsTooltip
                        formatter={(value) => [
                          formatCurrency(value as number),
                          undefined,
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="inflow"
                        name="Cash Inflow"
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#colorInflow)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="outflow"
                        name="Cash Outflow"
                        stroke="#f87171"
                        fillOpacity={1}
                        fill="url(#colorOutflow)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="net"
                        name="Net Cash Flow"
                        stroke="#22c55e"
                        fillOpacity={1}
                        fill="url(#colorNet)"
                        strokeWidth={2}
                      />
                      <Legend />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="p-4 border rounded-md bg-blue-50">
                    <h4 className="text-sm font-medium text-blue-700">
                      Total Projected Inflow
                    </h4>
                    <div className="text-2xl font-bold mt-1">
                      {formatCurrency(
                        cashFlowData.reduce(
                          (sum, item) => sum + item.inflow,
                          0,
                        ),
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Next 6 months</p>
                  </div>

                  <div className="p-4 border rounded-md bg-red-50">
                    <h4 className="text-sm font-medium text-red-700">
                      Total Projected Outflow
                    </h4>
                    <div className="text-2xl font-bold mt-1">
                      {formatCurrency(
                        cashFlowData.reduce(
                          (sum, item) => sum + item.outflow,
                          0,
                        ),
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Next 6 months</p>
                  </div>

                  <div className="p-4 border rounded-md bg-green-50">
                    <h4 className="text-sm font-medium text-green-700">
                      Net Cash Flow
                    </h4>
                    <div className="text-2xl font-bold mt-1">
                      {formatCurrency(
                        cashFlowData.reduce((sum, item) => sum + item.net, 0),
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Next 6 months</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cash Flow Risk Analysis</CardTitle>
                  <CardDescription>
                    Potential risks to projected cash flow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <h4 className="font-medium">Late Payment Risk</h4>
                        <p className="text-sm text-gray-500">
                          Based on historical payment patterns
                        </p>
                      </div>
                      <Badge variant="destructive">High</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <h4 className="font-medium">Customer Default Risk</h4>
                        <p className="text-sm text-gray-500">
                          Based on credit scores and history
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-yellow-100 text-yellow-800"
                      >
                        Medium
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <h4 className="font-medium">Seasonal Fluctuation</h4>
                        <p className="text-sm text-gray-500">
                          Based on historical seasonal patterns
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        Low
                      </Badge>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium mb-2">
                        Risk Mitigation Recommendations
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-2 mt-0.5">
                            1
                          </div>
                          <span>
                            Implement early payment incentives for high-risk
                            customers
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-2 mt-0.5">
                            2
                          </div>
                          <span>
                            Review credit terms for customers with payment
                            issues
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                            3
                          </div>
                          <span>
                            Set up automated payment reminders 7 days before due
                            date
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scenario Analysis</CardTitle>
                  <CardDescription>
                    Cash flow projections under different scenarios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Scenario</TableHead>
                        <TableHead>Projected Net Cash Flow</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Probability</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Base Case</TableCell>
                        <TableCell>{formatCurrency(150000)}</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>60%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Optimistic
                        </TableCell>
                        <TableCell className="text-green-600">
                          {formatCurrency(185000)}
                        </TableCell>
                        <TableCell className="text-green-600">+23%</TableCell>
                        <TableCell>20%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Pessimistic
                        </TableCell>
                        <TableCell className="text-red-600">
                          {formatCurrency(105000)}
                        </TableCell>
                        <TableCell className="text-red-600">-30%</TableCell>
                        <TableCell>20%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Stress Case
                        </TableCell>
                        <TableCell className="text-red-600">
                          {formatCurrency(75000)}
                        </TableCell>
                        <TableCell className="text-red-600">-50%</TableCell>
                        <TableCell>5%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Scenario Assumptions</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Base Case:</span> Current
                        payment patterns continue
                      </p>
                      <p>
                        <span className="font-medium">Optimistic:</span> 15%
                        improvement in DSO, 10% increase in sales
                      </p>
                      <p>
                        <span className="font-medium">Pessimistic:</span> 20%
                        deterioration in DSO, 5% decrease in sales
                      </p>
                      <p>
                        <span className="font-medium">Stress Case:</span> 30%
                        deterioration in DSO, 15% decrease in sales, 5% customer
                        defaults
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
