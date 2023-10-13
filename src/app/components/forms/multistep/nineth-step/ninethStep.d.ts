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

export type NinethStepProps = {
  ninethStepTranslation: {
    mainTitle: string;
    firstBlock: BlockDataType;
    secondBlock: BlockDataType;
    thirdBlock: BlockDataType;
    fourthBlock: BlockDataType;
  };
};

export type NinethFormValues = {
  sexualOrientation: string[];
  sexualOrientationFreeField: string[];
  validation: string;
  age: string;
  gender: string[];
  genderFreeField: string;
};
