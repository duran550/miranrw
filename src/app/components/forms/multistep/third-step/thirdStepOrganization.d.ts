export type ThirdStepOrganizationProps = {
  thirdStepOrganizationTranslation: {
    title: string;
    subTitle: string;
    data: Array<{
      iD: number;
      name: string;
      value: string;
      id: string;
      label: string;
    }>;
  };
};

export type ThirdStepOrganizationFormValues = {
  organizationType: string[];
  organizationTypeFreeField: string;
};
