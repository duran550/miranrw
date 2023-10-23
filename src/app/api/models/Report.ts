import mongoose, { Schema, model} from "mongoose";


interface reportType {
    identity?: string;
    description?: string;
    valueDate?: string;
    dateRangeState?: string;
    datePeriod?: boolean;
    location?: string;
    locationOnline?: string;
    formOfQueerphobia?: string[];
    otherformOfQueerphobiaFreeField?: string;
    typeOfDiscriminationFreeField?: string;
    typeOfDiscrimination?: string[];
    formOfDisc?: string;
    formOfDiscYes?: string[];
    formOfDiscYesFreeField?: string;
    gender?: string[];
    genderFreeField?: string;
    age?: string;
    sexualOrientation?: string[];
    sexualOrientationFreeField?: string;
  };

  const ReportSchema = new Schema<reportType>({
    identity: { type: String, required: false },
    description: { type: String, required: false },
    valueDate: { type: String, required: false },
    dateRangeState: { type: String, required: false },
    datePeriod: { type: Boolean, required: false },
    location: { type: String, required: false },
    locationOnline: { type: String, required: false },
    formOfQueerphobia: { type: Array<string>, required: false },
    otherformOfQueerphobiaFreeField: { type: String, required: false },
    typeOfDiscrimination: { type: Array<string>, required: false },
    formOfDisc: { type: String, required: false },
    formOfDiscYes: { type:  Array<string>, required: false },
    formOfDiscYesFreeField: { type: String, required: false },
    genderFreeField: { type: String, required: false },
    gender: { type:  Array<string>, required: false },
    age: { type: String, required: false },
    sexualOrientation: { type:  Array<string>, required: false },
    sexualOrientationFreeField: { type: String, required: false },

  });

const Report = mongoose.models.Blog || mongoose.model<reportType>("Report", ReportSchema);

export default Report;
// export default model<reportType>("Report", ReportSchema)