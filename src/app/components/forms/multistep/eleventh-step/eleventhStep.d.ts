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
};

export type EleventhFormValues = {
  validation: string[];
  captcha: string;
};
