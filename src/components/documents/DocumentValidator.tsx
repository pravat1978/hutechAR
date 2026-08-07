import React, { useMemo, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, FileUp, Info, Loader2, ShieldAlert } from "lucide-react";
import { analyzeDocument, buildHighlightSegments } from "./validate";
import { Finding, Severity } from "./types";

const severityStyles: Record<Severity, string> = {
  critical: "bg-red-100 text-red-900 border-b-2 border-red-400",
  warning: "bg-amber-100 text-amber-900 border-b-2 border-amber-400",
  info: "bg-blue-100 text-blue-900 border-b-2 border-blue-400",
};

const severityBadge: Record<Severity, string> = {
  critical: "bg-red-100 text-red-800 hover:bg-red-100",
  warning: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  info: "bg-blue-100 text-blue-800 hover:bg-blue-100",
};

const severityIcon = (severity: Severity) => {
  if (severity === "critical")
    return <ShieldAlert className="h-4 w-4 text-red-600" />;
  if (severity === "warning")
    return <AlertTriangle className="h-4 w-4 text-amber-600" />;
  return <Info className="h-4 w-4 text-blue-600" />;
};

const extractTxt = (file: File): Promise<string> => file.text();

const extractPdf = async (file: File): Promise<string> => {
  const pdfjs = await import("pdfjs-dist");
  const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;

  const buffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: buffer }).promise;
  const pages: string[] = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(
      content.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ")
        .replace(/\s+\n/g, "\n"),
    );
  }
  return pages.join("\n\n");
};

const extractDocx = async (file: File): Promise<string> => {
  const mammoth = await import("mammoth");
  const buffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value;
};

const DocumentValidator: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [activeFindingId, setActiveFindingId] = useState<string>("");

  const findings = useMemo(
    () => (text ? analyzeDocument(text) : []),
    [text],
  );
  const segments = useMemo(
    () => buildHighlightSegments(text, findings),
    [text, findings],
  );

  const counts = useMemo(
    () =>
      findings.reduce<Record<Severity, number>>(
        (acc, finding) => {
          acc[finding.severity] += 1;
          return acc;
        },
        { critical: 0, warning: 0, info: 0 },
      ),
    [findings],
  );

  const handleFile = async (file: File) => {
    setLoading(true);
    setError("");
    setFileName(file.name);
    try {
      const extension = file.name.split(".").pop()?.toLowerCase();
      let extracted = "";
      if (extension === "txt") extracted = await extractTxt(file);
      else if (extension === "pdf") extracted = await extractPdf(file);
      else if (extension === "docx") extracted = await extractDocx(file);
      else throw new Error("Unsupported file type. Upload .txt, .pdf or .docx");

      if (!extracted.trim())
        throw new Error(
          "No text could be extracted. The file may be a scanned image.",
        );
      setText(extracted);
    } catch (err: unknown) {
      setText("");
      setError(err instanceof Error ? err.message : "Failed to read the file.");
    } finally {
      setLoading(false);
    }
  };

  const groupedFindings = useMemo(() => {
    const groups = new Map<string, Finding[]>();
    findings.forEach((finding) => {
      const existing = groups.get(finding.title) ?? [];
      existing.push(finding);
      groups.set(finding.title, existing);
    });
    return Array.from(groups.entries());
  }, [findings]);

  return (
    <div className="bg-white space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upload a document</CardTitle>
          <CardDescription>
            Supported formats: .txt, .pdf, .docx. Text is extracted in your
            browser and analysed for critical clauses.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="file"
            accept=".txt,.pdf,.docx"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <Button onClick={() => inputRef.current?.click()} disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <FileUp className="h-4 w-4 mr-2" />
            )}
            {loading ? "Extracting…" : "Choose file"}
          </Button>
          {fileName && (
            <span className="text-sm text-gray-600">{fileName}</span>
          )}
          {error && <span className="text-sm text-red-600">{error}</span>}
        </CardContent>
      </Card>

      {text && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Document text</CardTitle>
              <CardDescription>
                Matched clauses are highlighted by severity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                  {segments.map((segment, index) =>
                    segment.finding ? (
                      <mark
                        key={index}
                        id={`finding-${segment.finding.id}`}
                        className={`rounded px-0.5 ${severityStyles[segment.finding.severity]} ${
                          activeFindingId === segment.finding.id
                            ? "ring-2 ring-offset-1 ring-gray-500"
                            : ""
                        }`}
                        title={segment.finding.title}
                      >
                        {segment.text}
                      </mark>
                    ) : (
                      <span key={index}>{segment.text}</span>
                    ),
                  )}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Critical points</CardTitle>
              <CardDescription className="flex gap-2 pt-1">
                <Badge className={severityBadge.critical}>
                  {counts.critical} critical
                </Badge>
                <Badge className={severityBadge.warning}>
                  {counts.warning} warning
                </Badge>
                <Badge className={severityBadge.info}>{counts.info} info</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {groupedFindings.map(([title, group]) => (
                    <div key={title} className="space-y-2">
                      <div className="flex items-center gap-2">
                        {severityIcon(group[0].severity)}
                        <span className="text-sm font-medium">{title}</span>
                        <Badge variant="outline" className="text-[10px]">
                          {group.length}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        {group[0].recommendation}
                      </p>
                      {group.slice(0, 5).map((finding) => (
                        <button
                          key={finding.id}
                          type="button"
                          className="block w-full text-left text-xs text-gray-700 bg-gray-50 hover:bg-gray-100 rounded p-2"
                          onClick={() => {
                            setActiveFindingId(finding.id);
                            document
                              .getElementById(`finding-${finding.id}`)
                              ?.scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                              });
                          }}
                        >
                          {finding.snippet}
                        </button>
                      ))}
                    </div>
                  ))}
                  {groupedFindings.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No critical clauses detected.
                    </p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DocumentValidator;
