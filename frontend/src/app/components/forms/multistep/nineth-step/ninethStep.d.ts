export type NinethStepProps = {
  ninethStepTranslation: {
    title: string;
    organizationTitle:string;
    description: string;
    minCharacters: string;
    mandatory: string;
    data: {
      options: any;
      optionsYes: any;
      optionsYesOrganization:{
        iD:number;
        name:string;
        value:string;
        id:string;
        label:string;
      }[];
    };
  };
  id?: string;
};

export type NinethFormValues = {
  haveYouReported: string;
  haveYouReportedYes: string[];
  haveYouReportedYesFreeField1: string;
  haveYouReportedYesFreeField2: string;
};
