import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertCircle, ArrowRight, Check, CreditCard, Database, ExternalLink, Filter, Globe, Key, Link as LinkIcon, Lock, Plus, RefreshCw, Search, Settings, Shield, Sliders, Wallet } from "lucide-react";

interface IntegrationHubProps {
  title?: string;
}

const IntegrationHub = ({ title = "Integration Hub" }: IntegrationHubProps) => {
  const [activeTab, setActiveTab] = useState("accounting");
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  // Mock data for integrations
  const integrations = {
    accounting: [
      {
        id: "quickbooks",
        name: "QuickBooks Online",
        description: "Sync invoices, payments, and customer data with QuickBooks Online",
        status: "connected",
        lastSync: "2023-06-15 09:30 AM",
        icon: "/icons/quickbooks.png",
      },
      {
        id: "xero",
        name: "Xero",
        description: "Connect your Xero account to sync financial data",
        status: "disconnected",
        lastSync: null,
        icon: "/icons/xero.png",
      },
      {
        id: "sage",
        name: "Sage Intacct",
        description: "Enterprise-grade accounting integration with Sage Intacct",
        status: "disconnected",
        lastSync: null,
        icon: "/icons/sage.png",
      },
      {
        id: "netsuite",
        name: "NetSuite",
        description: "Comprehensive ERP integration with NetSuite",
        status: "disconnected",
        lastSync: null,
        icon: "/icons/netsuite.png",
      },
    ],
    payment: [
      {
        id: "stripe",
        name: "Stripe",
        description: "Process payments and manage subscriptions with Stripe",
        status: "connected",
        lastSync: "2023-06-16 14:45 PM",
        icon: "/icons/stripe.png",
      },
      {
        id: "paypal",
        name: "PayPal",
        description: "Accept payments via PayPal",
        status: "disconnected",
        lastSync: null,
        icon: "/icons/paypal.png",
      },
      {
        id: "square",
        name: "Square",
        description: "Process payments with Square",
        status: "disconnected",
        lastSync: null,
        icon: "/icons/square.png",
      },
      {
        id: "authorize",
        name: "Authorize.net",
        description: "Accept credit card payments with Authorize.net",
        status: "disconnected",
        lastSync: null,
        icon: "/icons/authorize.png",
      },
    ],
    crm: [
      {
        id: "salesforce",
        name: "Salesforce",
        description: "Sync customer data and invoices with Salesforce",
        status: "connected",
        lastSync: "2023-06-14 11:20 AM",
        icon: "/icons/salesforce.png",
      },
      {
        id: "hubspot",
        name: "HubSpot",
        description: "Connect your HubSpot CRM to manage customer relationships",
        status: "disconnected",
        lastSync: null,
        icon: "/icons/hubspot.png",
      },
      {
        id: "zoho",
        name: "Zoho CRM",
        description: "Integrate with Zoho CRM for customer management",
        status: "disconnected",
        lastSync: null,
        icon: "/icons/zoho.png",
      },
      {
        id: "dynamics",
        name: "Microsoft Dynamics",
        description: "Enterprise CRM integration with Microsoft Dynamics",
        status: "disconnected",
        lastSync: null,
        icon: "/icons/dynamics.png",
      },
    ],
  };

  const handleConnectIntegration = (integrationId: string) => {
    setSelectedIntegration(integrationId);
    setShowConfigDialog(true);
  };

  const getIntegrationIcon = (category: string) => {
    switch (category) {
      case "accounting":
        return <Database className="h-5 w-5" />;
      case "payment":
        return <Wallet className="h-5 w-5" />;
      case "crm":
        return <Users className="h-5 w-5" />;
      default:
        return <Globe className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" /> Connected
          </Badge>
        );
      case "disconnected":
        return (
          <Badge variant="outline">
            Disconnected
          </Badge>
        );
      case "error":
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" /> Error
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex space-x-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search integrations"
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
            Custom Integration
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Integration Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Connected Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">Out of 12 available integrations</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Last Sync Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Successful
              </div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">Last run: Today at 09:30 AM</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Data Synced</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,250 records</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-green-500 flex items-center">
                  <ArrowRight className="h-3 w-3 mr-1" />
                  125 new today
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Integration Categories */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="accounting" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Accounting Software
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Payment Gateways
            </TabsTrigger>
            <TabsTrigger value="crm" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              CRM Systems
            </TabsTrigger>
          </TabsList>

          {Object.keys(integrations).map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrations[category].map((integration) => (
                  <Card key={integration.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                            {getIntegrationIcon(category)}
                          </div>
                          <div>
                            <CardTitle>{integration.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {integration.description}
                            </CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(integration.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {integration.status === "connected" && (
                        <div className="text-sm text-gray-500">
                          Last synced: {integration.lastSync}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="bg-gray-50 border-t flex justify-between">
                      {integration.status === "connected" ? (
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Settings className="h-3 w-3" /> Configure
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <RefreshCw className="h-3 w-3" /> Sync Now
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center gap-1 text-red-500 hover:text-red-600">
                            Disconnect
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleConnectIntegration(integration.id)}
                        >
                          <LinkIcon className="h-3 w-3" /> Connect
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Integration Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Integration Activity</CardTitle>
            <CardDescription>Latest sync events and status updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Check className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">QuickBooks Sync Completed</p>
                    <span className="text-sm text-gray-500">Today, 09:30 AM</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Successfully synced 125 invoices and 42 payments</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <RefreshCw className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">Stripe Data Refresh</p>
                    <span className="text-sm text-gray-500">Today, 08:15 AM</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Updated payment status for 18 invoices</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
                <div className="h