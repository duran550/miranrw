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
      title: string;
      name: string;
      id: string;
      value: string;
      label: sting;
    };
  };
};

export type FifthFormValues = {
  locationOnline: string;
};
