export type reportType = {
  _id?: string;
  organizationType?: string[];
  organizationTypeFreeField?: string;
  identity: string;
  description?: string;
  valueDate?: string;
  dateRangeState?: string;
  datePeriod?: string;
  numberOfEmployees?: string;
  location?: string;
  locationOnline?: string;
  stadtteil?: string;
  formOfQueerphobia?: string[];
  otherformOfQueerphobiaFreeField?: string;
  typeOfDiscriminationFreeField?: string;
  typeOfDiscrimination?: string[];
  formOfDisc?: string;
  formOfDiscYes?: string[];
  formOfDiscYesFreeField?: string;
  haveYouReported?: string;
  haveYouReportedYes?: string[];
  haveYouReportedYesFreeField1?: string;
  haveYouReportedYesFreeField2?: string;
  gender?: string[];
  genderFreeField?: string;
  age?: string;
  sexualOrientation?: string[];
  sexualOrientationFreeField?: string;
  createdAt?: string
  statut?:string
};
