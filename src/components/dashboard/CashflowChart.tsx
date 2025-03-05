import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Calendar, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

interface CashflowChartProps {
  data?: any[];
  timeRange?: "30" | "60" | "90";
  onTimeRangeChange?: (range: "30" | "60" | "90") => void;
}

const CashflowChart = ({
  data = generateMockData(90),
  timeRange = "30",
  onTimeRangeChange = () => {},
}: CashflowChartProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<
    "30" | "60" | "90"
  >(timeRange);
  const [chartType, setChartType] = useState<"cashflow" | "comparison">(
    "cashflow",
  );

  const handleTimeRangeChange = (value: "30" | "60" | "90") => {
    setSelectedTimeRange(value);
    onTimeRangeChange(value);
  };

  const filteredData = data.slice(0, parseInt(selectedTimeRange));

  // Calculate net cashflow (difference between inflow and outflow)
  const netCashflow = filteredData.reduce(
    (sum, item) => sum + (item.inflow - item.outflow),
    0,
  );
  const isPositive = netCashflow >= 0;

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          Cash Flow Projections
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Tabs
            value={chartType}
            onValueChange={(value) =>
              setChartType(value as "cashflow" | "comparison")
            }
            className="h-8"
          >
            <TabsList className="h-8">
              <TabsTrigger value="cashflow" className="h-8 px-3 text-xs">
                Cash Flow
              </TabsTrigger>
              <TabsTrigger value="comparison" className="h-8 px-3 text-xs">
                Comparison
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Select
            value={selectedTimeRange}
            onValueChange={handleTimeRangeChange}
          >
            <SelectTrigger className="h-8 w-[80px]">
              <SelectValue placeholder="30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 days</SelectItem>
              <SelectItem value="60">60 days</SelectItem>
              <SelectItem value="90">90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-600">Inflow</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <span className="text-sm text-gray-600">Outflow</span>
            </div>
            {chartType === "comparison" && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-600">Net</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Net Projection:</span>
            <div
              className={`flex items-center ${isPositive ? "text-green-600" : "text-red-600"}`}
            >
              <span className="font-bold">
                ${Math.abs(netCashflow).toLocaleString()}
              </span>
              {isPositive ? (
                <TrendingUp className="ml-1 h-4 w-4" />
              ) : (
                <TrendingDown className="ml-1 h-4 w-4" />
              )}
            </div>
          </div>
        </div>

        <Tabs value={chartType}>
          <TabsContent value="cashflow" className="h-[250px] mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.3}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => value.split(" ")[0]}
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  formatter={(value) => [
                    `${Number(value).toLocaleString()}`,
                    undefined,
                  ]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="inflow"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorInflow)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="outflow"
                  stroke="#f87171"
                  fillOpacity={1}
                  fill="url(#colorOutflow)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="comparison" className="h-[250px] mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.3}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => value.split(" ")[0]}
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  formatter={(value) => [
                    `${Number(value).toLocaleString()}`,
                    undefined,
                  ]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="net"
                  name="Net Cash Flow"
                  stroke="#22c55e"
                  fillOpacity={1}
                  fill="url(#colorNet)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Helper function to generate mock data
function generateMockData(days: number) {
  const data = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const inflow = Math.floor(Math.random() * 10000) + 5000;
    const outflow = Math.floor(Math.random() * 8000) + 3000;

    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      inflow,
      outflow,
      net: inflow - outflow,
    });
  }

  return data;
}

export default CashflowChart;
