export type ThirtinthStepProp = {
    thirtinthStepTranslation: {
      title: string;
      description: string;
      mandatory: string;
      choices: Array<{ iD: number; id: string; value: string; label: string }>;
    };
    id?: string;
    lang?:any;
  };
  
  export type ThirtinthStepValues = {
    formOfQueerphobia: string[];
    otherformOfQueerphobiaFreeField: string;
  };
  