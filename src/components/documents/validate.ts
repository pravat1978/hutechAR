import { DocumentTemplate, DocumentValues, Finding, Party, Severity } from "./types";
import { findUnfilledTokens } from "./templates";

export const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
export const cinRegex = /^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
export const gstinRegex =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

interface ClauseRule {
  id: string;
  title: string;
  severity: Severity;
  pattern: RegExp;
  recommendation: string;
}

const clauseRules: ClauseRule[] = [
  {
    id: "indemnity",
    title: "Indemnity obligation",
    severity: "critical",
    pattern: /indemnif\w*/gi,
    recommendation:
      "Check whether the indemnity is mutual and whether it is capped by the liability clause.",
  },
  {
    id: "liability",
    title: "Limitation of liability",
    severity: "critical",
    pattern: /limitation of liability|limit\w* of liability|liability shall not exceed|aggregate liability/gi,
    recommendation:
      "Confirm the liability cap amount and the carve-outs excluded from the cap.",
  },
  {
    id: "non-compete",
    title: "Non-compete restriction",
    severity: "critical",
    pattern: /non-compete|non compete|shall not compete|restraint of trade/gi,
    recommendation:
      "Non-compete restrictions may be unenforceable; verify duration and territory.",
  },
  {
    id: "penalty",
    title: "Penalty / liquidated damages",
    severity: "critical",
    pattern: /penalt\w*|liquidated damages|late fee/gi,
    recommendation: "Verify the penalty rate and the trigger conditions.",
  },
  {
    id: "auto-renew",
    title: "Automatic renewal",
    severity: "warning",
    pattern: /auto-?renew\w*|renew\w* automatically|automatically renew\w*/gi,
    recommendation:
      "Note the cancellation window required to avoid an automatic renewal.",
  },
  {
    id: "termination",
    title: "Termination rights",
    severity: "warning",
    pattern: /terminat\w*/gi,
    recommendation:
      "Confirm notice periods and whether termination for convenience is available to both sides.",
  },
  {
    id: "arbitration",
    title: "Arbitration / dispute resolution",
    severity: "warning",
    pattern: /arbitrat\w*|dispute resolution/gi,
    recommendation: "Check the arbitration seat, rules and cost allocation.",
  },
  {
    id: "governing-law",
    title: "Governing law",
    severity: "info",
    pattern: /governing law|governed by/gi,
    recommendation: "Confirm the governing law and exclusive jurisdiction.",
  },
  {
    id: "confidentiality",
    title: "Confidentiality obligation",
    severity: "info",
    pattern: /confidential\w*/gi,
    recommendation:
      "Check the confidentiality term and the exclusions from confidential information.",
  },
  {
    id: "assignment",
    title: "Assignment / change of control",
    severity: "info",
    pattern: /assign\w* this agreement|change of control/gi,
    recommendation: "Check whether assignment requires prior written consent.",
  },
];

const effectiveDatePattern =
  /(effective\s+(date|from)|dated|entered into on|last updated)/i;

const datePattern =
  /(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{4}-\d{2}-\d{2}|\b\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b)/i;

const partyPattern =
  /(between|by and between|party of the first part|the parties)/i;

const MAX_MATCHES_PER_RULE = 25;

const snippetAround = (text: string, index: number, length: number): string => {
  const start = Math.max(0, index - 80);
  const end = Math.min(text.length, index + length + 80);
  return `${start > 0 ? "…" : ""}${text.slice(start, end).trim()}${end < text.length ? "…" : ""}`;
};

/**
 * Rules-based clause analyzer: scans plain text for critical/risky clauses and
 * returns findings ordered by their position in the document.
 */
export const analyzeDocument = (text: string): Finding[] => {
  const findings: Finding[] = [];

  clauseRules.forEach((rule) => {
    const pattern = new RegExp(rule.pattern.source, rule.pattern.flags);
    let match: RegExpExecArray | null;
    let count = 0;
    while ((match = pattern.exec(text)) !== null && count < MAX_MATCHES_PER_RULE) {
      if (match[0].length === 0) {
        pattern.lastIndex += 1;
        continue;
      }
      findings.push({
        id: `${rule.id}-${match.index}`,
        rule: rule.id,
        title: rule.title,
        severity: rule.severity,
        snippet: snippetAround(text, match.index, match[0].length),
        offset: match.index,
        length: match[0].length,
        recommendation: rule.recommendation,
      });
      count += 1;
    }
  });

  if (!effectiveDatePattern.test(text) || !datePattern.test(text)) {
    findings.push({
      id: "missing-effective-date",
      rule: "missing-effective-date",
      title: "Missing effective date",
      severity: "critical",
      snippet: "No effective date could be detected in the document.",
      offset: 0,
      length: 0,
      recommendation: "Add an explicit effective date to the document.",
    });
  }

  if (!partyPattern.test(text)) {
    findings.push({
      id: "missing-parties",
      rule: "missing-parties",
      title: "Missing party identification",
      severity: "critical",
      snippet: "No clearly identified parties were detected.",
      offset: 0,
      length: 0,
      recommendation:
        "Add a parties clause naming each party with address and legal identifiers.",
    });
  }

  if (!/limitation of liability|liability/i.test(text)) {
    findings.push({
      id: "missing-liability",
      rule: "missing-liability",
      title: "No limitation of liability clause",
      severity: "warning",
      snippet: "No liability clause was detected.",
      offset: 0,
      length: 0,
      recommendation: "Consider adding a limitation of liability clause.",
    });
  }

  return findings.sort((a, b) => a.offset - b.offset);
};

export interface HighlightSegment {
  text: string;
  finding?: Finding;
}

/**
 * Splits text into segments, attaching the highest-severity finding to each
 * matched range. Overlapping matches keep the first (most severe) one.
 */
export const buildHighlightSegments = (
  text: string,
  findings: Finding[],
): HighlightSegment[] => {
  const severityRank: Record<Severity, number> = {
    critical: 0,
    warning: 1,
    info: 2,
  };
  const ranged = findings
    .filter((finding) => finding.length > 0)
    .sort(
      (a, b) =>
        a.offset - b.offset || severityRank[a.severity] - severityRank[b.severity],
    );

  const segments: HighlightSegment[] = [];
  let cursor = 0;
  ranged.forEach((finding) => {
    if (finding.offset < cursor) return;
    if (finding.offset > cursor) {
      segments.push({ text: text.slice(cursor, finding.offset) });
    }
    segments.push({
      text: text.slice(finding.offset, finding.offset + finding.length),
      finding,
    });
    cursor = finding.offset + finding.length;
  });
  if (cursor < text.length) segments.push({ text: text.slice(cursor) });
  return segments;
};

export interface StructuralIssue {
  field: string;
  message: string;
  severity: Severity;
}

/**
 * Structural validation for generated documents: required parties, filled
 * placeholders and valid PAN/GSTIN/CIN formats.
 */
export const validateGeneratedDocument = (
  template: DocumentTemplate,
  values: DocumentValues,
  parties: Party[],
  renderedBody: string,
): StructuralIssue[] => {
  const issues: StructuralIssue[] = [];

  if (parties.length === 0) {
    issues.push({
      field: "parties",
      message: "At least one party is required.",
      severity: "critical",
    });
  }

  parties.forEach((party, index) => {
    const label = party.name || `Party ${index + 1}`;
    if (!party.name.trim()) {
      issues.push({
        field: `parties.${index}.name`,
        message: `Party ${index + 1} is missing a name.`,
        severity: "critical",
      });
    }
    if (!party.address.addressLine1.trim() || !party.address.city.trim()) {
      issues.push({
        field: `parties.${index}.address`,
        message: `${label} is missing a complete address.`,
        severity: "warning",
      });
    }
    if (party.pan && !panRegex.test(party.pan)) {
      issues.push({
        field: `parties.${index}.pan`,
        message: `${label} has an invalid PAN (expected format ABCDE1234F).`,
        severity: "critical",
      });
    }
    if (party.gstin && !gstinRegex.test(party.gstin)) {
      issues.push({
        field: `parties.${index}.gstin`,
        message: `${label} has an invalid GSTIN.`,
        severity: "critical",
      });
    }
    if (party.cin && !cinRegex.test(party.cin)) {
      issues.push({
        field: `parties.${index}.cin`,
        message: `${label} has an invalid CIN.`,
        severity: "critical",
      });
    }
    if (party.type === "Company" && !party.cin && !party.gstin) {
      issues.push({
        field: `parties.${index}.identifiers`,
        message: `${label} is a company but has no CIN or GSTIN recorded.`,
        severity: "info",
      });
    }
  });

  template.fields
    .filter((field) => field.required)
    .forEach((field) => {
      if (!values[field.token] || !values[field.token].trim()) {
        issues.push({
          field: field.token,
          message: `${field.label} is required.`,
          severity: "critical",
        });
      }
    });

  findUnfilledTokens(renderedBody).forEach((token) => {
    issues.push({
      field: token,
      message: `Placeholder ${token} is still unfilled in the document body.`,
      severity: "warning",
    });
  });

  return issues;
};
