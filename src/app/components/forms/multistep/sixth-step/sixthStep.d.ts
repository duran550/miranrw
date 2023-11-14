export type SixthStepProps = {
  sixthStepTranslation: {
    title: string;
    description: string;
    minCharacters: string;
    choices: Array<{ iD: number; id: string; value: string; label: string }>;
  };
};

export type SixthStepValues = {
  formOfQueerphobia: string[];
  otherformOfQueerphobiaFreeField: string;
};
