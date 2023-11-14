export type NinethStepProps = {
  ninethStepTranslation: {
    title: string;
    description: string;
    minCharacters: string;
    mandatory: string;
    data: {
      options: any;
      optionsYes: any;
    };
  };
};

export type NinethFormValues = {
  haveYouReported: string;
  haveYouReportedYes: string[];
  haveYouReportedYesFreeField1: string;
  haveYouReportedYesFreeField2: string;
};
