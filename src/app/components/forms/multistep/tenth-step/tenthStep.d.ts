type ArrayType = Array<{
  id: string;
  name: string;
  label: string;
  value: string;
  checked: boolean;
}>;

type BlockDataType = {
  title: string;
  titleOnBehalf: string;
  description: string;
  data: ArrayType;
};

export type TenthStepProps = {
  tenthStepTranslation: {
    mainTitle: string;
    minCharacters: string;
    firstBlock: BlockDataType;
    secondBlock: BlockDataType;
    thirdBlock: BlockDataType;
    fourthBlock: BlockDataType;
  };
  id?:string;
};

export type TenthFormValues = {
  sexualOrientation: string[];
  sexualOrientationFreeField: string[];
  validation: string[];
  age: string;
  gender: string[];
  genderFreeField: string;
};
