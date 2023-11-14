export type SeventhStepProps = {
  seventhStepTranslation: {
    title: string;
    minCharacters: string;
    description: string;
    choices: Array<{ iD: number; id: string; value: string; label: string }>;
  };
};

export type SeventhStepValues = {
  typeOfDiscrimination: string[];
  typeOfDiscriminationFreeField: string;
};
