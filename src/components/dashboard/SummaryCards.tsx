import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  Clock,
  CreditCard,
  AlertCircle,
} from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
}

const SummaryCard = ({
  title,
  value,
  icon,
  trend,
  description,
  className,
}: SummaryCardProps) => {
  return (
    <Card className={`bg-white ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className="flex items-center mt-1">
            <span
              className={`flex items-center text-xs ${trend.isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {trend.isPositive ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {trend.value}
            </span>
            {description && (
              <span className="text-xs text-muted-foreground ml-2">
                {description}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface SummaryCardsProps {
  totalOutstanding?: string;
  overdueAmount?: string;
  averageDSO?: string;
  creditUtilization?: string;
  totalOutstandingTrend?: {
    value: string;
    isPositive: boolean;
  };
  overdueAmountTrend?: {
    value: string;
    isPositive: boolean;
  };
  averageDSOTrend?: {
    value: string;
    isPositive: boolean;
  };
  creditUtilizationTrend?: {
    value: string;
    isPositive: boolean;
  };
}

const SummaryCards = ({
  totalOutstanding = "$125,430.00",
  overdueAmount = "$42,500.00",
  averageDSO = "32 days",
  creditUtilization = "68%",
  totalOutstandingTrend = {
    value: "12% vs last month",
    isPositive: true,
  },
  overdueAmountTrend = {
    value: "5% vs last month",
    isPositive: false,
  },
  averageDSOTrend = {
    value: "3 days vs last month",
    isPositive: true,
  },
  creditUtilizationTrend = {
    value: "7% vs last month",
    isPositive: false,
  },
}: SummaryCardsProps) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Outstanding"
          value={totalOutstanding}
          icon={<DollarSign className="h-4 w-4 text-primary" />}
          trend={totalOutstandingTrend}
          description="vs last month"
        />

        <SummaryCard
          title="Overdue Amount"
          value={overdueAmount}
          icon={<AlertCircle className="h-4 w-4 text-destructive" />}
          trend={overdueAmountTrend}
          description="vs last month"
        />

        <SummaryCard
          title="Average DSO"
          value={averageDSO}
          icon={<Clock className="h-4 w-4 text-amber-500" />}
          trend={averageDSOTrend}
          description="vs last month"
        />

        <SummaryCard
          title="Credit Utilization"
          value={creditUtilization}
          icon={<CreditCard className="h-4 w-4 text-blue-500" />}
          trend={creditUtilizationTrend}
          description="vs last month"
        />
      </div>
    </div>
  );
};

export default SummaryCards;
