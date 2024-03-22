export type ReportSummaryType = {
  personAffected: string | undefined;
  genderIdentity: string | undefined;
  age: number | undefined;
  date: string | undefined;
  placeOfIncident: string | undefined;
  incidentDescription: string | undefined;
  characteristic: string | undefined;
  otherMesures: string | undefined;
  className?: string;
  mutate?: boolean;
  visible?: boolean;
};

export type ReportType = {
  id: string;
  text: string;
  btn?:
    | string
    | 'Uncategorized'
    | 'Raw'
    | 'Irrelevant'
    | '!Dangerous'
    | 'Categorized'
    | 'Managed'
    | 'Cleaned';
  summary?: ReportSummaryType;
  categories?: [];
};

export type AllReportsType = ReportType[];

export type DescriptionType = {
  title: string;
  description: string;
};

export type OptionType = {
  id: number;
  name: string;
  formName: string;
  value: string;
  description: DescriptionType;
};

export type OptionsType = OptionType[];

export type DataCategorizationOptionType = {
  id: number;
  name: string;
  options: OptionsType;
};

export type DataCategorizationOptionsType = DataCategorizationOptionType[];
