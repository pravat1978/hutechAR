import {
  DocumentTemplate,
  DocumentType,
  DocumentValues,
  Party,
  formatAddress,
} from "./types";

const commonFields = [
  {
    token: "EFFECTIVE_DATE",
    label: "Effective Date",
    type: "date" as const,
    required: true,
  },
  {
    token: "GOVERNING_LAW",
    label: "Governing Law",
    type: "text" as const,
    required: true,
    defaultValue: "the laws of India",
  },
  {
    token: "JURISDICTION",
    label: "Jurisdiction",
    type: "text" as const,
    required: true,
    defaultValue: "the courts at Bengaluru, Karnataka",
  },
];

export const documentTypes: {
  type: DocumentType;
  name: string;
  description: string;
}[] = [
  {
    type: "nda",
    name: "Non-Disclosure Agreement",
    description: "Protect confidential information exchanged between parties.",
  },
  {
    type: "mou",
    name: "Memorandum of Understanding",
    description: "Record the intent and scope of a proposed collaboration.",
  },
  {
    type: "terms",
    name: "Terms & Conditions",
    description: "Terms governing the use of your product or service.",
  },
  {
    type: "privacy",
    name: "Privacy Policy",
    description: "Describe how personal data is collected and processed.",
  },
  {
    type: "compliance",
    name: "Compliance Policy",
    description: "Internal policy covering regulatory compliance obligations.",
  },
  {
    type: "custom",
    name: "Custom Document",
    description: "Start from a blank body and define your own clauses.",
  },
];

const ndaBody = `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement (the "Agreement") is made and entered into on {{EFFECTIVE_DATE}} by and between:

{{PARTIES_BLOCK}}

(each a "Party" and collectively the "Parties").

1. PURPOSE
The Parties wish to explore {{PURPOSE}} (the "Purpose") and in connection with the Purpose may disclose to each other certain confidential and proprietary information.

2. CONFIDENTIAL INFORMATION
"Confidential Information" means any non-public information disclosed by a Party, whether orally, in writing or in any other form, including business plans, customer data, pricing, technical data and trade secrets.

3. OBLIGATIONS
The receiving Party shall keep all Confidential Information strictly confidential, shall not disclose it to any third party without prior written consent, and shall use it solely for the Purpose.

4. TERM
This Agreement shall remain in force for {{TERM_DURATION}} from the Effective Date. The confidentiality obligations shall survive for {{SURVIVAL_PERIOD}} after termination.

5. EXCLUSIONS
Confidential Information does not include information that is or becomes publicly available without breach of this Agreement, or that is independently developed by the receiving Party.

6. INDEMNIFICATION
Each Party shall indemnify and hold harmless the other Party against any loss arising from a breach of this Agreement by the indemnifying Party.

7. GOVERNING LAW AND JURISDICTION
This Agreement shall be governed by and construed in accordance with {{GOVERNING_LAW}}. The Parties submit to the exclusive jurisdiction of {{JURISDICTION}}.

8. TERMINATION
Either Party may terminate this Agreement by giving {{NOTICE_PERIOD}} prior written notice to the other Party.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.

{{SIGNATURE_BLOCK}}`;

const mouBody = `MEMORANDUM OF UNDERSTANDING

This Memorandum of Understanding (this "MOU") is entered into on {{EFFECTIVE_DATE}} between:

{{PARTIES_BLOCK}}

1. OBJECTIVE
The Parties intend to collaborate on {{PURPOSE}}.

2. SCOPE OF COOPERATION
{{SCOPE}}

3. ROLES AND RESPONSIBILITIES
{{RESPONSIBILITIES}}

4. FINANCIAL ARRANGEMENTS
Unless separately agreed in writing, each Party shall bear its own costs incurred under this MOU. Any shared cost shall be governed by {{COST_SHARING}}.

5. CONFIDENTIALITY
Each Party shall treat as confidential all non-public information received from the other Party under this MOU.

6. TERM AND TERMINATION
This MOU is effective from {{EFFECTIVE_DATE}} and shall continue for {{TERM_DURATION}}, unless terminated earlier by either Party with {{NOTICE_PERIOD}} written notice.

7. NON-BINDING NATURE
Except for the clauses on confidentiality, governing law and jurisdiction, this MOU is a statement of intent and is not legally binding.

8. GOVERNING LAW
This MOU shall be governed by {{GOVERNING_LAW}} and subject to the jurisdiction of {{JURISDICTION}}.

{{SIGNATURE_BLOCK}}`;

const termsBody = `TERMS AND CONDITIONS

Last updated: {{EFFECTIVE_DATE}}

These Terms and Conditions (the "Terms") govern the use of {{SERVICE_NAME}} provided by:

{{PARTIES_BLOCK}}

1. ACCEPTANCE OF TERMS
By accessing or using the Service, the user agrees to be bound by these Terms.

2. ACCOUNTS AND ELIGIBILITY
Users must provide accurate registration information and are responsible for safeguarding their credentials.

3. FEES AND PAYMENT
Fees for the Service are payable as per the applicable plan. Invoices are due within {{PAYMENT_TERMS}}. Overdue amounts may attract a penalty of {{LATE_FEE}}.

4. SUBSCRIPTION AND AUTO-RENEWAL
Subscriptions renew automatically for successive periods of {{RENEWAL_TERM}} unless cancelled at least {{NOTICE_PERIOD}} before the renewal date.

5. ACCEPTABLE USE
Users shall not misuse the Service, reverse engineer it, or use it in violation of applicable law.

6. INTELLECTUAL PROPERTY
All intellectual property in the Service remains with {{SERVICE_PROVIDER}}.

7. LIMITATION OF LIABILITY
To the maximum extent permitted by law, the total aggregate liability of the provider shall not exceed {{LIABILITY_CAP}}. The provider shall not be liable for indirect or consequential losses.

8. INDEMNIFICATION
The user shall indemnify the provider against claims arising from the user's breach of these Terms.

9. TERMINATION
Either party may terminate the Service with {{NOTICE_PERIOD}} written notice. The provider may suspend access immediately for material breach.

10. DISPUTE RESOLUTION AND ARBITRATION
Disputes shall be referred to arbitration seated at {{ARBITRATION_SEAT}} in accordance with applicable arbitration rules.

11. GOVERNING LAW
These Terms are governed by {{GOVERNING_LAW}}, subject to the jurisdiction of {{JURISDICTION}}.

{{SIGNATURE_BLOCK}}`;

const privacyBody = `PRIVACY POLICY

Effective date: {{EFFECTIVE_DATE}}

This Privacy Policy explains how personal data is collected, used and protected by:

{{PARTIES_BLOCK}}

1. DATA WE COLLECT
We collect identity data, contact data, transaction data, technical data and usage data relating to {{SERVICE_NAME}}.

2. PURPOSE OF PROCESSING
Personal data is processed to provide the Service, to comply with legal obligations, and for {{PROCESSING_PURPOSE}}.

3. LEGAL BASIS
Processing is carried out on the basis of consent, contractual necessity, legal obligation, or legitimate interests.

4. DATA SHARING
Personal data may be shared with processors and service providers listed at {{SUBPROCESSORS}}, subject to confidentiality obligations.

5. DATA RETENTION
Personal data is retained for {{RETENTION_PERIOD}} unless a longer period is required by law.

6. SECURITY
Appropriate technical and organisational measures are implemented to protect personal data against unauthorised access, loss or disclosure.

7. DATA SUBJECT RIGHTS
Users may request access, correction, erasure, or portability of their personal data by writing to {{DPO_EMAIL}}.

8. CROSS-BORDER TRANSFERS
Where personal data is transferred outside {{DATA_REGION}}, appropriate safeguards are applied.

9. GRIEVANCE REDRESSAL
Complaints may be addressed to the Grievance Officer at {{DPO_EMAIL}}.

10. GOVERNING LAW
This Policy is governed by {{GOVERNING_LAW}} and the jurisdiction of {{JURISDICTION}}.`;

const complianceBody = `COMPLIANCE POLICY

Effective date: {{EFFECTIVE_DATE}}

Issued by:

{{PARTIES_BLOCK}}

1. PURPOSE AND SCOPE
This policy sets out the compliance obligations applicable to all employees, contractors and representatives in relation to {{SCOPE}}.

2. REGULATORY FRAMEWORK
The organisation shall comply with {{APPLICABLE_REGULATIONS}} and all other applicable statutory requirements.

3. ROLES AND RESPONSIBILITIES
The Compliance Officer, {{COMPLIANCE_OFFICER}}, is responsible for monitoring adherence to this policy and reporting breaches to management.

4. ANTI-BRIBERY AND CONFLICTS OF INTEREST
Personnel shall not offer or accept any improper payment and shall disclose any conflict of interest.

5. RECORD KEEPING
Records shall be retained for {{RETENTION_PERIOD}} and made available for audit on request.

6. TRAINING
Mandatory compliance training shall be conducted every {{TRAINING_FREQUENCY}}.

7. REPORTING AND WHISTLEBLOWING
Suspected violations may be reported confidentially to {{REPORTING_CHANNEL}}. Retaliation against a good-faith reporter is prohibited.

8. CONSEQUENCES OF NON-COMPLIANCE
Non-compliance may lead to disciplinary action, including termination of employment, and may attract a penalty under applicable law.

9. REVIEW
This policy shall be reviewed at least once every {{REVIEW_FREQUENCY}}.

10. GOVERNING LAW
This policy is governed by {{GOVERNING_LAW}}.`;

const customBody = `{{DOCUMENT_TITLE}}

Effective date: {{EFFECTIVE_DATE}}

Between:

{{PARTIES_BLOCK}}

1. PURPOSE
{{PURPOSE}}

2. TERMS
{{CUSTOM_CLAUSES}}

3. GOVERNING LAW
This document is governed by {{GOVERNING_LAW}} and subject to the jurisdiction of {{JURISDICTION}}.

{{SIGNATURE_BLOCK}}`;

const text = (
  token: string,
  label: string,
  required = true,
  defaultValue?: string,
) => ({ token, label, type: "text" as const, required, defaultValue });

const area = (token: string, label: string, required = true) => ({
  token,
  label,
  type: "textarea" as const,
  required,
});

export const defaultTemplates: DocumentTemplate[] = [
  {
    id: "nda-standard",
    name: "Mutual Non-Disclosure Agreement",
    type: "nda",
    description: "Two-way confidentiality agreement with survival period.",
    body: ndaBody,
    fields: [
      ...commonFields,
      area("PURPOSE", "Purpose of Disclosure"),
      text("TERM_DURATION", "Term Duration", true, "two (2) years"),
      text("SURVIVAL_PERIOD", "Survival Period", true, "three (3) years"),
      text("NOTICE_PERIOD", "Notice Period", true, "thirty (30) days"),
    ],
  },
  {
    id: "mou-standard",
    name: "Memorandum of Understanding",
    type: "mou",
    description: "Non-binding collaboration MOU with scope and roles.",
    body: mouBody,
    fields: [
      ...commonFields,
      area("PURPOSE", "Objective of Collaboration"),
      area("SCOPE", "Scope of Cooperation"),
      area("RESPONSIBILITIES", "Roles and Responsibilities"),
      text(
        "COST_SHARING",
        "Cost Sharing Arrangement",
        true,
        "a separate written agreement",
      ),
      text("TERM_DURATION", "Term Duration", true, "one (1) year"),
      text("NOTICE_PERIOD", "Notice Period", true, "thirty (30) days"),
    ],
  },
  {
    id: "terms-standard",
    name: "Terms & Conditions",
    type: "terms",
    description: "SaaS-style terms with liability cap and arbitration.",
    body: termsBody,
    fields: [
      ...commonFields,
      text("SERVICE_NAME", "Service Name"),
      text("SERVICE_PROVIDER", "Service Provider"),
      text("PAYMENT_TERMS", "Payment Terms", true, "thirty (30) days"),
      text("LATE_FEE", "Late Payment Fee", true, "1.5% per month"),
      text("RENEWAL_TERM", "Renewal Term", true, "twelve (12) months"),
      text("NOTICE_PERIOD", "Notice Period", true, "thirty (30) days"),
      text(
        "LIABILITY_CAP",
        "Liability Cap",
        true,
        "the fees paid in the preceding twelve (12) months",
      ),
      text("ARBITRATION_SEAT", "Arbitration Seat", true, "Bengaluru, India"),
    ],
  },
  {
    id: "privacy-standard",
    name: "Privacy Policy",
    type: "privacy",
    description: "Data protection notice with retention and data rights.",
    body: privacyBody,
    fields: [
      ...commonFields,
      text("SERVICE_NAME", "Service Name"),
      area("PROCESSING_PURPOSE", "Additional Processing Purposes"),
      text("SUBPROCESSORS", "Sub-processor List / URL", false),
      text("RETENTION_PERIOD", "Retention Period", true, "seven (7) years"),
      text("DPO_EMAIL", "Data Protection Contact Email"),
      text("DATA_REGION", "Primary Data Region", true, "India"),
    ],
  },
  {
    id: "compliance-standard",
    name: "Compliance Policy",
    type: "compliance",
    description: "Internal regulatory compliance policy.",
    body: complianceBody,
    fields: [
      ...commonFields,
      area("SCOPE", "Scope"),
      text("APPLICABLE_REGULATIONS", "Applicable Regulations"),
      text("COMPLIANCE_OFFICER", "Compliance Officer"),
      text("RETENTION_PERIOD", "Record Retention Period", true, "eight (8) years"),
      text("TRAINING_FREQUENCY", "Training Frequency", true, "twelve (12) months"),
      text("REPORTING_CHANNEL", "Reporting Channel"),
      text("REVIEW_FREQUENCY", "Review Frequency", true, "twelve (12) months"),
    ],
  },
  {
    id: "custom-blank",
    name: "Custom Document",
    type: "custom",
    description: "Blank structure you can fill with your own clauses.",
    body: customBody,
    fields: [
      ...commonFields,
      text("DOCUMENT_TITLE", "Document Title"),
      area("PURPOSE", "Purpose"),
      area("CUSTOM_CLAUSES", "Clauses"),
    ],
  },
];

export const getTemplateById = (id: string): DocumentTemplate | undefined =>
  defaultTemplates.find((template) => template.id === id);

export const getTemplatesByType = (type: DocumentType): DocumentTemplate[] =>
  defaultTemplates.filter((template) => template.type === type);

const partyBlock = (parties: Party[]): string =>
  parties
    .map((party, index) => {
      const lines = [
        `(${index + 1}) ${party.name || `[PARTY_${index + 1}_NAME]`}, a ${party.type === "Company" ? "company" : "natural person"} having its address at ${formatAddress(party.address) || "[ADDRESS]"}`,
      ];
      const identifiers = [
        party.pan ? `PAN: ${party.pan}` : "",
        party.gstin ? `GSTIN: ${party.gstin}` : "",
        party.cin ? `CIN: ${party.cin}` : "",
      ].filter(Boolean);
      if (identifiers.length) lines.push(`    ${identifiers.join(" | ")}`);
      const contact = [
        party.email ? `Email: ${party.email}` : "",
        party.phone ? `Phone: ${party.phone}` : "",
      ].filter(Boolean);
      if (contact.length) lines.push(`    ${contact.join(" | ")}`);
      return lines.join("\n");
    })
    .join("\n\n");

const signatureBlock = (parties: Party[]): string =>
  parties
    .map(
      (party, index) =>
        `For ${party.name || `[PARTY_${index + 1}_NAME]`}\n\n_______________________\nName:\nDesignation:\nDate:`,
    )
    .join("\n\n");

/**
 * Replaces {{TOKEN}} placeholders in the template body with entered values.
 * Party-derived tokens ({{PARTY_1_NAME}}, {{PARTIES_BLOCK}}, {{SIGNATURE_BLOCK}})
 * are resolved from the parties list; unresolved tokens are left visible.
 */
export const renderTemplate = (
  template: DocumentTemplate,
  values: DocumentValues,
  parties: Party[] = [],
): string => {
  const resolved: DocumentValues = {
    ...values,
    PARTIES_BLOCK: partyBlock(parties),
    SIGNATURE_BLOCK: signatureBlock(parties),
  };

  parties.forEach((party, index) => {
    const n = index + 1;
    resolved[`PARTY_${n}_NAME`] = party.name;
    resolved[`PARTY_${n}_TYPE`] = party.type;
    resolved[`PARTY_${n}_ADDRESS`] = formatAddress(party.address);
    resolved[`PARTY_${n}_EMAIL`] = party.email;
    resolved[`PARTY_${n}_PHONE`] = party.phone;
    resolved[`PARTY_${n}_PAN`] = party.pan;
    resolved[`PARTY_${n}_GSTIN`] = party.gstin;
    resolved[`PARTY_${n}_CIN`] = party.cin;
  });

  return template.body.replace(/\{\{([A-Z0-9_]+)\}\}/g, (match, token) => {
    const value = resolved[token];
    return value !== undefined && value !== "" ? value : match;
  });
};

export const findUnfilledTokens = (body: string): string[] =>
  Array.from(new Set(body.match(/\{\{[A-Z0-9_]+\}\}/g) ?? []));
