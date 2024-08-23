export type MultiStepFormValuesProps = {
  stepper: {
    initialStep: any;
    firstStep: any;
    secondStep: any;
    thirdStep: any;
    thirdStepOrganization: any;
    fourthStep: any;
    fourthStepOrganization: any;
    fifthStep: any;
    sixthStep: any;
    seventhStep: any;
    eightStep: any;
    ninethStep: any;
    tenthStep: any;
    eleventhStep: any;
    twelvethStep: any;
    thirtinthStep
  };
  button: {
    start: string;
    next: string;
    prev: string;
    submit: string;
    save: string;
  };
};

export type MultiStepFormProps = {
  formTranslation: MultiStepFormValuesProps;
  lang: string;
};
