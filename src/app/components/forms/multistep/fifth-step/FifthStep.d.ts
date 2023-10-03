export type FifthStepProps = {
  fifthStepTranslation: {
    title: string;
    description: string;
    firstOption: {
      name: string;
      id: string;
      value: string;
      label: string;
    };
    secondOption: {
      name: string;
      id: string;
    };
  };
};

export type FifthFormValues = {
  location: string;
  locationOnline: string;
};
