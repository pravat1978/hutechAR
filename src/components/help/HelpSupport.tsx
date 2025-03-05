import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Book,
  FileText,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Video,
} from "lucide-react";

interface HelpSupportProps {
  title?: string;
}

const HelpSupport = ({ title = "Help & Support" }: HelpSupportProps) => {
  const [activeTab, setActiveTab] = useState("documentation");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for support tickets
  const supportTickets = [
    {
      id: "T-1234",
      subject: "Issue with invoice generation",
      status: "open",
      priority: "high",
      created: "2023-06-15",
      lastUpdate: "2023-06-16",
    },
    {
      id: "T-1235",
      subject: "Payment integration question",
      status: "in_progress",
      priority: "medium",
      created: "2023-06-10",
      lastUpdate: "2023-06-14",
    },
    {
      id: "T-1236",
      subject: "How to customize invoice templates",
      status: "closed",
      priority: "low",
      created: "2023-05-28",
      lastUpdate: "2023-06-02",
    },
  ];

  // Mock data for FAQs
  const faqs = [
    {
      question: "How do I create a new invoice?",
      answer:
        "To create a new invoice, navigate to the Accounts Receivable module and click on the 'Create Invoice' button in the top right corner. Fill in the required information in the invoice generator form, add line items, and click 'Save Invoice' when you're done.",
    },
    {
      question: "How can I set up payment reminders?",
      answer:
        "Payment reminders can be configured in the Collections Tracker module. Click on 'New Follow-up' to schedule a reminder for a specific invoice. You can also set up automated reminders in the Settings page under the 'Notifications' tab.",
    },
    {
      question: "How do I adjust a customer's credit limit?",
      answer:
        "To adjust a customer's credit limit, go to the Credit Management module, find the customer in the list, and click on the 'Adjust Limit' button. Enter the new credit limit and provide a reason for the adjustment if required.",
    },
    {
      question: "Can I customize the invoice template?",
      answer:
        "Yes, you can customize invoice templates in the Settings page under the 'Invoice Settings' tab. You can choose from several pre-designed templates or create your own custom template with your company logo, colors, and layout preferences.",
    },
    {
      question: "How do I export financial reports?",
      answer:
        "To export financial reports, go to the Analytics Dashboard, select the report you want to export, and click on the 'Export' button in the top right corner. You can choose to export the data in CSV, Excel, or PDF format.",
    },
    {
      question: "How do I connect to my accounting software?",
      answer:
        "You can connect to your accounting software through the Integration Hub. Click on the 'Connect' button next to your accounting software provider, enter your API credentials, and follow the on-screen instructions to complete the integration setup.",
    },
  ];

  // Mock data for documentation categories
  const documentationCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <Book className="h-5 w-5" />,
      articles: [
        { id: "gs-1", title: "System Overview", readTime: "5 min" },
        { id: "gs-2", title: "Setting Up Your Account", readTime: "8 min" },
        { id: "gs-3", title: "Navigating the Dashboard", readTime: "6 min" },
        { id: "gs-4", title: "User Roles and Permissions", readTime: "7 min" },
      ],
    },
    {
      id: "invoicing",
      title: "Invoicing",
      icon: <FileText className="h-5 w-5" />,
      articles: [
        {
          id: "inv-1",
          title: "Creating Your First Invoice",
          readTime: "10 min",
        },
        { id: "inv-2", title: "Invoice Templates", readTime: "7 min" },
        { id: "inv-3", title: "Recurring Invoices", readTime: "8 min" },
        { id: "inv-4", title: "Invoice Statuses Explained", readTime: "5 min" },
      ],
    },
    {
      id: "collections",
      title: "Collections",
      icon: <MessageSquare className="h-5 w-5" />,
      articles: [
        {
          id: "col-1",
          title: "Setting Up Payment Reminders",
          readTime: "9 min",
        },
        {
          id: "col-2",
          title: "Collections Best Practices",
          readTime: "12 min",
        },
        {
          id: "col-3",
          title: "Automated Collection Workflows",
          readTime: "11 min",
        },
      ],
    },
  ];

  // Mock data for video tutorials
  const videoTutorials = [
    {
      id: "v1",
      title: "Getting Started with Invoice Management",
      thumbnail:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      duration: "15:30",
      category: "Beginner",
    },
    {
      id: "v2",
      title: "Advanced Invoice Customization",
      thumbnail:
        "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80",
      duration: "12:45",
      category: "Advanced",
    },
    {
      id: "v3",
      title: "Effective Collections Strategies",
      thumbnail:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
      duration: "18:20",
      category: "Intermediate",
    },
    {
      id: "v4",
      title: "Setting Up Payment Integrations",
      thumbnail:
        "https://images.unsplash.com/photo-1556742077-0a6b6a4a4ac4?w=800&q=80",
      duration: "10:15",
      category: "Intermediate",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Open
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            In Progress
          </Badge>
        );
      case "closed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Closed
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="default">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search help articles..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger
            value="documentation"
            className="flex items-center gap-2"
          >
            <Book className="h-4 w-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            FAQs
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Video Tutorials
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Support Tickets
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documentation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {documentationCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                      {category.icon}
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.articles.map((article) => (
                      <li
                        key={article.id}
                        className="flex justify-between items-center"
                      >
                        <a
                          href="#"
                          className="text-sm hover:underline hover:text-primary"
                        >
                          {article.title}
                        </a>
                        <span className="text-xs text-gray-500">
                          {article.readTime}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All {category.title} Articles
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Popular Articles</CardTitle>
              <CardDescription>
                Most frequently read documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-medium mb-1">
                    How to Set Up Automated Invoicing
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Learn how to create and schedule recurring invoices for your
                    regular clients.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Updated 2 days ago
                    </span>
                    <Badge variant="outline">12 min read</Badge>
                  </div>
                </div>
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-medium mb-1">
                    Integrating with Payment Gateways
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Step-by-step guide to connecting your account with popular
                    payment processors.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Updated 1 week ago
                    </span>
                    <Badge variant="outline">15 min read</Badge>
                  </div>
                </div>
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-medium mb-1">
                    Credit Management Best Practices
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Learn effective strategies for managing customer credit and
                    minimizing risk.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Updated 3 days ago
                    </span>
                    <Badge variant="outline">10 min read</Badge>
                  </div>
                </div>
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-medium mb-1">
                    Generating Financial Reports
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Comprehensive guide to creating and interpreting financial
                    reports.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Updated 5 days ago
                    </span>
                    <Badge variant="outline">18 min read</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">
                Can't find what you're looking for?
              </p>
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" /> Contact Support
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <Book className="h-5 w-5" />
                  </div>
                  <CardTitle>Knowledge Base</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Browse our comprehensive knowledge base for detailed guides
                  and tutorials.
                </p>
                <Button variant="outline" className="w-full">
                  Browse Articles
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <Video className="h-5 w-5" />
                  </div>
                  <CardTitle>Video Tutorials</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Watch step-by-step video tutorials to learn how to use the
                  system effectively.
                </p>
                <Button variant="outline" className="w-full">
                  Watch Videos
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <CardTitle>Community Forum</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Join our community forum to ask questions and share insights
                  with other users.
                </p>
                <Button variant="outline" className="w-full">
                  Join Forum
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoTutorials.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-white bg-opacity-75 flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all">
                      <div className="h-0 w-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-primary border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">{video.title}</h3>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{video.category}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tutorial Playlists</CardTitle>
              <CardDescription>
                Curated collections of related video tutorials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Getting Started Series</h3>
                    <Badge>5 videos</Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    A comprehensive introduction to the system for new users.
                  </p>
                </div>
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">
                      Advanced Invoicing Techniques
                    </h3>
                    <Badge>8 videos</Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    Learn advanced features and customization options for
                    invoices.
                  </p>
                </div>
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">
                      Collections & Credit Management
                    </h3>
                    <Badge>6 videos</Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    Strategies and tools for effective collections and credit
                    management.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Support Tickets</CardTitle>
                  <CardDescription>
                    View and manage your support requests
                  </CardDescription>
                </div>
                <Button>
                  <MessageSquare className="h-4 w-4 mr-2" /> New Ticket
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ticket ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Update
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {supportTickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="px-4 py-3 text-sm font-medium">
                          {ticket.id}
                        </td>
                        <td className="px-4 py-3 text-sm">{ticket.subject}</td>
                        <td className="px-4 py-3 text-sm">
                          {getStatusBadge(ticket.status)}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {getPriorityBadge(ticket.priority)}
                        </td>
                        <td className="px-4 py-3 text-sm">{ticket.created}</td>
                        <td className="px-4 py-3 text-sm">
                          {ticket.lastUpdate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <CardTitle>Email Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Send us an email and we'll get back to you within 24 hours.
                </p>
                <div className="text-sm font-medium mb-4">
                  <a
                    href="mailto:support@example.com"
                    className="text-primary hover:underline"
                  >
                    support@example.com
                  </a>
                </div>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" /> Send Email
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <CardTitle>Live Chat</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Chat with our support team for immediate assistance during
                  business hours.
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  <p>Available Monday-Friday</p>
                  <p>9:00 AM - 5:00 PM EST</p>
                </div>
                <Button className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" /> Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <CardTitle>Phone Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Call our dedicated support line for urgent issues or complex
                  questions.
                </p>
                <div className="text-sm font-medium mb-4">
                  <p className="text-primary">+1 (555) 123-4567</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Monday-Friday, 9:00 AM - 5:00 PM EST
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" /> Call Support
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Ticket</CardTitle>
              <CardDescription>
                Fill out the form below to create a new support ticket
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="account">
                        Account Management
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="priority" className="text-sm font-medium">
                    Priority
                  </label>
                  <Select>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Please provide detailed information about your issue"
                    rows={5}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="attachments" className="text-sm font-medium">
                    Attachments (optional)
                  </label>
                  <Input id="attachments" type="file" multiple />
                  <p className="text-xs text-gray-500">
                    You can attach screenshots or relevant files (max 5MB each)
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" /> Submit Ticket
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpSupport;
