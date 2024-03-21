export type ReportSummaryType = {
    personAffected: string | undefined; 
    genderIdentity: string | undefined; 
    age: number | undefined; 
    date: string | undefined; 
    placeOfIncident: string | undefined; 
    incidentDescription: string | undefined; 
    characteristic: string | undefined; 
    otherMesures: string | undefined; 
}

export type ReportType = {
    id: string;
    text: string;
    btn: string;
    summary: ReportSummaryType, 
    categories?: [], 
}

export type AllReportsType = ReportType []

export type DescriptionType = {
    title: string; 
    description: string; 
}

export type OptionType = {
    id: number; 
    name: string; 
    formName: string; 
    description: DescriptionType; 
}

export type OptionsType = OptionType []

export type DataCategorizationOptionType = {
    id: number, 
    name: string; 
    options: OptionsType, 
}

export type DataCategorizationOptionsType = DataCategorizationOptionType []; 