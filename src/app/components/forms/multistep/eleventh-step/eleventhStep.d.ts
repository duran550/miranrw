export type EleventhStepProps = {
  eleventhStepTranslation: {
    title: string;
    verification: string;
    description: string;
    buttonText: string;
    validation: {
      title: string;
      data: Array<{ id: string; name: string; label: string; value: string }>;
    };
    captcha: string;
  };

  secondStepTranslation: {
    title: string;
    mandatory: string;
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

export type EleventhFormValues = {
  validation: string[];
  captcha: string;
};
