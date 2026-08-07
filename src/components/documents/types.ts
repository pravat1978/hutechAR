export type DocumentType =
  | "nda"
  | "mou"
  | "terms"
  | "privacy"
  | "compliance"
  | "custom";

export type PartyType = "Company" | "Individual";

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface Party {
  id: string;
  name: string;
  type: PartyType;
  address: Address;
  email: string;
  phone: string;
  pan: string;
  gstin: string;
  cin: string;
}

export interface DynamicField {
  token: string;
  label: string;
  type: "text" | "date" | "textarea";
  required: boolean;
  defaultValue?: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  type: DocumentType;
  description: string;
  body: string;
  fields: DynamicField[];
}

export type DocumentValues = Record<string, string>;

export interface GeneratedDocument {
  id?: string;
  type: DocumentType;
  name: string;
  parties: Party[];
  values: DocumentValues;
  body: string;
  status: string;
  created_at?: string;
}

export type Severity = "critical" | "warning" | "info";

export interface Finding {
  id: string;
  rule: string;
  title: string;
  severity: Severity;
  snippet: string;
  offset: number;
  length: number;
  recommendation: string;
}

export const emptyAddress = (): Address => ({
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
});

export const emptyParty = (): Party => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  name: "",
  type: "Company",
  address: emptyAddress(),
  email: "",
  phone: "",
  pan: "",
  gstin: "",
  cin: "",
});

export const formatAddress = (address: Address): string =>
  [
    address.addressLine1,
    address.addressLine2,
    address.city,
    address.state,
    address.pincode,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
