export type TenthStepProps = {
  tenthStepTranslation: {
    title: string;
    verification: string;
    description: string;
    buttonText: string;
    validation: {
      title: string;
      data: Array<{ id: string; name: string; label: string; value: string }>;
    };
  };
};

export type TenthFormValues = {
  validation: string[];
};
