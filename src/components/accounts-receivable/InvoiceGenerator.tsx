import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";
import supabase from "@/utils/supabaseClient";

interface InvoiceGeneratorProps {
  open?: boolean;
  onClose?: () => void;
  onSave?: (invoice: any) => void;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

const defaultTemplates = [
  { id: "1", name: "Standard Invoice", preview: "/templates/standard.png" },
  { id: "2", name: "Professional", preview: "/templates/professional.png" },
  { id: "3", name: "Minimal", preview: "/templates/minimal.png" },
];

const defaultCustomers = [
  { id: "1", name: "Acme Corporation", email: "billing@acme.com" },
  { id: "2", name: "Globex Industries", email: "accounts@globex.com" },
  { id: "3", name: "Wayne Enterprises", email: "finance@wayne.com" },
];

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({
  open = true,
  onClose = () => {},
}) => {
  const [activeStep, setActiveStep] = useState<string>("template");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("1");
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      description: "Consulting Services",
      quantity: 10,
      rate: 150,
      amount: 1500,
    },
  ]);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [latestData, setLatestData] = useState<any>([])
  const [currentInvoiceNumber, setCurrentInvoiceNumber] = useState<any>("")

  const form = useForm({
    defaultValues: {
      invoiceNumber: currentInvoiceNumber,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      customer: "",
      contactPerson: "",
      email: "",
      address: "",
      notes: "",
      terms:
        "Payment due within 30 days. Late payments subject to a 1.5% monthly fee.",
    },
  });

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    setInvoiceItems([...invoiceItems, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setInvoiceItems(invoiceItems.filter((item) => item.id !== id));
  };

  const handleItemChange = (
    id: string,
    field: keyof InvoiceItem,
    value: any,
  ) => {
    setInvoiceItems(
      invoiceItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          // Recalculate amount if quantity or rate changes
          if (field === "quantity" || field === "rate") {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate;
          }

          return updatedItem;
        }
        return item;
      }),
    );
  };

  const calculateTotal = () => {
    return invoiceItems.reduce((sum, item) => sum + item.amount, 0);
  };

  const handleNext = () => {
    if (activeStep === "template") setActiveStep("details");
    else if (activeStep === "details") setActiveStep("items");
    else if (activeStep === "items") setActiveStep("preview");
  };

  const handleBack = () => {
    if (activeStep === "details") setActiveStep("template");
    else if (activeStep === "items") setActiveStep("details");
    else if (activeStep === "preview") setActiveStep("items");
  };

  const handleSave = async() => {
    const invoiceData = {
      ...form.getValues(),
      template: selectedTemplate,
      items: invoiceItems,
      total: calculateTotal(),
    };
    console.log(invoiceData,"datadatadatadata")
   
    const { data, error } = await supabase
    .from('invoices') 
    .insert([
      { id:(latestData?.id)+1,
        invoiceNumber:currentInvoiceNumber,
        customer:invoiceData?.customer,
        amount:invoiceData?.total,
        issueDate:invoiceData?.issueDate,
        dueDate:invoiceData?.dueDate,
        status:"pending",
       },
    ]);
   
  if (error ) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Record saved:', data);
  }
  const dummyActivities=[
    {
      "date": "2023-06-15",
      "user": "Sarah Johnson",
      "action": "Invoice created"
    },
    {
      "date": "2023-06-15",
      "user": "Sarah Johnson",
      "action": "Invoice sent to customer"
    },
    {
      "date": "2023-06-20",
      "user": "System",
      "action": "Invoice viewed by customer"
    },
    {
      "date": "2023-07-01",
      "user": "System",
      "action": "Payment reminder sent"
    }
  ]
  const { data:data1, error:error1 } = await supabase
  .from('invoiceDetails') 
  .insert([
    { id:(latestData?.id)+1,
      notes:invoiceData?.notes,
      paymentTerms:invoiceData?.terms,
      name:invoiceData?.customer,
      email:invoiceData?.email,
      address:invoiceData?.address,
      contactPerson:invoiceData?.contactPerson,
      issueDate:invoiceData?.issueDate,
      status:"pending",
      amount:invoiceData?.total,
      dueDate:invoiceData?.dueDate,
      items:invoiceData?.items,
      activities: dummyActivities,
      invoiceNumber:currentInvoiceNumber,
     },
  ]);
  if (error1) {
    console.error('Error inserting data:', error1);
  } else {
    console.log('Record saved:', data1);
  }
    onClose();
  };

  useEffect(()=>{
    const fetchLatestRecord = async () => {
      const { data, error } = await supabase
        .from('invoices') // Replace with your table name
        .select('*') // Select all columns (you can choose specific columns if needed)
        .order('created_at', { ascending: false }) // Order by created_at in descending order
        .limit(1); // Limit to 1 record

      if (error) {
        console.error('Error fetching latest record:', error.message);
      } else {
        setLatestData(data[0]);
        let latestNumber=parseInt(data[0]?.invoiceNumber.split('-')[1])
        latestNumber+=1
        let newString = "INV-0" + latestNumber.toString()
        setCurrentInvoiceNumber(newString)
      }
      // setLoading(false);
    };
    fetchLatestRecord();
  },[])
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-white">
        <DialogHeader>
          <DialogTitle>Generate New Invoice</DialogTitle>
          <DialogDescription>
            Create a professional invoice in just a few steps.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeStep}
          onValueChange={setActiveStep}
          className="w-full"
        >
          {/* <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="template">Template</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="items">Line Items</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList> */}

          {/* Step 1: Template Selection */}
          <TabsContent value="template" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {defaultTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all ${selectedTemplate === template.id ? "ring-2 ring-primary" : "hover:shadow-md"}`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-[8.5/11] bg-gray-100 flex items-center justify-center mb-2">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                    <p className="font-medium text-center">{template.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Step 2: Invoice Details */}
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Invoice Number</label>
                <Input
                  {...form.register("invoiceNumber")}
                  placeholder={currentInvoiceNumber}
                  disabled={true}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Customer Name</label>
                <Input
                  {...form.register("customer")}
                  placeholder=""
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  {...form.register("email")}
                  placeholder=""
                />
              </div>
              <div>
                <label className="text-sm font-medium">Contact Person</label>
                <Input
                  {...form.register("contactPerson")}
                  placeholder=""
                />
              </div>
              <div>
                <label className="text-sm font-medium">Issue Date</label>
                <Input type="date" {...form.register("issueDate")} />
              </div>
              <div>
                <label className="text-sm font-medium">Due Date</label>
                <Input type="date" {...form.register("dueDate")} />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium">Customer Address</label>
                <Textarea
                  {...form.register("address")}
                  placeholder="Enter customer's billing address"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  {...form.register("notes")}
                  placeholder="Additional notes to display on the invoice"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium">
                  Terms & Conditions
                </label>
                <Textarea
                  {...form.register("terms")}
                  placeholder="Payment terms and conditions"
                />
              </div>
            </div>
          </TabsContent>

          {/* Step 3: Line Items */}
          <TabsContent value="items" className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 w-1/2">Description</th>
                    <th className="text-right p-2">Quantity</th>
                    <th className="text-right p-2">Unit Price</th>
                    <th className="text-right p-2">Amount</th>
                    <th className="p-2 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-2">
                        <Input
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "description",
                              e.target.value,
                            )
                          }
                          placeholder="Item description"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "quantity",
                              Number(e.target.value),
                            )
                          }
                          className="text-right"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "rate",
                              Number(e.target.value),
                            )
                          }
                          className="text-right"
                        />
                      </td>
                      <td className="p-2 text-right">
                        ₹{item.amount.toFixed(2)}
                      </td>
                      <td className="p-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={invoiceItems.length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5} className="p-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddItem}
                        className="flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Item
                      </Button>
                    </td>
                  </tr>
                  <tr className="font-medium">
                    <td colSpan={3} className="text-right p-2">
                      Total:
                    </td>
                    <td className="text-right p-2">
                      ₹{calculateTotal().toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </TabsContent>

          {/* Step 4: Preview */}
          <TabsContent value="preview" className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg border">
              <div className="flex justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold">INVOICE</h2>
                  <p className="text-gray-500">
                    #{currentInvoiceNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p>
                    <strong>Issue Date:</strong> {form.getValues().issueDate}
                  </p>
                  <p>
                    <strong>Due Date:</strong> {form.getValues().dueDate}
                  </p>
                </div>
              </div>

              <div className="flex justify-between mb-8">
                <div>
                  <h3 className="font-semibold mb-2">From:</h3>
                  <p>Hutech Solutions</p>
                  <p>123 Hsr Layout</p>
                  <p>Bangalore, 560102</p>
                  <p>hutechsolutions@gmail.com</p>
                </div>
                <div className="text-right">
                  <h3 className="font-semibold mb-2">To:</h3>
                  <p>{form.getValues().customer}</p>
                  <p>{form.getValues().email}</p>
                  <p className="whitespace-pre-line">
                    {form.getValues().address}
                  </p>
                </div>
              </div>

              <table className="w-full mb-8">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-2">Description</th>
                    <th className="text-right p-2">Qty</th>
                    <th className="text-right p-2">Unit Price</th>
                    <th className="text-right p-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-2">{item.description}</td>
                      <td className="p-2 text-right">{item.quantity}</td>
                      <td className="p-2 text-right">
                        ₹{item.rate.toFixed(2)}
                      </td>
                      <td className="p-2 text-right">
                        ₹{item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-bold">
                    <td colSpan={3} className="text-right p-2">
                      Total:
                    </td>
                    <td className="text-right p-2">
                      ₹{calculateTotal().toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Notes:</h3>
                <p className="whitespace-pre-line">{form.getValues().notes}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Terms & Conditions:</h3>
                <p className="whitespace-pre-line">{form.getValues().terms}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between">
          <div>
            {activeStep !== "template" && (
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="h-4 w-4 mr-2" /> Back
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {activeStep !== "preview" ? (
              <Button onClick={handleNext}>
                Next <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSave}>
                <Check className="h-4 w-4 mr-2" /> Save Invoice
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceGenerator;
