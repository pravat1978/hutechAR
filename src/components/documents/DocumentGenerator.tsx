import React, { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import jsPDF from "jspdf";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import supabase from "@/utils/supabaseClient";
import DocumentTypeSelector from "./DocumentTypeSelector";
import {
  defaultTemplates,
  getTemplateById,
  getTemplatesByType,
  renderTemplate,
} from "./templates";
import {
  cinRegex,
  gstinRegex,
  panRegex,
  validateGeneratedDocument,
} from "./validate";
import { DocumentType, DocumentValues, Party, emptyParty } from "./types";

const steps = ["template", "details", "preview", "export"] as const;
type Step = (typeof steps)[number];

const addressSchema = z.object({
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional().default(""),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pincode: z.string().regex(/^[0-9]{4,10}$/, "Enter a valid pincode"),
});

const partySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Party name is required"),
  type: z.enum(["Company", "Individual"]),
  address: addressSchema,
  email: z.string().email("Enter a valid email").or(z.literal("")),
  phone: z.string().optional().default(""),
  pan: z
    .string()
    .refine((value) => !value || panRegex.test(value), "Invalid PAN")
    .default(""),
  gstin: z
    .string()
    .refine((value) => !value || gstinRegex.test(value), "Invalid GSTIN")
    .default(""),
  cin: z
    .string()
    .refine((value) => !value || cinRegex.test(value), "Invalid CIN")
    .default(""),
});

const formSchema = z.object({
  documentName: z.string().min(1, "Document name is required"),
  parties: z.array(partySchema).min(1, "Add at least one party"),
  values: z.record(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

const initialParty = (): Party => ({ ...emptyParty(), type: "Company" });

const defaultValuesForTemplate = (templateId: string): DocumentValues => {
  const template = getTemplateById(templateId);
  const values: DocumentValues = {};
  template?.fields.forEach((field) => {
    values[field.token] =
      field.defaultValue ??
      (field.type === "date" ? new Date().toISOString().split("T")[0] : "");
  });
  return values;
};

interface DocumentGeneratorProps {
  onSaved?: (documentId: string) => void;
}

const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({
  onSaved = () => {},
}) => {
  const [activeStep, setActiveStep] = useState<Step>("template");
  const [selectedType, setSelectedType] = useState<DocumentType>("nda");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    defaultTemplates[0].id,
  );
  const [saveState, setSaveState] = useState<{
    status: "idle" | "saving" | "saved" | "error";
    message: string;
  }>({ status: "idle", message: "" });

  const template = getTemplateById(selectedTemplateId) ?? defaultTemplates[0];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentName: template.name,
      parties: [initialParty(), initialParty()],
      values: defaultValuesForTemplate(template.id),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "parties",
  });

  useEffect(() => {
    form.setValue("documentName", template.name);
    form.setValue("values", defaultValuesForTemplate(template.id));
  }, [template.id]);

  const watched = form.watch();
  const renderedBody = useMemo(
    () =>
      renderTemplate(
        template,
        watched.values ?? {},
        (watched.parties ?? []) as Party[],
      ),
    [template, watched.values, watched.parties],
  );

  const structuralIssues = useMemo(
    () =>
      validateGeneratedDocument(
        template,
        watched.values ?? {},
        (watched.parties ?? []) as Party[],
        renderedBody,
      ),
    [template, watched.values, watched.parties, renderedBody],
  );

  const handleAddParty = () => append(initialParty());

  const handleRemoveParty = (index: number) => {
    if (fields.length <= 1) return;
    remove(index);
  };

  const handleNext = () => {
    const index = steps.indexOf(activeStep);
    if (index < steps.length - 1) setActiveStep(steps[index + 1]);
  };

  const handleBack = () => {
    const index = steps.indexOf(activeStep);
    if (index > 0) setActiveStep(steps[index - 1]);
  };

  const handleExportPdf = () => {
    const pdf = new jsPDF({ orientation: "p", unit: "px", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 24;
    const lineHeight = 14;
    let cursorY = margin;

    pdf.setFontSize(11);
    const lines = pdf.splitTextToSize(renderedBody, pageWidth - margin * 2);
    lines.forEach((line: string) => {
      if (cursorY + lineHeight > pageHeight - margin) {
        pdf.addPage();
        cursorY = margin;
      }
      pdf.text(line, margin, cursorY);
      cursorY += lineHeight;
    });

    const name = form.getValues("documentName") || "document";
    pdf.save(`${name.replace(/\s+/g, "-").toLowerCase()}.pdf`);
  };

  const handleSave = async () => {
    const valid = await form.trigger();
    if (!valid) {
      setSaveState({
        status: "error",
        message: "Please fix the highlighted form errors before saving.",
      });
      setActiveStep("details");
      return;
    }

    setSaveState({ status: "saving", message: "" });
    const data = form.getValues();
    const payload = {
      type: template.type,
      name: data.documentName,
      parties: data.parties,
      values: data.values,
      body: renderedBody,
      status: "draft",
    };

    try {
      const { data: inserted, error } = await supabase
        .from("documents")
        .insert([payload])
        .select();

      if (error) {
        // The `documents` table may not exist yet in this project.
        setSaveState({
          status: "error",
          message: `Could not save to Supabase (${error.message}). The document is still available for PDF export.`,
        });
        return;
      }

      setSaveState({ status: "saved", message: "Document saved." });
      const id = inserted?.[0]?.id;
      if (id) onSaved(String(id));
    } catch (error: unknown) {
      setSaveState({
        status: "error",
        message: `Could not save to Supabase (${error instanceof Error ? error.message : "unknown error"}). The document is still available for PDF export.`,
      });
    }
  };

  const partyErrors = form.formState.errors.parties;

  return (
    <div className="bg-white space-y-4">
      <Tabs
        value={activeStep}
        onValueChange={(value) => setActiveStep(value as Step)}
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="template">1. Type</TabsTrigger>
          <TabsTrigger value="details">2. Details</TabsTrigger>
          <TabsTrigger value="preview">3. Preview</TabsTrigger>
          <TabsTrigger value="export">4. Save / Export</TabsTrigger>
        </TabsList>

        {/* Step 1: Document type + template */}
        <TabsContent value="template" className="space-y-4 pt-4">
          <DocumentTypeSelector
            selectedType={selectedType}
            selectedTemplateId={selectedTemplateId}
            onSelectType={(type) => {
              setSelectedType(type);
              const first = getTemplatesByType(type)[0];
              if (first) setSelectedTemplateId(first.id);
            }}
            onSelectTemplate={setSelectedTemplateId}
          />
        </TabsContent>

        {/* Step 2: Parties + dynamic values */}
        <TabsContent value="details" className="space-y-6 pt-4">
          <div>
            <label className="text-sm font-medium">Document Name</label>
            <Input {...form.register("documentName")} />
            {form.formState.errors.documentName && (
              <p className="text-xs text-red-600 mt-1">
                {form.formState.errors.documentName.message}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Parties</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddParty}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Party
              </Button>
            </div>

            {fields.map((field, index) => (
              <Card key={field.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base">
                    Party {index + 1}
                  </CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove party ${index + 1}`}
                    disabled={fields.length <= 1}
                    onClick={() => handleRemoveParty(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input {...form.register(`parties.${index}.name`)} />
                    {partyErrors?.[index]?.name && (
                      <p className="text-xs text-red-600 mt-1">
                        {partyErrors[index]?.name?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <Select
                      value={form.watch(`parties.${index}.type`)}
                      onValueChange={(value) =>
                        form.setValue(
                          `parties.${index}.type`,
                          value as Party["type"],
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Company">Company</SelectItem>
                        <SelectItem value="Individual">Individual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input {...form.register(`parties.${index}.email`)} />
                    {partyErrors?.[index]?.email && (
                      <p className="text-xs text-red-600 mt-1">
                        {partyErrors[index]?.email?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input {...form.register(`parties.${index}.phone`)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Address Line 1
                    </label>
                    <Input
                      {...form.register(`parties.${index}.address.addressLine1`)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Address Line 2
                    </label>
                    <Input
                      {...form.register(`parties.${index}.address.addressLine2`)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">City</label>
                    <Input {...form.register(`parties.${index}.address.city`)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">State</label>
                    <Input
                      {...form.register(`parties.${index}.address.state`)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Country</label>
                    <Input
                      {...form.register(`parties.${index}.address.country`)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Pincode</label>
                    <Input
                      {...form.register(`parties.${index}.address.pincode`)}
                    />
                    {partyErrors?.[index]?.address?.pincode && (
                      <p className="text-xs text-red-600 mt-1">
                        {partyErrors[index]?.address?.pincode?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">PAN</label>
                    <Input
                      {...form.register(`parties.${index}.pan`)}
                      placeholder="ABCDE1234F"
                    />
                    {partyErrors?.[index]?.pan && (
                      <p className="text-xs text-red-600 mt-1">
                        {partyErrors[index]?.pan?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">GSTIN</label>
                    <Input {...form.register(`parties.${index}.gstin`)} />
                    {partyErrors?.[index]?.gstin && (
                      <p className="text-xs text-red-600 mt-1">
                        {partyErrors[index]?.gstin?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">CIN</label>
                    <Input {...form.register(`parties.${index}.cin`)} />
                    {partyErrors?.[index]?.cin && (
                      <p className="text-xs text-red-600 mt-1">
                        {partyErrors[index]?.cin?.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-3">Dynamic Values</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {template.fields.map((field) => (
                <div
                  key={field.token}
                  className={field.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <label className="text-sm font-medium">
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-0.5">*</span>
                    )}
                  </label>
                  {field.type === "textarea" ? (
                    <Textarea
                      {...form.register(`values.${field.token}` as const)}
                      placeholder={`{{${field.token}}}`}
                    />
                  ) : (
                    <Input
                      type={field.type === "date" ? "date" : "text"}
                      {...form.register(`values.${field.token}` as const)}
                      placeholder={`{{${field.token}}}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Step 3: Preview */}
        <TabsContent value="preview" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">
                  {watched.documentName || template.name}
                </CardTitle>
                <CardDescription>
                  Preview generated from {template.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                  {renderedBody}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Validation</CardTitle>
                <CardDescription>
                  {structuralIssues.length === 0
                    ? "No issues found."
                    : `${structuralIssues.length} item(s) to review.`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {structuralIssues.length === 0 && (
                  <div className="flex items-center text-sm text-green-700">
                    <Check className="h-4 w-4 mr-2" /> Document is complete.
                  </div>
                )}
                {structuralIssues.map((issue, index) => (
                  <div
                    key={`${issue.field}-${index}`}
                    className="flex items-start gap-2 text-sm"
                  >
                    <AlertTriangle
                      className={`h-4 w-4 mt-0.5 ${
                        issue.severity === "critical"
                          ? "text-red-600"
                          : issue.severity === "warning"
                            ? "text-amber-600"
                            : "text-blue-600"
                      }`}
                    />
                    <div>
                      <Badge
                        variant="outline"
                        className="mr-2 text-[10px] uppercase"
                      >
                        {issue.severity}
                      </Badge>
                      <span className="text-gray-700">{issue.message}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Step 4: Save / export */}
        <TabsContent value="export" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Save & Export</CardTitle>
              <CardDescription>
                Persist the document to Supabase or download it as a PDF.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <Button
                  onClick={handleSave}
                  disabled={saveState.status === "saving"}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saveState.status === "saving" ? "Saving…" : "Save Document"}
                </Button>
                <Button variant="outline" onClick={handleExportPdf}>
                  <Download className="h-4 w-4 mr-2" /> Export PDF
                </Button>
              </div>
              {saveState.message && (
                <p
                  className={`text-sm ${
                    saveState.status === "error"
                      ? "text-red-600"
                      : "text-green-700"
                  }`}
                >
                  {saveState.message}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={activeStep === steps[0]}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={activeStep === steps[steps.length - 1]}
        >
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default DocumentGenerator;
