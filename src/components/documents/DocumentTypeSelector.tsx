import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Handshake,
  ScrollText,
  ShieldCheck,
  Scale,
  FilePlus2,
} from "lucide-react";
import { documentTypes, getTemplatesByType } from "./templates";
import { DocumentType } from "./types";

interface DocumentTypeSelectorProps {
  selectedType?: DocumentType;
  selectedTemplateId?: string;
  onSelectType?: (type: DocumentType) => void;
  onSelectTemplate?: (templateId: string) => void;
}

const typeIcons: Record<DocumentType, React.ReactNode> = {
  nda: <ShieldCheck className="h-12 w-12 text-gray-400" />,
  mou: <Handshake className="h-12 w-12 text-gray-400" />,
  terms: <ScrollText className="h-12 w-12 text-gray-400" />,
  privacy: <FileText className="h-12 w-12 text-gray-400" />,
  compliance: <Scale className="h-12 w-12 text-gray-400" />,
  custom: <FilePlus2 className="h-12 w-12 text-gray-400" />,
};

const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({
  selectedType = "nda",
  selectedTemplateId,
  onSelectType = () => {},
  onSelectTemplate = () => {},
}) => {
  const templates = getTemplatesByType(selectedType);

  return (
    <div className="space-y-6 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentTypes.map((docType) => (
          <Card
            key={docType.type}
            role="button"
            aria-pressed={selectedType === docType.type}
            className={`cursor-pointer transition-all ${
              selectedType === docType.type
                ? "ring-2 ring-primary"
                : "hover:shadow-md"
            }`}
            onClick={() => {
              onSelectType(docType.type);
              const first = getTemplatesByType(docType.type)[0];
              if (first) onSelectTemplate(first.id);
            }}
          >
            <CardContent className="p-4">
              <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center mb-3 rounded">
                {typeIcons[docType.type]}
              </div>
              <p className="font-medium text-center">{docType.name}</p>
              <p className="text-xs text-gray-500 text-center mt-1">
                {docType.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Templates</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {templates.map((template) => (
            <Card
              key={template.id}
              role="button"
              aria-pressed={selectedTemplateId === template.id}
              className={`cursor-pointer transition-all ${
                selectedTemplateId === template.id
                  ? "ring-2 ring-primary"
                  : "hover:shadow-md"
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <CardContent className="p-4 flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-medium">{template.name}</p>
                  <p className="text-xs text-gray-500">
                    {template.description}
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {template.fields.length} dynamic fields
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentTypeSelector;
