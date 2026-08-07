import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentGenerator from "./DocumentGenerator";
import DocumentValidator from "./DocumentValidator";

const DocumentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("create");

  return (
    <div className="bg-gray-100 min-h-full p-0 md:p-0 space-y-4">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Document Creator</CardTitle>
          <CardDescription>
            Generate corporate and legal documents from templates, or upload an
            existing document to validate it and highlight critical clauses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="validate">Validate / Upload</TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="pt-4">
              <DocumentGenerator />
            </TabsContent>

            <TabsContent value="validate" className="pt-4">
              <DocumentValidator />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsPage;
