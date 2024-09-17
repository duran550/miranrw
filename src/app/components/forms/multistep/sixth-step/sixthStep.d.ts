export type SixthStepProps = {
  sixthStepTranslation: {
    title: string;
    description: string;
    minCharacters: string;
    choices: Array<{
      iD: number;
      id: string;
      value: string;
      label: string;
      example: string;
    }>;
  };
  id?: string;
  lang?: any;
};

export type SixthStepValues = {
  formOfQueerphobia: string[];
  otherformOfQueerphobiaFreeField: string;
};
