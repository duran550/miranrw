export type reportType = {
  _id?: string;
  organizationType?: string[];
  organizationTypeFreeField?: string;
  identity?: string;
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
  createdAt?: string;
  status?: string;
  category?: any[];
  updatedAt?: string;

  updatereport?: {
    category?: any[];

    description?: string;

    status?: string;
  }[];
  categoryandreports?: {
    _id: string;
  }[];
};

export type reportType2 = {
  _id?: string;
  organizationType?: string[];
  organizationTypeFreeField?: string;
  identity?: string;
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
  createdAt?: string;
  updatedAt?: string;
  status2?: string;
  category2?: any[];
  status?: string;
  category?: any[];
  description2?: string;
  updatereport?: {
    category?: any[];

    description?: string;

    status?: string;
  }[];
  categoryandreports?: {
    _id: string;
  }[];
};

export type ReportAndCategoryType = {
  _id?: string;
  report?: reportType;
  text: string;
  category: {
    _id: string;
    name: string;
  };
  level: string;
};

export type CategoryType = {
  name: string;
  level: string;
  parent: {
    _id: string;
    name: string;
  };
  childre: [];
  _id: string;
};
