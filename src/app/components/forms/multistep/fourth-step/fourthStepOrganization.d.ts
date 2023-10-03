export type FourthStepOrganizationProps = {
  fourthStepOrganizationTranslation: {
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

export type FourthStepOrganizationFormValues = {
  numberOfEmployees: string;
};
