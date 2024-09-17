type ArrayType = Array<{
  id: string;
  name: string;
  label: string;
  value: string;
  checked: boolean;
  example?: string;
}>;

type BlockDataType = {
  title: string;
  titleSecondHalf: string;
  titleOnBehalf: string;
  titleHoverText?: string;
  description: string;
  data: ArrayType;
  dataMySelf: ArrayType;
  secondTitle: string;
  titleHover?: string;
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
  id?: string;
};

export type TenthFormValues = {
  sexualOrientation: string[];
  sexualOrientationFreeField: string[];
  validation: string[];
  age: string;
  gender: string[];
  genderFreeField: string;
};
