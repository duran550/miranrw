export type SecondFormValues = {
  identity: string;
};

export type SecondStepProps = {
  secondStepTranslation: {
    title: string;
    description: string;
    onBehalfHints: {
      title: string;
      description: string;
    };
    options: Array<{
      id: string;
      name: string;
      label: string;
      value: string;
      checked: boolean;
    }>;
  };
};

export type dataType = Array<{
  iD: number;
  value: string;
  id: string;
  name: string;
  label: string;
  checked: boolean;
}>;
