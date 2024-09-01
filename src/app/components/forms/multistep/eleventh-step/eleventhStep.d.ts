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
  id?:any;

  open:boolean;
  setOpen:() => void;
  submitPage:boolean,
  setSubmitPage:() => void

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

  ninethStepTranslation?: {
    title: string;
    organizationTitle:string;
    description: string;
    minCharacters: string;
    mandatory: string;
    data: {
      options: any;
      optionsYes: any;
      optionsYesOrganization:{
        iD:number;
        name:string;
        value:string;
        id:string;
        label:string;
      }[];
    };
  };
};

export type EleventhFormValues = {
  validation: string[];
  captcha: string;
};
