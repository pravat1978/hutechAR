import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { PlusCircle, FileText, Filter, Download, Printer } from "lucide-react";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilters from "./InvoiceFilters";
import InvoiceDetails from "./InvoiceDetails";
import InvoiceGenerator from "./InvoiceGenerator";
import supabase from '../../utils/supabaseClient'

interface AccountsReceivableModuleProps {
  title?: string;
}
const mockInvoices = {
  all: [
    {
      id: "1",
      invoiceNumber: "Loading",
      customer: "Loading",
      amount: 0,
      issueDate: "2000-01-01",
      dueDate: "2000-01-01",
      status: "Loading",
    },
    {
      id: "2",
      invoiceNumber: "Loading",
      customer: "Loading",
      amount: 0,
      issueDate: "2000-01-01",
      dueDate: "2000-01-01",
      status: "Loading",
    },
    {
      id: "3",
      invoiceNumber: "Loading",
      customer: "Loading",
      amount: 0,
      issueDate: "2000-01-01",
      dueDate: "2000-01-01",
      status: "Loading",
    },
    {
      id: "4",
      invoiceNumber: "Loading",
      customer: "Loading",
      amount: 0,
      issueDate: "2000-01-01",
      dueDate: "2000-01-01",
      status: "Loading",
    },
    {
      id: "5",
      invoiceNumber: "Loading",
      customer: "Loading",
      amount: 0,
      issueDate: "2000-01-01",
      dueDate: "2000-01-01",
      status: "Loading",
    },
  ],
  pending: [
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
      id: "4",
      invoiceNumber: "INV-004",
      customer: "Wayne Industries",
      amount: 4200.75,
      issueDate: "2023-05-20",
      dueDate: "2023-06-19",
      status: "pending",
    },
  ],
  overdue: [
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
      id: "5",
      invoiceNumber: "INV-005",
      customer: "Oscorp",
      amount: 1875.25,
      issueDate: "2023-04-01",
      dueDate: "2023-05-01",
      status: "overdue",
    },
  ],
  paid: [
    {
      id: "1",
      invoiceNumber: "INV-001",
      customer: "Acme Corporation",
      amount: 1250.0,
      issueDate: "2023-05-01",
      dueDate: "2023-05-31",
      status: "paid",
    },
  ],
  draft: [],
};
const AccountsReceivableModule = ({
  title = "Accounts Receivable",
}: AccountsReceivableModuleProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
    null,
  );
  const [pagination, setpagination] = useState(0);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [showInvoiceGenerator, setShowInvoiceGenerator] = useState(false);
  const [invoicesData, setInvoicesData] = useState<any>(mockInvoices);

  // Handle invoice actions
  const handleViewInvoice = (id: string) => {
    setSelectedInvoiceId(id);
    setShowInvoiceDetails(true);
  };

  const handleCreateInvoice = () => {
    setShowInvoiceGenerator(true);
  };

  const handleSaveInvoice = (invoiceData: any) => {
    console.log("Saving invoice:", invoiceData);
    // Here you would typically save the invoice to your backend
  };
  const handlePageFromInvoiceTable = (childData) => {
    setpagination(childData);
  };


useEffect(() => {
  const fetchData = async () => {
    try {
      const page=pagination
      const pageSize=5
      const statusArray=['all','pending','overdue','paid','draft']
      let finalData :any= {}; 
      for(const datas of statusArray){
        let query = supabase.from('invoices').select('*', { count: 'exact' }).range(page * pageSize, (page + 1) * pageSize - 1).order('created_at', { ascending: false });

        if (!(datas==='all')) {
          query = query.eq('status', datas);
        }
        const { data, error } = await query;
        console.log(finalData["draft"])
        if (error) {
          finalData[datas]=[]
        }else{
          finalData[datas]=data
        }
       
      }
      // const finalData={
      //   all: data,
      //   pending: data,
      //   overdue: data.filter((data)=>data.status=="overdue"),
      //   paid: data.filter((data)=>data.status=="paid"),
      //   draft: data.filter((data)=>data.status=="draft"),
      // };
      setInvoicesData(finalData);
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false); // Uncomment if you're using a loading state
    }
  };

  fetchData();

}, [pagination]); 

    
  

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button
            className="flex items-center gap-2"
            onClick={handleCreateInvoice}
          >
            <PlusCircle className="h-4 w-4" />
            Create Invoice
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-6">
          <InvoiceFilters
            onFilterChange={(filters) =>
              console.log("Filters changed:", filters)
            }
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 pt-4 border-b">
            <TabsList className="grid grid-cols-5 w-full max-w-2xl">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                All Invoices
                <span className="ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                  {invoicesData.all.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                Pending
                <span className="ml-1 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                  {invoicesData.pending.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="overdue" className="flex items-center gap-2">
                Overdue
                <span className="ml-1 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                  {invoicesData.overdue.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="paid" className="flex items-center gap-2">
                Paid
                <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  {invoicesData.paid.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="draft" className="flex items-center gap-2">
                Draft
                <span className="ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                  {invoicesData.draft.length}
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="p-0">
            <InvoiceTable
              invoices={invoicesData.all}
              onViewInvoice={handleViewInvoice}
              onEditInvoice={(id) => console.log(`Edit invoice ${id}`)}
              onDeleteInvoice={(id) => console.log(`Delete invoice ${id}`)}
              onSendReminder={(id) =>
                console.log(`Send reminder for invoice ${id}`)
              }
              onDownloadInvoice={(id) => console.log(`Download invoice ${id}`)}
              sendDataToParent={handlePageFromInvoiceTable}
            />
          </TabsContent>

          <TabsContent value="pending" className="p-0">
            <InvoiceTable
              invoices={invoicesData.pending}
              onViewInvoice={handleViewInvoice}
              onEditInvoice={(id) => console.log(`Edit invoice ${id}`)}
              onDeleteInvoice={(id) => console.log(`Delete invoice ${id}`)}
              onSendReminder={(id) =>
                console.log(`Send reminder for invoice ${id}`)
              }
              onDownloadInvoice={(id) => console.log(`Download invoice ${id}`)}
              sendDataToParent={handlePageFromInvoiceTable}
            />
          </TabsContent>

          <TabsContent value="overdue" className="p-0">
            <InvoiceTable
              invoices={invoicesData.overdue}
              onViewInvoice={handleViewInvoice}
              onEditInvoice={(id) => console.log(`Edit invoice ${id}`)}
              onDeleteInvoice={(id) => console.log(`Delete invoice ${id}`)}
              onSendReminder={(id) =>
                console.log(`Send reminder for invoice ${id}`)
              }
              onDownloadInvoice={(id) => console.log(`Download invoice ${id}`)}
              sendDataToParent={handlePageFromInvoiceTable}
            />
          </TabsContent>

          <TabsContent value="paid" className="p-0">
            <InvoiceTable
              invoices={invoicesData.paid}
              onViewInvoice={handleViewInvoice}
              onEditInvoice={(id) => console.log(`Edit invoice ${id}`)}
              onDeleteInvoice={(id) => console.log(`Delete invoice ${id}`)}
              onSendReminder={(id) =>
                console.log(`Send reminder for invoice ${id}`)
              }
              onDownloadInvoice={(id) => console.log(`Download invoice ${id}`)}
              sendDataToParent={handlePageFromInvoiceTable}
            />
          </TabsContent>

          <TabsContent value="draft" className="p-0">
            {invoicesData.draft.length > 0 ? (
              <InvoiceTable
                invoices={invoicesData.draft}
                onViewInvoice={handleViewInvoice}
                onEditInvoice={(id) => console.log(`Edit invoice ${id}`)}
                onDeleteInvoice={(id) => console.log(`Delete invoice ${id}`)}
                onSendReminder={(id) =>
                  console.log(`Send reminder for invoice ${id}`)
                }
                onDownloadInvoice={(id) =>
                  console.log(`Download invoice ${id}`)
                }
              sendDataToParent={handlePageFromInvoiceTable}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Draft Invoices
                </h3>
                <p className="text-gray-500 mb-4 text-center max-w-md">
                  You don't have any draft invoices yet. Create a new invoice to
                  get started.
                </p>
                <Button onClick={handleCreateInvoice}>
                  <PlusCircle className="h-4 w-4 mr-2" /> Create Invoice
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Invoice Details Modal */}
      {showInvoiceDetails && selectedInvoiceId && (
        <InvoiceDetails
          isOpen={showInvoiceDetails}
          onClose={() => setShowInvoiceDetails(false)}
          invoiceId={selectedInvoiceId}
        />
      )}

      {/* Invoice Generator Modal */}
      {showInvoiceGenerator && (
        <InvoiceGenerator
          open={showInvoiceGenerator}
          onClose={() => setShowInvoiceGenerator(false)}
          onSave={handleSaveInvoice}
        />
      )}
    </div>
  );
};

export default AccountsReceivableModule;
