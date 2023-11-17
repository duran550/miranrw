export type FifthStepProps = {
  fifthStepTranslation: {
    title: string;
    description: string;
    mandatory: string;
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
    thirdOption: {
      title: string;
      name: string;
      value: string;
      id: string;
    };
  };
};

export type FifthFormValues = {
  locationOnline: string;
  stadtteil: string;
};
