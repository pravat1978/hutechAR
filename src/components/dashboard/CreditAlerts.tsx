import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Shield,
  User,
} from "lucide-react";

interface CreditAlert {
  id: string;
  customerName: string;
  creditLimit: number;
  currentBalance: number;
  utilizationPercentage: number;
  riskLevel: "low" | "medium" | "high";
  lastActivity: string;
}

interface CreditAlertsProps {
  alerts?: CreditAlert[];
  onViewCustomer?: (customerId: string) => void;
  onAdjustLimit?: (customerId: string) => void;
  onViewDetails?: (alertId: string) => void;
}

const CreditAlerts = ({
  alerts = [
    {
      id: "1",
      customerName: "Acme Corporation",
      creditLimit: 50000,
      currentBalance: 45000,
      utilizationPercentage: 90,
      riskLevel: "high",
      lastActivity: "2023-06-10",
    },
    {
      id: "2",
      customerName: "Globex Industries",
      creditLimit: 25000,
      currentBalance: 20000,
      utilizationPercentage: 80,
      riskLevel: "medium",
      lastActivity: "2023-06-12",
    },
    {
      id: "3",
      customerName: "Wayne Enterprises",
      creditLimit: 100000,
      currentBalance: 85000,
      utilizationPercentage: 85,
      riskLevel: "medium",
      lastActivity: "2023-06-08",
    },
    {
      id: "4",
      customerName: "Stark Industries",
      creditLimit: 75000,
      currentBalance: 72000,
      utilizationPercentage: 96,
      riskLevel: "high",
      lastActivity: "2023-06-15",
    },
  ],
  onViewCustomer = (id) => console.log(`View customer ${id}`),
  onAdjustLimit = (id) => console.log(`Adjust limit for ${id}`),
  onViewDetails = (id) => console.log(`View details for ${id}`),
}: CreditAlertsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-bold">Credit Alerts</CardTitle>
            <CardDescription>
              Customers approaching or exceeding credit limits
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{alert.customerName}</h4>
                    <p className="text-xs text-gray-500">
                      Last activity: {formatDate(alert.lastActivity)}
                    </p>
                  </div>
                </div>
                <Badge variant={getRiskBadgeVariant(alert.riskLevel)}>
                  {alert.riskLevel === "high" && (
                    <AlertCircle className="h-3 w-3 mr-1" />
                  )}
                  {alert.riskLevel.charAt(0).toUpperCase() +
                    alert.riskLevel.slice(1)}{" "}
                  Risk
                </Badge>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Credit Utilization</span>
                  <span className="font-medium">
                    {alert.utilizationPercentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getUtilizationColor(
                      alert.utilizationPercentage,
                    )}`}
                    style={{ width: `${alert.utilizationPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between text-sm mb-3">
                <div>
                  <span className="text-gray-500">Current Balance:</span>
                  <span className="font-medium ml-1">
                    {formatCurrency(alert.currentBalance)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Credit Limit:</span>
                  <span className="font-medium ml-1">
                    {formatCurrency(alert.creditLimit)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => onViewCustomer(alert.id)}
                >
                  <User className="h-3 w-3" /> Customer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => onAdjustLimit(alert.id)}
                >
                  <Shield className="h-3 w-3" /> Adjust Limit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 ml-auto"
                  onClick={() => onViewDetails(alert.id)}
                >
                  <ExternalLink className="h-3 w-3" /> Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-center border-t">
        <Button variant="ghost" size="sm" className="text-sm text-gray-500">
          {alerts.length} alerts found
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreditAlerts;
