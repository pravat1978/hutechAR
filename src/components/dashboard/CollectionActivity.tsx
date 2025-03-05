import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Bell,
  Calendar,
  Check,
  Clock,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";

interface Activity {
  id: string;
  type: "reminder" | "payment" | "call" | "email" | "note";
  title: string;
  description: string;
  date: string;
  time: string;
  status: "completed" | "pending" | "upcoming";
  customer: {
    name: string;
    avatar?: string;
    company: string;
  };
  invoiceId?: string;
  amount?: number;
}

interface CollectionActivityProps {
  activities?: Activity[];
  onViewActivity?: (id: string) => void;
}

const CollectionActivity = ({
  activities = [
    {
      id: "1",
      type: "reminder",
      title: "Payment Reminder Sent",
      description: "Automated reminder for invoice INV-2023-0042",
      date: "2023-07-01",
      time: "09:00 AM",
      status: "completed",
      customer: {
        name: "John Smith",
        company: "Acme Corporation",
      },
      invoiceId: "INV-2023-0042",
      amount: 2450.75,
    },
    {
      id: "2",
      type: "payment",
      title: "Payment Received",
      description: "Payment received for invoice INV-2023-0039",
      date: "2023-06-28",
      time: "02:15 PM",
      status: "completed",
      customer: {
        name: "Sarah Johnson",
        company: "Globex Industries",
      },
      invoiceId: "INV-2023-0039",
      amount: 1875.5,
    },
    {
      id: "3",
      type: "call",
      title: "Collection Call",
      description: "Follow-up call regarding overdue invoice",
      date: "2023-07-02",
      time: "11:30 AM",
      status: "upcoming",
      customer: {
        name: "Michael Brown",
        company: "Stark Enterprises",
      },
      invoiceId: "INV-2023-0035",
    },
    {
      id: "4",
      type: "email",
      title: "Custom Email Sent",
      description: "Personalized follow-up for multiple overdue invoices",
      date: "2023-06-29",
      time: "04:45 PM",
      status: "completed",
      customer: {
        name: "Emily Davis",
        company: "Wayne Industries",
      },
    },
    {
      id: "5",
      type: "note",
      title: "Collection Note Added",
      description: "Customer promised payment by end of week",
      date: "2023-06-30",
      time: "10:20 AM",
      status: "pending",
      customer: {
        name: "Robert Wilson",
        company: "Oscorp",
      },
      invoiceId: "INV-2023-0040",
    },
  ],
  onViewActivity = (id) => console.log(`View activity ${id}`),
}: CollectionActivityProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Bell className="h-4 w-4" />;
      case "payment":
        return <Check className="h-4 w-4" />;
      case "call":
        return <Phone className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "note":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
      case "upcoming":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Upcoming
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          Collection Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[300px]">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onViewActivity(activity.id)}
            >
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  {getStatusBadge(activity.status)}
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {activity.description}
                </p>
                <div className="mt-1 flex items-center">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {activity.date}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 ml-3">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      activity.customer.avatar ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.customer.name}`
                    }
                    alt={activity.customer.name}
                  />
                  <AvatarFallback>
                    {activity.customer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CollectionActivity;
